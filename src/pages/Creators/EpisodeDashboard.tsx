import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import fullStarIcon from "../../assets/fullStarIcon.png";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import CustomSelect from "../../components/Common/CustomSelect";
import * as S from "./CreatorContent.styles";
import {
    MdAdd,
} from "react-icons/md";
import api from "../../api/axiosInstance";
import { ContentTab, ContentEpisode } from "../../types/Creator";
import { formatKorean, formatUrl } from "../../utils/formatContentType";
import { formatCompactNumber, formatDate, formatDateAndTime } from "../../utils/formatData";
import PageNavigator from "../../components/Pagination/PageNavigator";


// Icon casting for React 19 compatibility
const AddIcon = MdAdd as any;

function EpisodeDashboard() {
    const navigate = useNavigate();
    const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
    const [contentTabs, setContentTabs] = useState<ContentTab[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [contentEpisode, setContentEpisode] = useState<ContentEpisode | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const sort = searchParams.get("sort") || "latest";
    const status = searchParams.get("status") || "ALL";
    const page = parseInt(searchParams.get("page") || "0", 10);

    const handleParamClick = (newKey: string, newValue: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set(newKey, newValue);
        newParams.set("page", "0");
        setSearchParams(newParams);
    }

    useEffect(() => {
        const fetchContentTab = async () => {
            try {
                const response = await api.get("/creators/contents/dashboard");
                setContentTabs(response.data.contents);

                setLoading(false);
            } catch (error) {
                console.error("콘텐츠 탭 데이터 조회 실패: ", error);
            }
        }
        fetchContentTab();
    }, []);

    // 데이터 로드 시 URL 파라미터가 있으면 해당 작품 선택, 없으면 첫 번째 작품 자동 선택
    useEffect(() => {
        if (contentTabs.length > 0 && selectedWorkId === null) {
            const urlContentId = searchParams.get("contentId");
            if (urlContentId) {
                const targetId = parseInt(urlContentId, 10);
                if (contentTabs.some(c => c.contentId === targetId)) {
                    setSelectedWorkId(targetId);
                    return;
                }
            }
            setSelectedWorkId(contentTabs[0].contentId);
        }
    }, [contentTabs, selectedWorkId, searchParams, setSearchParams]);

    useEffect(() => {
        if (selectedWorkId) {
            const fetchEpisodeList = async () => {
                try {
                    const params: any = {
                        sort: sort,
                        page: page,
                        status: status
                    };
                    const response = await api.get(`/creators/contents/${selectedWorkId}/episodes/dashboard`, { params });
                    setContentEpisode(response.data);

                } catch (error) {
                    console.error("에피소드 목록 조회 실패: ", error);
                }
            }
            fetchEpisodeList();
        }
    }, [selectedWorkId, sort, status, page, refreshTrigger]);

    const handleDelete = async (episodeId: number) => {
        if (!window.confirm("정말로 이 에피소드를 삭제하시겠습니까?")) return;

        const realWork = contentTabs.find(c => c.contentId === selectedWorkId);
        if (!realWork) return;

        const typePath = formatUrl(realWork.contentType);
        try {
            await api.delete(`/creators/${typePath}/${selectedWorkId}/episodes/${episodeId}`);
            alert("에피소드가 삭제되었습니다.");

            // 데이터 새로고침 트리거
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("에피소드 삭제 실패:", error);
            alert("에피소드 삭제에 실패했습니다.");
        }
    };

    const handleWriteEpisode = () => {
        const realWork = contentTabs.find(c => c.contentId === selectedWorkId);
        if (realWork) {
            const typePath = formatUrl(realWork.contentType);
            navigate(`/creators/${typePath}/${realWork.contentId}/episodes/new`);
        }
    };

    const sortOptions = [
        { label: "최신 순", value: "latest" },
        { label: "발행 순", value: "published" },
        { label: "조회수 높은순", value: "views" }
    ];

    const episodeStatusMap: Record<string, string> = {
        PUBLISHED: "발행됨",
        SCHEDULED: "예약됨",
        DRAFT: "임시저장"
    };

    const statusMap: Record<string, string> = {
        ONGOING: "연재 중",
        REST: "휴재",
        COMPLETED: "완결",
        PRIVATE: "습작 (비공개)",
        DELETING: "삭제 요청 중"
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    }

    if (loading) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    if (!contentEpisode) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.PageHeaderWrapper>
                    <div>
                        <S.CreatorTitle>에피소드 통합 대시보드</S.CreatorTitle>
                        <S.PageDescription>등록된 회차를 관리하고 독자들의 반응을 확인하세요.</S.PageDescription>
                    </div>
                </S.PageHeaderWrapper>

                {/* 작품 선택 바 (SelectionBar) */}
                <S.SelectionBar style={{ marginBottom: '32px' }}>
                    {contentTabs.map(work => (
                        <S.MiniWorkCard
                            key={work.contentId}
                            $active={selectedWorkId === work.contentId}
                            onClick={() => {
                                setSelectedWorkId(work.contentId);
                                setSearchParams({
                                    sort: "latest",
                                    status: "ALL",
                                    page: "0"
                                });
                            }}
                        >
                            <S.MiniCover src={work.cover || "https://via.placeholder.com/40x56"} alt={work.contentTitle} />
                            <S.MiniInfo>
                                <S.MiniTitle>{work.contentTitle}</S.MiniTitle>
                                <S.MiniStatus>{formatKorean(work.contentType)}ㆍ{statusMap[work.seriesStatus]}</S.MiniStatus>
                            </S.MiniInfo>
                        </S.MiniWorkCard>
                    ))}
                </S.SelectionBar>

                <S.EpisodeHeaderSummary>
                    <S.EpisodeHeaderInfo>
                        <S.EpisodeHeaderTitle>{contentTabs.find(c => c.contentId === selectedWorkId)?.contentTitle} </S.EpisodeHeaderTitle>
                        <S.EpisodeHeaderSubTitle>에피소드</S.EpisodeHeaderSubTitle>
                    </S.EpisodeHeaderInfo>

                    <S.EpisodeHeaderStats>
                        <S.EpisodeHeaderStatItem>
                            <S.EpisodeHeaderStatLabel>전체</S.EpisodeHeaderStatLabel>
                            <S.EpisodeHeaderStatValue>{contentEpisode.episodeStats.totalEpisodeCount}</S.EpisodeHeaderStatValue>
                        </S.EpisodeHeaderStatItem>
                        <S.EpisodeHeaderStatItem>
                            <S.EpisodeHeaderStatLabel>발행됨</S.EpisodeHeaderStatLabel>
                            <S.EpisodeHeaderStatValue>{contentEpisode.episodeStats.publishedEpisodeCount}</S.EpisodeHeaderStatValue>
                        </S.EpisodeHeaderStatItem>
                        <S.EpisodeHeaderStatItem>
                            <S.EpisodeHeaderStatLabel>예약중</S.EpisodeHeaderStatLabel>
                            <S.EpisodeHeaderStatValue>{contentEpisode.episodeStats.scheduledEpisodeCount}</S.EpisodeHeaderStatValue>
                        </S.EpisodeHeaderStatItem>
                        <S.EpisodeHeaderStatItem>
                            <S.EpisodeHeaderStatLabel>임시저장</S.EpisodeHeaderStatLabel>
                            <S.EpisodeHeaderStatValue>{contentEpisode.episodeStats.draftEpisodeCount}</S.EpisodeHeaderStatValue>
                        </S.EpisodeHeaderStatItem>
                    </S.EpisodeHeaderStats>

                    <S.WriteEpisodeBtn onClick={handleWriteEpisode}>
                        <AddIcon /> 신규 에피소드 등록
                    </S.WriteEpisodeBtn>
                </S.EpisodeHeaderSummary>

                <S.FilterBarRow>
                    <S.FilterButtonGroup>
                        {[
                            { label: "전체", value: "ALL" },
                            { label: "발행됨", value: "PUBLISHED" },
                            { label: "예약중", value: "SCHEDULED" },
                            { label: "임시저장", value: "DRAFT" }
                        ].map(item => (
                            <S.FilterButton
                                key={item.value}
                                $active={status === item.value}
                                onClick={() => handleParamClick("status", item.value)}
                            >
                                {item.label}
                            </S.FilterButton>
                        ))}
                    </S.FilterButtonGroup>

                    <S.SearchSortGroup>
                        <CustomSelect
                            options={sortOptions}
                            value={sort}
                            onChange={(val) => handleParamClick("sort", val)}
                        />
                    </S.SearchSortGroup>
                </S.FilterBarRow>

                <S.EpisodeTableContainer>
                    <S.EpisodeTable>
                        <thead>
                            <S.EpisodeRow>
                                <S.EpisodeTh $align="center" style={{ width: '60px' }}>No</S.EpisodeTh>
                                <S.EpisodeTh>에피소드 제목</S.EpisodeTh>
                                <S.EpisodeTh $align="center" style={{ width: '120px' }}>상태</S.EpisodeTh>
                                <S.EpisodeTh $align="center" style={{ width: '120px' }}>발행일</S.EpisodeTh>
                                <S.EpisodeTh $align="center" style={{ width: '150px' }}>주요 지표</S.EpisodeTh>
                                <S.EpisodeTh $align="center" style={{ width: '140px' }}></S.EpisodeTh>
                            </S.EpisodeRow>
                        </thead>
                        <tbody>
                            {contentEpisode.episodes.content.map((ep) => (
                                <S.EpisodeRow key={ep.episodeId}>
                                    <S.EpisodeTd $align="center" style={{ fontWeight: '700', color: '#888' }}>
                                        {ep.episodeNum}
                                    </S.EpisodeTd>
                                    <S.EpisodeTd>
                                        <S.EpisodeTitleColumn>
                                            <S.EpisodeTitleText onClick={() => navigate(`/creators/${contentEpisode.contentType}/${selectedWorkId}/episodes/${ep.episodeId}`)}>
                                                {ep.episodeTitle}
                                            </S.EpisodeTitleText>
                                            <S.EpisodeDateText>생성일: {formatDateAndTime(ep.createdAt)}</S.EpisodeDateText>
                                        </S.EpisodeTitleColumn>
                                    </S.EpisodeTd>
                                    <S.EpisodeTd $align="center">
                                        <S.EpisodeStatusTag $type={ep.episodeStatus}>
                                            {episodeStatusMap[ep.episodeStatus]}
                                        </S.EpisodeStatusTag>
                                    </S.EpisodeTd>
                                    <S.EpisodeTd $align="center">
                                        <span style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>{formatDate(ep.publishedAt)}</span>
                                    </S.EpisodeTd>
                                    <S.EpisodeTd $align="center">
                                        <S.EpisodeStatsCell>
                                            <S.EpisodeStatRow>
                                                <span>조회수</span>
                                                <span style={{ fontWeight: '600' }}>{formatCompactNumber(ep.viewCount)}</span>
                                            </S.EpisodeStatRow>
                                            <S.EpisodeStatRow>
                                                <span>별점</span>
                                                <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                                                    <img src={fullStarIcon} alt="별점" style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                                                    {ep.averageRating ? ep.averageRating.toFixed(1) : '0.0'}
                                                </span>
                                            </S.EpisodeStatRow>

                                        </S.EpisodeStatsCell>
                                    </S.EpisodeTd>
                                    <S.EpisodeTd $align="center">
                                        <S.EpisodeActionWrap>
                                            <S.CardActionBtn onClick={() => navigate(`/creators/contents/${selectedWorkId}/episodes/${ep.episodeId}/edit`)}>
                                                수정
                                            </S.CardActionBtn>
                                            <S.CardActionBtn onClick={() => handleDelete(ep.episodeId)}>
                                                삭제
                                            </S.CardActionBtn>
                                        </S.EpisodeActionWrap>
                                    </S.EpisodeTd>
                                </S.EpisodeRow>
                            ))}
                        </tbody>
                    </S.EpisodeTable>
                    {contentEpisode.episodes.content.length === 0 && (
                        <div style={{ padding: '60px', textAlign: 'center', color: '#999' }}>
                            검색 결과가 없습니다.
                        </div>
                    )}
                </S.EpisodeTableContainer>
                {contentEpisode.episodes && contentEpisode.episodes.totalPages > 0 && (
                    <S.PaginationWrap>
                        <PageNavigator pageData={contentEpisode.episodes} handlePageChange={handlePageChange} />
                    </S.PaginationWrap>
                )}
            </NoSidebarMain>
        </MainContainer>
    );
}

export default EpisodeDashboard;
