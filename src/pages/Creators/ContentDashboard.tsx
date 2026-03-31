import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import {
    MdInfoOutline,
    MdOutlineEventNote,
    MdOutlineBarChart,
    MdOutlineListAlt,
    MdOutlineChatBubbleOutline,
    MdSettingsSuggest,
    MdTrendingUp,
    MdOutlineMenuBook,
    MdAdd,
    MdDeleteOutline
} from "react-icons/md";
import { ContentStats, ContentIndividual } from "../../types/Creator";
import api from "../../api/axiosInstance";
import { formatCompactNumber, formatDate, formatDateAndTime } from "../../utils/formatData";
import { formatKorean, formatUrl } from "../../utils/formatContentType";

// React 19 아이콘 타입 호환성 이슈 해결을 위한 캐스팅
const InfoIcon = MdInfoOutline as any;
const EventNoteIcon = MdOutlineEventNote as any;
const BarChartIcon = MdOutlineBarChart as any;
const ListAltIcon = MdOutlineListAlt as any;
const ChatBubbleIcon = MdOutlineChatBubbleOutline as any;
const SettingsSuggestIcon = MdSettingsSuggest as any;
const TrendingIcon = MdTrendingUp as any;
const MenuBookIcon = MdOutlineMenuBook as any;
const AddIcon = MdAdd as any;
const DeleteIcon = MdDeleteOutline as any;

