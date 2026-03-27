import { useEffect, useState } from "react";
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import { MainContainer, SidebarMain } from "../../styles/Layout.styles";
import { SidebarRightWrap, SortBtn } from "../Users/MyPage.styles";
import * as S from "./CreatorContent.styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreatorContentSimple } from "../../types/Creator";
import { Pagination } from "../../types/Page";
import api from "../../api/axiosInstance";
import { formatKorean } from "../../utils/formatContentType";
import PageNavigator from "../../components/Pagination/PageNavigator";
import rightArrowIcon from "../../assets/rightArrowIcon.png";

function UpdateContentChoicePage() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [creatorContentSimple, setCreatorContentSimple] = useState<CreatorContentSimple[]>([]);
    const [pageData, setPageData] = useState<Pagination<CreatorContentSimple> | null>(null);


    const page = parseInt(searchParams.get("page") || "0", 10);
    const query = searchParams.get("query") || "";

    const [searchInput, setSearchInput] = useState(query);

    const handleParamClick = (newKey: string, newValue: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set(newKey, newValue);
        newParams.set("page", "0");
        setSearchParams(newParams);
    }

    const dayKoMap: Record<string, string> = {
        MONDAY: "월요일",
        TUESDAY: "화요일",
        WEDNESDAY: "수요일",
        THURSDAY: "목요일",
        FRIDAY: "금요일",
        SATURDAY: "토요일",
        SUNDAY: "일요일"
    }

    const statusMap: Record<string, string> = {
        COMPLETED: "완결",
        ONGOING: "연재",
        REST: "휴재"
    }

    useEffect(() => {
        const fetchSimpleContentList = async () => {
            try {
                const params: any = {
                    page: page,
                };
                if (query) {
                    params.query = query;
                }

                const response = await api.get("/creators/contents/simple", { params });

                setCreatorContentSimple(response.data.content);
                setPageData(response.data);
            } catch (error) {
                console.error("내 작품 목록 조회 실패:", error);
            }
        };
        fetchSimpleContentList();
    }, [page, query]);

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    }

    const handleContentUpdateClick = (contentId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        navigate(`/creators/contents/${contentId}/update`);

    }

    const handleContentSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newParams = new URLSearchParams(searchParams);
        if (searchInput.trim() === "") {
            newParams.delete("query");
        } else {
            newParams.set("query", searchInput);
        }
        newParams.set("page", "0");
        setSearchParams(newParams);
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // 재사용을 위해 클릭 핸들러와 동일한 로직 수행
            const newParams = new URLSearchParams(searchParams);
            if (searchInput.trim() === "") {
                newParams.delete("query");
            } else {
                newParams.set("query", searchInput);
            }
            newParams.set("page", "0");
            setSearchParams(newParams);
        }
    }

    return (
        <MainContainer>
            <SidebarMain>
                <CreatorSidebar />
                <SidebarRightWrap>
                    <S.CreatorTitle>수정 작품 선택</S.CreatorTitle>
                    <S.CreatorSimpleSortBtnWrapper>
                        <S.CreatorSimpleSortBtnList>
                            <S.CreatorSimpleSearchSelectSort>
                                <S.CreatorSimpleSearchGroup>
                                    <S.CreatorSimpleSearchInput
                                        type="text"
                                        placeholder="책 이름을 입력하세요."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                    />
                                    <S.CreatorSimpleSearchBtn onClick={handleContentSearchClick}>
                                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className="search-icon">
                                            <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2" />
                                            <line x1="14.2" y1="14.2" x2="20" y2="20" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </S.CreatorSimpleSearchBtn>
                                </S.CreatorSimpleSearchGroup>
                            </S.CreatorSimpleSearchSelectSort>
                        </S.CreatorSimpleSortBtnList>
                    </S.CreatorSimpleSortBtnWrapper>
                    <S.CreatorContentListWrapper>
                        <S.CreatorContentList>
                            {creatorContentSimple.length === 0 ? (
                                <S.EmptyListText>관심 작품이 없습니다.</S.EmptyListText>
                            ) : (
                                creatorContentSimple.map((content) => (
                                    <S.ContentItem>
                                        <S.ContentImageCover>
                                            <S.ContentImage
                                                src={content.cover || "https://via.placeholder.com/140x200"}
                                                alt={content.contentTitle}
                                            />
                                        </S.ContentImageCover>
                                        <S.ContentInfoCover $history={false}>
                                            <S.ContentTitleWrapper>
                                                <S.ContentTitle>
                                                    {content.contentTitle}
                                                </S.ContentTitle>
                                            </S.ContentTitleWrapper>

                                            <S.ContentInfoWrapper>
                                                <S.ContentType>{formatKorean(content.contentType)}</S.ContentType>
                                            </S.ContentInfoWrapper>

                                            <S.ContentMetaRow>

                                                {content.seriesStatus === "ONGOING" && (
                                                    <>
                                                        <S.ContentMetaItem>
                                                            {dayKoMap[content.serialDay]}
                                                        </S.ContentMetaItem>
                                                        <S.ContentSeparate>ㆍ</S.ContentSeparate>
                                                    </>
                                                )}
                                                <S.ContentStatus>
                                                    {statusMap[content.seriesStatus]}
                                                </S.ContentStatus>
                                            </S.ContentMetaRow>
                                        </S.ContentInfoCover>
                                        <S.ContentEpisodeReadBtn type="button" onClick={handleContentUpdateClick(content.contentId)}>
                                            <S.ContentEpisodeReadBtnText>
                                                수정하기
                                            </S.ContentEpisodeReadBtnText>
                                            <S.ContentEpisodeReadIcon src={rightArrowIcon} />
                                        </S.ContentEpisodeReadBtn>
                                    </S.ContentItem>
                                ))
                            )}
                        </S.CreatorContentList>
                        {pageData && pageData.totalPages > 0 && (
                            <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                        )}
                    </S.CreatorContentListWrapper>
                </SidebarRightWrap>
            </SidebarMain>
        </MainContainer>
    )
}

export default UpdateContentChoicePage;