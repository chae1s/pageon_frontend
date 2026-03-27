import { useEffect, useState } from "react";
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import { MainContainer, SidebarMain, SidebarRightWrap, SortBtn } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import api from "../../api/axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreatorContentList } from "../../types/Creator";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";

function MyContentList() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [creatorContentList, setCreatorContentList] = useState<CreatorContentList[]>([]);
    const [pageData, setPageData] = useState<Pagination<CreatorContentList> | null>(null);

    const sort = searchParams.get("sort") || "update";
    const seriesStatus = searchParams.get("seriesStatus") || "ONGOING";
    const page = parseInt(searchParams.get("page") || "0", 10);

    const handleParamClick = (newKey: string, newValue: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set(newKey, newValue);
        newParams.set("page", "0");
        setSearchParams(newParams);
    }

    useEffect(() => {
        const fetchMyContentList = async () => {
            try {
                const params: any = {
                    sort: sort,
                    page: page,
                };
                if (seriesStatus !== "ALL") {
                    params.seriesStatus = seriesStatus;
                }

                const response = await api.get("/creators/contents", { params });

                setCreatorContentList(response.data.content);
                setPageData(response.data);
            } catch (error) {
                console.error("내 작품 목록 조회 실패:", error);
            }
        };
        fetchMyContentList();
    }, [sort, page, seriesStatus]);

    const getContentTypeLabel = (type: string) =>
        type === 'WEBTOON' || type === 'webtoons' ? '웹툰' :
            type === 'WEBNOVEL' || type === 'webnovels' ? '웹소설' : type;

    const dayKoMap: Record<string, string> = {
        MONDAY: "월요일", TUESDAY: "화요일", WEDNESDAY: "수요일", THURSDAY: "목요일", FRIDAY: "금요일", SATURDAY: "토요일", SUNDAY: "일요일",
    };

    const statusMap: Record<string, string> = {
        ONGOING: "연재중",
        COMPLETED: "완결",
        REST: "휴재",
        PENDING: "심사대기",
        PUBLISHED: "승인됨",
        REJECTED: "반려됨"
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    }

    return (
        <MainContainer>
            <SidebarMain>
                <CreatorSidebar />
                <SidebarRightWrap>
                    <S.CreatorTitle>내 작품 목록</S.CreatorTitle>

                    <S.CreatorFilterSortRow>
                        <S.CreatorFilterWrap>
                            <SortBtn $active={seriesStatus === "ONGOING"} onClick={() => handleParamClick("seriesStatus", "ONGOING")}>연재중</SortBtn>
                            <SortBtn $active={seriesStatus === "REST"} onClick={() => handleParamClick("seriesStatus", "REST")}>휴재</SortBtn>
                            <SortBtn $active={seriesStatus === "COMPLETED"} onClick={() => handleParamClick("seriesStatus", "COMPLETED")}>완결</SortBtn>
                        </S.CreatorFilterWrap>

                        <S.CreatorSortWrap>
                            <SortBtn $active={sort === "update"} onClick={() => handleParamClick("sort", "update")}>연재등록 순</SortBtn>
                            <SortBtn $active={sort === "episode"} onClick={() => handleParamClick("sort", "episode")}>에피소드 업로드 순</SortBtn>
                        </S.CreatorSortWrap>
                    </S.CreatorFilterSortRow>

                    {creatorContentList.length === 0 ? (
                        <S.EmptyState>등록된 작품이 없습니다. 새로운 작품을 등록해보세요!</S.EmptyState>
                    ) : (
                        <S.ListContainer>
                            {creatorContentList.map(content => (
                                <S.ContentCard key={content.contentId}>
                                    {/* 좌측: Content Info */}
                                    <S.ContentInfoSection>
                                        <S.InfoThumbnail src={content.cover || "https://via.placeholder.com/100x150?text=No+Cover"} alt="표지" />
                                        <S.InfoTextWrap>
                                            <S.CardTitle>{content.contentTitle}</S.CardTitle>
                                            <S.ContentMetaRow>
                                                <S.ContentMetaItem>
                                                    {getContentTypeLabel(content.contentType)}
                                                </S.ContentMetaItem>
                                                <S.ContentSeparate>ㆍ</S.ContentSeparate>

                                                {content.seriesStatus === "ONGOING" && (
                                                    <>
                                                        <S.ContentMetaItem>
                                                            {dayKoMap[content.serialDay] || content.serialDay}
                                                        </S.ContentMetaItem>
                                                        <S.ContentSeparate>ㆍ</S.ContentSeparate>
                                                    </>
                                                )}
                                                <S.ContentStatus>
                                                    {statusMap[content.workStatus === "PUBLISHED" ? content.seriesStatus : content.workStatus] || ""}
                                                </S.ContentStatus>
                                            </S.ContentMetaRow>
                                            {content.keywords && content.keywords.length > 0 && (
                                                <S.ContentKeywordWrap>
                                                    {content.keywords.map((keyword, idx) => (
                                                        <S.ContentKeywordItem key={`${keyword}-${idx}`}>#{keyword}</S.ContentKeywordItem>
                                                    ))}
                                                </S.ContentKeywordWrap>
                                            )}
                                            <S.ContentActionWrap>
                                                <S.ContentActionLink onClick={() => navigate(`/creators/contents/${content.contentId}/update`)}>
                                                    수정
                                                </S.ContentActionLink>
                                                <S.ContentActionLink $danger onClick={() => {
                                                    if (window.confirm('작품을 정말 삭제하시겠습니까?')) {
                                                        alert('삭제 기능 연동 예정입니다.');
                                                    }
                                                }}>
                                                    삭제
                                                </S.ContentActionLink>
                                            </S.ContentActionWrap>
                                        </S.InfoTextWrap>
                                    </S.ContentInfoSection>

                                    {/* 우측: Episode Info (현재 가데이터) */}
                                    <S.EpisodeInfoSection>
                                        <S.EpisodeHeaderWrap>
                                            <S.EpisodeSectionTitle>에피소드 업로드 보드</S.EpisodeSectionTitle>
                                            <S.NewEpisodeButton onClick={() => alert('에피소드 작성으로 가기')}>
                                                새 에피소드 쓰기
                                            </S.NewEpisodeButton>
                                        </S.EpisodeHeaderWrap>

                                        <S.MockEpisodeItem>
                                            <span>3화 - 어둠 속의 습격</span>
                                            <span>2024-03-27</span>
                                        </S.MockEpisodeItem>
                                        <S.MockEpisodeItem>
                                            <span>2화 - 밝혀지는 진실</span>
                                            <span>2024-03-20</span>
                                        </S.MockEpisodeItem>
                                        <S.MockEpisodeItem>
                                            <span>1화 - 새로운 시작</span>
                                            <span>2024-03-13</span>
                                        </S.MockEpisodeItem>
                                    </S.EpisodeInfoSection>
                                </S.ContentCard>
                            ))}
                            {pageData && pageData.totalPages > 0 && (
                                <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                            )}
                        </S.ListContainer>
                    )}
                </SidebarRightWrap>
            </SidebarMain>
        </MainContainer>
    )
}

export default MyContentList;