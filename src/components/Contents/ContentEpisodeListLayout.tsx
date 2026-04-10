import React, { useState, useEffect, useCallback } from 'react';
import * as S from "../Styles/ContentDetail.styles";
import { EpisodeSummary, PurchaseTargetEpisode } from '../../types/Episodes';
import dayjs from 'dayjs';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { Pagination } from '../../types/Page';
import { expirationCheck, expirationDate } from '../../utils/rentalEpisodeFormat';
import PurchaseModal from '../Modals/PurchaseModal';
import { useAuthCheck } from './Hooks/useAuthCheck';
import { formatDate } from '../../utils/formatData';
import { formatUrl } from '../../utils/formatContentType';

interface Props {
    type: string,
    contentId: number,
    contentTitle: string
}


type PurchaseModalMode = 'OWN' | 'RENT' | 'SELECT';

function ContentEpisodeListLayout({ type, contentId, contentTitle }: Props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort') || "recent";

    const [episodes, setEpisodes] = useState<EpisodeSummary[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [purchasePrompt, setPurchasePrompt] = useState<{ episode: PurchaseTargetEpisode; mode: PurchaseModalMode; allowRent: boolean } | null>(null);

    const { checkLogin } = useAuthCheck();
    const navigate = useNavigate();
    const normalizedType = type.toLowerCase();
    const isWebtoonType = normalizedType === 'webtoon' || normalizedType === 'webtoons';
    const isWebnovelType = normalizedType === 'webnovel' || normalizedType === 'webnovels';

    const fetchEpisodes = useCallback(async (pageNum: number, isInitial: boolean = false) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await api.get<Pagination<EpisodeSummary>>(`/${type}/${contentId}/episodes`, {
                params: {
                    sort: sort,
                    size: 20,
                    page: pageNum
                }
            });

            const newEpisodes = response.data.content;
            console.log(response.data.content);
            if (isInitial) {
                setEpisodes(newEpisodes);
            } else {
                setEpisodes(prev => [...prev, ...newEpisodes]);
            }

            setHasMore(!response.data.last);
            setPage(pageNum);
        } catch (error) {
            console.error("에피소드 목록 로드 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [type, contentId, sort, isLoading]);

    useEffect(() => {
        fetchEpisodes(0, true);
    }, [type, contentId, sort]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            fetchEpisodes(page + 1);
        }
    };

    const handleSortChange = (newSort: string) => {
        setSearchParams(prev => {
            prev.set('sort', newSort);
            return prev;
        }, { replace: true });
    };

    // id를 string으로 변환
    const displayedIds = episodes.map(e => String(e.episodeId));

    // 선택된 에피소드 id 배열 (string)
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // 전체 선택 체크박스 상태
    const isAllChecked = displayedIds.length > 0 && displayedIds.every(id => selectedIds.includes(id));
    const isIndeterminate = selectedIds.length > 0 && !isAllChecked;

    // 전체 선택 토글
    const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // 현재 보여지는 에피소드만 전체 선택
            setSelectedIds(prev => Array.from(new Set([...prev, ...displayedIds])));
        } else {
            // 현재 보여지는 에피소드만 전체 해제
            setSelectedIds(prev => prev.filter(id => !displayedIds.includes(id)));
        }
    };

    const mapToPurchaseTarget = (episode: EpisodeSummary): PurchaseTargetEpisode => ({
        id: episode.episodeId,
        episodeNum: episode.episodeNum,
        purchasePrice: episode.purchasePrice,
        rentalPrice: episode.rentalPrice
    });

    // 개별 체크박스 토글
    const handleEpisodeCheck = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        }
    };


    const openPurchasePrompt = (episode: PurchaseTargetEpisode, mode: PurchaseModalMode, allowRent: boolean = false) => {
        setPurchasePrompt({ episode, mode, allowRent });
    };

    const closePurchasePrompt = () => setPurchasePrompt(null);

    const processTransaction = async (purchaseType: 'OWN' | 'RENT') => {
        if (!purchasePrompt || !checkLogin()) {
            return;
        }
        const { episode } = purchasePrompt;

        try {
            await api.post(`/${type}/${contentId}/episodes/${episode.id}/subscribe?purchaseType=${purchaseType}`);
            closePurchasePrompt();
            navigate(`/${type}/${contentId}/viewer/${episode.id}`);
        } catch (error: any) {
            closePurchasePrompt();
            console.error("에피소드 구매 실패 : ", error.response.data);

            const errorCode = error.response.data.errorCode;
            const errorMessage = error.response.data.errorMessage;
            if (errorCode === 'INSUFFICIENT_POINTS') {
                alert(errorMessage);
                navigate("/points/charge")
            }
        }
    };

    const handleEpisodePurchase = (episode: EpisodeSummary) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!checkLogin()) {
            return;
        }
        openPurchasePrompt(mapToPurchaseTarget(episode), 'OWN');
    };

    const handleEpisodeRent = (episode: EpisodeSummary) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!checkLogin()) {
            return;
        }
        openPurchasePrompt(mapToPurchaseTarget(episode), 'RENT');
    }

    const handleEpisodeView = (episodeId: number) => async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!checkLogin()) {
            e.preventDefault();
            return;
        }

        try {
            const response = await api.get(`/${type}/${contentId}/episodes/${episodeId}/subscribe`);

            if (!response.data) {
                const targetEpisode = episodes.find(ep => ep.episodeId === episodeId);
                if (!targetEpisode) {
                    return;
                }

                openPurchasePrompt(mapToPurchaseTarget(targetEpisode), 'SELECT', isWebtoonType);
                e.preventDefault(); // Prevent navigation
                return;
            }

            if (response.data) {
                navigate(`/${type}/${contentId}/viewer/${episodeId}`);
            }
        } catch (error) {
            const targetEpisode = episodes.find(ep => ep.episodeId === episodeId);
            if (!targetEpisode) {
                return;
            }
            openPurchasePrompt(mapToPurchaseTarget(targetEpisode), 'SELECT', isWebtoonType);
            e.preventDefault();
        }
    }


    const formatPointValue = (value?: number | null) => {
        if (typeof value !== 'number') {
            return '0';
        }
        return value.toLocaleString();
    };


    return (
        <>
            <S.EpisodeSection>
                <form action="">
                    <div>
                        <S.EpisodeListOption>
                            <S.OptionLeft>
                                <S.OptionItem>
                                    <S.OptionCheckbox
                                        type='checkbox'
                                        checked={isAllChecked}
                                        ref={el => {
                                            if (el) el.indeterminate = isIndeterminate;
                                        }}
                                        onChange={handleAllCheck}
                                    />
                                    <S.OptionCheckboxLabel>전체 선택</S.OptionCheckboxLabel>
                                </S.OptionItem>
                                <S.OptionItem>
                                    <S.EpisodeSellBtnWrapper>
                                        {isWebtoonType && (
                                            <S.RentalBtn type="button" >
                                                선택 대여
                                            </S.RentalBtn>
                                        )}
                                        <S.PurchaseBtn type="button" >
                                            선택 구매
                                        </S.PurchaseBtn>
                                    </S.EpisodeSellBtnWrapper>
                                </S.OptionItem>
                            </S.OptionLeft>
                            <S.OptionRight>
                                <S.EpisodeFilterWrapper>
                                    <S.EpisodeFilterBtn type='button' $active={sort === "recent"} onClick={() => handleSortChange('recent')}>
                                        최신화부터
                                    </S.EpisodeFilterBtn>
                                    <S.FilterBtnDivider></S.FilterBtnDivider>
                                    <S.EpisodeFilterBtn type='button' $active={sort === "first"} onClick={() => handleSortChange('first')} style={{ width: "50px" }}>
                                        1화부터
                                    </S.EpisodeFilterBtn>
                                </S.EpisodeFilterWrapper>
                            </S.OptionRight>
                        </S.EpisodeListOption>
                        <S.EpisodeListWrapper>
                            <ul>
                                {episodes.map((episode) => {
                                    const createDate = formatDate(episode.publishedAt)
                                    const episodeIdStr = String(episode.episodeId);
                                    return (
                                        <S.EpisodeItem key={episode.episodeId}>
                                            <S.EpisodeItemLeft>
                                                <S.OptionCheckbox
                                                    type='checkbox'
                                                    checked={selectedIds.includes(episodeIdStr)}
                                                    onChange={handleEpisodeCheck(episodeIdStr)}
                                                />
                                                {isWebtoonType &&
                                                    <S.EpisodeThumbnailContainer>
                                                        <S.EpisodeThumbnailImage src='' />
                                                    </S.EpisodeThumbnailContainer>
                                                }
                                                <S.EpisodeInfoContainer>
                                                    <S.EpisodeTitleAndNum>
                                                        <span>{episode.episodeNum}화</span>
                                                        <S.EpisodeTitle type='button' onClick={handleEpisodeView(episode.episodeId)}>{episode.episodeTitle}</S.EpisodeTitle>
                                                    </S.EpisodeTitleAndNum>
                                                    <S.EpisodeDateAndPurchaseData>
                                                        <S.EpisodeCreateDate>
                                                            {createDate}
                                                        </S.EpisodeCreateDate>
                                                        {episode.episodePurchase && (
                                                            <S.EpisodePurchaseText>
                                                                {episode.episodePurchase.purchaseType === 'OWN'
                                                                    ? '소장'
                                                                    : expirationDate(episode.episodePurchase.expiredAt)
                                                                }
                                                            </S.EpisodePurchaseText>
                                                        )}
                                                    </S.EpisodeDateAndPurchaseData>
                                                </S.EpisodeInfoContainer>
                                            </S.EpisodeItemLeft>
                                            <S.EpisodeItemRight>
                                                <S.EpisodeSellBtnWrapper>
                                                    {episode.episodePurchase == null ||
                                                        (episode.episodePurchase.purchaseType === "RENT" && expirationCheck(episode.episodePurchase.expiredAt))
                                                        ? (
                                                            <>
                                                                {isWebtoonType && (
                                                                    <S.RentalBtn type="button" onClick={handleEpisodeRent(episode)}>
                                                                        대여
                                                                    </S.RentalBtn>
                                                                )}
                                                                <S.PurchaseBtn
                                                                    type="button"
                                                                    onClick={handleEpisodePurchase(episode)}
                                                                >
                                                                    구매
                                                                </S.PurchaseBtn>
                                                            </>
                                                        ) : (
                                                            <S.ViewBtn
                                                                type="button"
                                                                onClick={handleEpisodeView(episode.episodeId)}
                                                            >
                                                                보기
                                                            </S.ViewBtn>
                                                        )
                                                    }
                                                </S.EpisodeSellBtnWrapper>
                                            </S.EpisodeItemRight>
                                        </S.EpisodeItem>
                                    );
                                })}
                            </ul>
                        </S.EpisodeListWrapper>
                        {isLoading ? (
                            <S.LoadingContainer>
                                <S.LoadingSpinner />
                            </S.LoadingContainer>
                        ) : (
                            hasMore && (
                                <S.ShowAllBtnContainer>
                                    <S.ShowAllBtn type='button' onClick={handleLoadMore}>
                                        더보기
                                    </S.ShowAllBtn>
                                </S.ShowAllBtnContainer>
                            )
                        )}
                    </div>
                </form>
            </S.EpisodeSection>
            <PurchaseModal
                isOpen={!!purchasePrompt}
                onClose={closePurchasePrompt}
                onConfirm={processTransaction}
                contentTitle={contentTitle}
                episode={purchasePrompt?.episode || null}
                mode={purchasePrompt?.mode || 'SELECT'}
                allowRent={purchasePrompt?.allowRent || false}
                isWebnovelType={isWebnovelType}
            />
        </>
    )

}

export default ContentEpisodeListLayout;