function ContentDashboard() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryContentId = searchParams.get("contentId");

    const [contentStats, setContentStats] = useState<ContentStats | null>(null);
    const [currentContent, setCurrentContent] = useState<ContentIndividual | null>(null);
    const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const response = await api.get("/creators/contents/dashboard");

                setContentStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error("통합 대시보드 데이터 조회 실패: ", error);
            }

        }

        fetchStatsData();
    }, [])

    // 데이터 로드 및 URL 파라미터 변경 시 작품 선택 (쿼리 스트링 우선, 없으면 첫 번째 작품)
    useEffect(() => {
        if (contentStats && contentStats.contents.length > 0) {
            if (queryContentId) {
                const targetId = Number(queryContentId);
                const exists = contentStats.contents.some(c => c.contentId === targetId);
                if (exists) {
                    setSelectedWorkId(targetId);
                    return;
                }
            }
            // 파라미터가 없거나 유효하지 않으면 첫 번째 작품 선택
            setSelectedWorkId(contentStats.contents[0].contentId);
        }
    }, [contentStats, queryContentId]);

    // 선택된 작품 변경 시 데이터 조회
    useEffect(() => {
        if (selectedWorkId) {
            const fetchContentData = async () => {
                try {
                    const response = await api.get(`/creators/contents/${selectedWorkId}/dashboard`);
                    setCurrentContent(response.data);
                } catch (error) {
                    console.error("콘텐츠 데이터 조회 실패: ", error);
                }
            }

            fetchContentData();
        }
    }, [selectedWorkId]);

    // 임시 데이터 리스트 (Mock Content List)
    const mockContentList = [
        {
            id: "1",
            title: "은하수의 끝에서",
            type: "WEBNOVEL",
            synopsis: "먼 미래, 인류가 우주로 진출한 시대. 버려진 소행성에서 발견된 고대 유물과 그를 둘러싼 거대 기업들의 음모를 파헤치는 한 항해사의 이야기입니다.",
            keywords: ["판타지", "SF", "스페이스 오페라", "우주"],
            serialDay: "WEDNESDAY",
            seriesStatus: "ONGOING",
            workStatus: "PUBLISHED",
            cover: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=300&h=450&auto=format&fit=crop",
            stats: { views: "1.2M", stars: "4.9", favorites: "45,280", rawViews: 1200000 },
            episodes: { total: 42, published: 40, draft: 2, lastUpdate: "2024.03.27 14:30" },
            demographics: {
                gender: [{ label: "남성", percent: 65, color: "#528efa" }, { label: "여성", percent: 35, color: "#ff6b6b" }],
                age: [{ label: "10대", percent: 15 }, { label: "20대", percent: 42 }, { label: "30대", percent: 30 }, { label: "40대+", percent: 13 }]
            }
        },
        {
            id: "2",
            title: "심해의 그림자",
            type: "WEBTOON",
            synopsis: "해수면이 상승한 지구, 심해 기지에서 벌어지는 기이한 사건들과 생존을 위한 사투를 그린 스릴러 웹툰입니다.",
            keywords: ["스릴러", "미스터리", "생존물", "심해"],
            serialDay: "FRIDAY",
            seriesStatus: "ONGOING",
            workStatus: "PUBLISHED",
            cover: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=300&h=450&auto=format&fit=crop",
            stats: { views: "850K", stars: "4.7", favorites: "28,400", rawViews: 850000 },
            episodes: { total: 24, published: 24, draft: 0, lastUpdate: "2024.03.25 18:15" },
            demographics: {
                gender: [{ label: "남성", percent: 45, color: "#528efa" }, { label: "여성", percent: 55, color: "#ff6b6b" }],
                age: [{ label: "10대", percent: 10 }, { label: "20대", percent: 50 }, { label: "30대", percent: 32 }, { label: "40대+", percent: 8 }]
            }
        },
        {
            id: "3",
            title: "내일의 레시피",
            type: "WEBTOON",
            synopsis: "요리를 통해 사람들의 마음을 치유하는 따뜻한 힐링 드라마. 매회 새로운 레시피와 스토리가 펼쳐집니다.",
            keywords: ["일상", "힐링", "요리", "드라마"],
            serialDay: "MONDAY",
            seriesStatus: "REST",
            workStatus: "PUBLISHED",
            cover: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=300&h=450&auto=format&fit=crop",
            stats: { views: "420K", stars: "4.9", favorites: "12,400", rawViews: 420000 },
            episodes: { total: 28, published: 26, draft: 2, lastUpdate: "2024.03.10 09:15" },
            demographics: {
                gender: [{ label: "남성", percent: 25, color: "#528efa" }, { label: "여성", percent: 75, color: "#ff6b6b" }],
                age: [{ label: "10대", percent: 20 }, { label: "20대", percent: 45 }, { label: "30대", percent: 20 }, { label: "40대+", percent: 15 }]
            }
        },
        {
            id: "4",
            title: "기억의 조각들",
            type: "WEBNOVEL",
            synopsis: "잃어버린 기억을 찾아 떠나는 미스터리 로맨틱 판타지 소설입니다.",
            keywords: ["미스터리", "로맨틱", "판타지"],
            serialDay: "TUESDAY",
            seriesStatus: "ONGOING",
            workStatus: "PUBLISHED",
            cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300&h=450&auto=format&fit=crop",
            stats: { views: "310K", stars: "4.6", favorites: "8,900", rawViews: 310000 },
            episodes: { total: 15, published: 15, draft: 0, lastUpdate: "2024.03.22 11:00" },
            demographics: {
                gender: [{ label: "남성", percent: 30, color: "#528efa" }, { label: "여성", percent: 70, color: "#ff6b6b" }],
                age: [{ label: "10대", percent: 15 }, { label: "20대", percent: 35 }, { label: "30대", percent: 35 }, { label: "40대+", percent: 15 }]
            }
        },
        {
            id: "5",
            title: "바람이 부는 곳",
            type: "WEBTOON",
            synopsis: "어디론가 떠나고 싶은 당신을 위한 본격 여행 힐링 웹툰.",
            keywords: ["여행", "힐링", "일상"],
            serialDay: "SATURDAY",
            seriesStatus: "ONGOING",
            workStatus: "PUBLISHED",
            cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=300&h=450&auto=format&fit=crop",
            stats: { views: "150K", stars: "4.8", favorites: "5,600", rawViews: 150000 },
            episodes: { total: 10, published: 10, draft: 0, lastUpdate: "2024.03.15 15:45" },
            demographics: {
                gender: [{ label: "남성", percent: 50, color: "#528efa" }, { label: "여성", percent: 50, color: "#ff6b6b" }],
                age: [{ label: "10대", percent: 10 }, { label: "20대", percent: 40 }, { label: "30대", percent: 40 }, { label: "40대+", percent: 10 }]
            }
        }
    ];

    // 현재 선택된 작품 상태
    const currentWork = useMemo(() => {
        // 실제 데이터에서 먼저 찾고, 없으면 ID가 매칭되는 목데이터에서 찾음 (데모용 호환성)
        const realWork = contentStats?.contents.find(c => c.contentId === selectedWorkId);
        if (realWork) {
            // 목데이터 항목 중 제목이 같은 걸 찾아 상세 정보를 가져옴 (실제로는 상세 API 필요)
            return mockContentList.find(c => c.title === realWork.contentTitle) || mockContentList[0];
        }
        return mockContentList[0];
    }, [selectedWorkId, contentStats]);

    const handleWriteEpisode = () => {
        const typePath = currentContent?.contentType === 'WEBTOON' ? 'webtoons' : 'webnovels';
        navigate(`/creators/${typePath}/${currentContent?.contentId}/episodes/new`);
    };

    const statusMap: Record<string, string> = {
        ONGOING: "연재 중",
        REST: "휴재",
        COMPLETED: "완결",
        PRIVATE: "습작 (비공개)",
        DELETING: "삭제 요청 중"
    };

    // 작품 상태별 카운트 계산
    const workStatusCounts = useMemo(() => {
        const counts = {
            ONGOING: 0,
            REST: 0,
            COMPLETED: 0,
            DELETING: 0
        };
        mockContentList.forEach(work => {
            const status = work.workStatus === 'DELETING' ? 'DELETING' : work.seriesStatus;
            if (Object.prototype.hasOwnProperty.call(counts, status)) {
                counts[status as keyof typeof counts]++;
            }
        });
        return counts;
    }, [mockContentList]);

    const dayKoMap: Record<string, string> = {
        MONDAY: "월요일", TUESDAY: "화요일", WEDNESDAY: "수요일",
        THURSDAY: "목요일", FRIDAY: "금요일", SATURDAY: "토요일", SUNDAY: "일요일"
    };

    if (loading) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    if (!currentContent) {
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
                        <S.CreatorTitle>작품 통합 대시보드</S.CreatorTitle>
                        <S.PageDescription>전체 작품의 성과를 한눈에 파악하고 관리하세요.</S.PageDescription>
                    </div>
                </S.PageHeaderWrapper>

                {/* 요약 현황 가로 배치 행 */}
                <S.SummaryCardsRow>
                    {/* 작품 운영 현황 카드 (에피소드 관리 현황과 동일 포맷) */}
                    <S.ManagementCard>
                        <S.ManagementCardHeader>
                            <S.ManagementCardTitle>
                                <TrendingIcon /> 작품 운영 현황
                            </S.ManagementCardTitle>
                            <S.CardActionBtn onClick={() => navigate('/creators/contents/list')}>
                                작품 목록 전체보기
                            </S.CardActionBtn>
                        </S.ManagementCardHeader>
                        <S.StatusSummaryRow>
                            <S.StatusSummaryItem onClick={() => navigate('/creators/contents/list?seriesStatus=ONGOING&page=0')}>
                                <S.StatusSummaryValue>{contentStats?.ongoingCount}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>연재 중</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                            <S.StatusSummaryItem onClick={() => navigate('/creators/contents/list?seriesStatus=REST&page=0')}>
                                <S.StatusSummaryValue>{contentStats?.restCount}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>휴재</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                            <S.StatusSummaryItem onClick={() => navigate('/creators/contents/list?seriesStatus=COMPLETED&page=0')}>
                                <S.StatusSummaryValue>{contentStats?.completedCount}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>완결</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                            <S.StatusSummaryItem $type="DELETING" onClick={() => navigate('/creators/contents/delete')}>
                                <S.StatusSummaryValue $type="DELETING">{contentStats?.deletionCount}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>삭제 요청</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                        </S.StatusSummaryRow>
                    </S.ManagementCard>

                    {/* 전체 성과 요약 카드 (에피소드 관리 현황과 동일 포맷) */}
                    <S.ManagementCard>
                        <S.ManagementCardHeader>
                            <S.ManagementCardTitle>
                                <BarChartIcon /> 전체 성과 요약
                            </S.ManagementCardTitle>
                            <S.CardActionBtn>상세 통계 보기</S.CardActionBtn>
                        </S.ManagementCardHeader>
                        <S.StatusSummaryRow $cols={3}>
                            <S.StatusSummaryItem>
                                <S.StatusSummaryValue>{formatCompactNumber(contentStats?.totalViewCount)}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>전체 누적 조회수</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                            <S.StatusSummaryItem>
                                <S.StatusSummaryValue>{Number(contentStats?.averageRating ?? 0).toFixed(1)}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>평균 별점</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                            <S.StatusSummaryItem>
                                <S.StatusSummaryValue>{formatCompactNumber(contentStats?.totalInterestCount)}</S.StatusSummaryValue>
                                <S.StatusSummaryLabel>전체 관심 등록</S.StatusSummaryLabel>
                            </S.StatusSummaryItem>
                        </S.StatusSummaryRow>
                    </S.ManagementCard>
                </S.SummaryCardsRow>

                <S.SubHeaderWrapper>
                    <S.SectionTitleFlex>
                        <S.SectionTitleIcon>
                            <TrendingIcon />
                        </S.SectionTitleIcon>
                        <S.SectionTitleLabel>작품 선택</S.SectionTitleLabel>
                    </S.SectionTitleFlex>
                </S.SubHeaderWrapper>

                {/* 작품 선택 바 */}
                <S.SelectionBar>
                    {contentStats?.contents.map(work => (
                        <S.MiniWorkCard
                            key={work.contentId}
                            $active={selectedWorkId === work.contentId}
                            onClick={() => setSelectedWorkId(work.contentId)}
                        >
                            <S.MiniCover src={work.cover} alt={work.contentTitle} />
                            <S.MiniInfo>
                                <S.MiniTitle>{work.contentTitle}</S.MiniTitle>
                                <S.MiniStatus>{formatKorean(work.contentType)}ㆍ{statusMap[work.seriesStatus]}</S.MiniStatus>
                            </S.MiniInfo>
                        </S.MiniWorkCard>
                    ))}
                    <S.AddWorkCard onClick={() => navigate('/creators/contents/new')}>
                        <AddIcon style={{ fontSize: '20px' }} /> 작품 신규 작성
                    </S.AddWorkCard>
                </S.SelectionBar>

                <S.PageSeparator />

                <S.CurrentWorkHeader>
                    <S.CurrentWorkTitleText>
                        [{currentContent.contentTitle}]
                    </S.CurrentWorkTitleText>
                </S.CurrentWorkHeader>

                <S.ManagementGrid>
                    {/* 1. 작품 통합 정보 (Metadata + Operational Status) */}
                    <S.ManagementCard>
                        <S.ManagementCardHeader>
                            <S.ManagementCardTitle>
                                <InfoIcon /> 작품 기본 정보 및 상태
                            </S.ManagementCardTitle>
                            <S.CardHeaderActions>
                                <S.CardActionBtn onClick={() => navigate(`/creators/contents/${currentContent.contentId || selectedWorkId}/edit`)}>
                                    수정
                                </S.CardActionBtn>
                                <S.CardActionBtn onClick={() => navigate(`/creators/contents/${currentContent.contentId || selectedWorkId}/delete`)}>
                                    삭제
                                </S.CardActionBtn>
                            </S.CardHeaderActions>
                        </S.ManagementCardHeader>
                        <S.MetaInfoWrapper>
                            <S.MetaCover src={currentContent.cover} alt="표지" />
                            <S.MetaTextWrap>
                                <S.MetaFlexRow>
                                    <S.MetaTitle
                                        onClick={() => navigate(`/creators/contents/${currentContent.contentId || selectedWorkId}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {currentContent.contentTitle}
                                    </S.MetaTitle>
                                    <S.StatusValueBadge $type={(currentContent.workStatus === 'DELETING' ? 'DELETING' : (currentContent.seriesStatus))}>
                                        {statusMap[(currentContent.workStatus === 'DELETING' ? 'DELETING' : (currentContent.seriesStatus))]}
                                    </S.StatusValueBadge>
                                </S.MetaFlexRow>
                                <S.MetaDesc
                                    onClick={() => navigate(`/creators/contents/${currentContent.contentId || selectedWorkId}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {currentContent.description}
                                </S.MetaDesc>
                                <S.MetaFieldRow>
                                    <S.MetaFieldLabel>{formatKorean(currentContent.contentType)}</S.MetaFieldLabel>
                                    <div>ㆍ</div>
                                    <S.MetaFieldValue>{dayKoMap[currentContent.serialDay]}</S.MetaFieldValue>
                                </S.MetaFieldRow>
                                <S.ContentKeywordWrap>
                                    {currentContent.keywords.map(keyword => (
                                        <S.ContentKeywordItem key={keyword}>#{keyword}</S.ContentKeywordItem>
                                    ))}
                                </S.ContentKeywordWrap>
                            </S.MetaTextWrap>
                        </S.MetaInfoWrapper>
                    </S.ManagementCard>

                    {/* 2. 에피소드 관리 현황 (Episode Status) */}
                    <S.ManagementCard>
                        <S.ManagementCardHeader>
                            <S.ManagementCardTitle>
                                <MenuBookIcon /> 에피소드 관리 현황
                            </S.ManagementCardTitle>
                            <S.CardHeaderActions>
                                {currentWork.workStatus === 'PUBLISHED' && currentWork.seriesStatus === 'ONGOING' && (
                                    <S.CardActionBtn onClick={handleWriteEpisode}>
                                        에피소드 등록
                                    </S.CardActionBtn>
                                )}
                                <S.CardActionBtn onClick={() => navigate('/creators/contents/episodes/dashboard')}>
                                    전체 보기
                                </S.CardActionBtn>
                            </S.CardHeaderActions>
                        </S.ManagementCardHeader>
                        <S.EpisodeStatGrid>
                            <S.EpisodeStatBox>
                                <S.EpisodeStatValue>{currentContent.episodeStats.totalEpisodeCount}</S.EpisodeStatValue>
                                <S.EpisodeStatLabel>총 회차</S.EpisodeStatLabel>
                            </S.EpisodeStatBox>
                            <S.EpisodeStatBox>
                                <S.EpisodeStatValue $color="#2e7d32">{currentContent.episodeStats.publishedEpisodeCount}</S.EpisodeStatValue>
                                <S.EpisodeStatLabel>공개 회차</S.EpisodeStatLabel>
                            </S.EpisodeStatBox>
                            <S.EpisodeStatBox>
                                <S.EpisodeStatValue $color="#757575">{currentContent.episodeStats.draftEpisodeCount}</S.EpisodeStatValue>
                                <S.EpisodeStatLabel>임시 저장</S.EpisodeStatLabel>
                            </S.EpisodeStatBox>
                            <S.EpisodeStatBox $bg="#fff9db" $borderColor="#ffec99">
                                <S.EpisodeStatValue $color="#f08c00">{currentContent.episodeStats.scheduledEpisodeCount}</S.EpisodeStatValue>
                                <S.EpisodeStatLabel>예약 업로드</S.EpisodeStatLabel>
                            </S.EpisodeStatBox>
                        </S.EpisodeStatGrid>
                        <S.LastUpdateInfo>
                            <span>최근 업데이트</span>
                            <S.MetaFieldValue>{formatDateAndTime(currentContent.episodeUpdatedAt)}</S.MetaFieldValue>
                        </S.LastUpdateInfo>
                    </S.ManagementCard>

                    {/* 3. 전체 성과 지표 (Core Analytics) */}
                    <S.ManagementCard $span2>
                        <S.ManagementCardHeader>
                            <S.ManagementCardTitle>
                                <BarChartIcon /> 전체 성과 지표
                            </S.ManagementCardTitle>
                            <S.CardActionBtn>상세 통계 보기</S.CardActionBtn>
                        </S.ManagementCardHeader>
                        <S.AnalyticsSummaryTotal>
                            <S.AnalyticsStatBox>
                                <S.StatValue>{currentWork.stats.views}</S.StatValue>
                                <S.StatLabel>총 조회수</S.StatLabel>
                            </S.AnalyticsStatBox>
                            <S.AnalyticsStatBox>
                                <S.StatValue>{currentWork.stats.stars}</S.StatValue>
                                <S.StatLabel>평균 별점</S.StatLabel>
                            </S.AnalyticsStatBox>
                            <S.AnalyticsStatBox>
                                <S.StatValue>{currentWork.stats.favorites}</S.StatValue>
                                <S.StatLabel>관심 등록</S.StatLabel>
                            </S.AnalyticsStatBox>
                        </S.AnalyticsSummaryTotal>

                        <S.ChartsGrid>
                            <S.ChartSectionWrap>
                                <S.ChartTitle>독자 성별 비율</S.ChartTitle>
                                <S.GenderBarContainer>
                                    {currentWork.demographics.gender.map(g => (
                                        <S.GenderBarSegment key={g.label} $percent={g.percent} $bg={g.color}>
                                            {g.percent}%
                                        </S.GenderBarSegment>
                                    ))}
                                </S.GenderBarContainer>
                                <S.ChartLegendRow>
                                    {currentWork.demographics.gender.map(g => (
                                        <S.LegendItem key={g.label}>
                                            <S.LegendDot $bg={g.color} /> {g.label}
                                        </S.LegendItem>
                                    ))}
                                </S.ChartLegendRow>
                            </S.ChartSectionWrap>

                            <S.ChartSectionWrap>
                                <S.ChartTitle>연령대별 분포</S.ChartTitle>
                                {currentWork.demographics.age.map(a => (
                                    <S.BarChartRow key={a.label}>
                                        <S.BarLabel>{a.label}</S.BarLabel>
                                        <S.BarTrack>
                                            <S.BarFill $percent={a.percent} />
                                        </S.BarTrack>
                                        <S.BarValue>{a.percent}%</S.BarValue>
                                    </S.BarChartRow>
                                ))}
                            </S.ChartSectionWrap>
                        </S.ChartsGrid>
                    </S.ManagementCard>

                </S.ManagementGrid>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default ContentDashboard;