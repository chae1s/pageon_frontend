import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import api from "../../api/axiosInstance";
import { WebnovelEpisodeDetail, WebtoonEpisodeDetail } from "../../types/Creator";
import { formatDateAndTime, formatDate } from "../../utils/formatData";

const statusMap: Record<string, string> = {
    PUBLISHED: "발행됨",
    SCHEDULED: "예약중",
    DRAFT: "임시저장",
    DELETING: "삭제 요청 중"
};

function EpisodeDetailPage() {
    const { contentId, episodeId } = useParams<{ contentId: string; episodeId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const isWebtoon = location.pathname.includes("webtoons");
    const contentType = isWebtoon ? "webtoons" : "webnovels";

    const [detail, setDetail] = useState<WebnovelEpisodeDetail | WebtoonEpisodeDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodeDetail = async () => {
            try {
                const response = await api.get(`/creators/${contentType}/${contentId}/episodes/${episodeId}`);
                setDetail(response.data);
            } catch (error) {
                console.error("에피소드 상세 조회 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodeDetail();
    }, [contentId, episodeId, contentType]);

    if (loading) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    if (!detail) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    const handleEdit = () => {
        navigate(`/creators/${contentType}/${contentId}/episodes/${episodeId}/edit`);
    };

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.DetailContainer>
                    <S.EpisodeDetailHeader>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', gap: '40px' }}>
                            <S.DetailInfo>
                                <S.DetailHeader>
                                    <span style={{ fontSize: '15px', color: '#888', fontWeight: '600' }}>
                                        {detail.contentTitle} - {detail.episodeNum}화
                                    </span>
                                    <S.StatusValueBadge $type={detail.episodeStatus}>
                                        {statusMap[detail.episodeStatus] || detail.episodeStatus}
                                    </S.StatusValueBadge>
                                </S.DetailHeader>
                                <S.DetailTitle>{detail.episodeTitle}</S.DetailTitle>

                                <S.DetailMetaList>
                                    <S.DetailMetaItem>
                                        <S.DetailMetaLabel>등록일</S.DetailMetaLabel>
                                        <S.DetailMetaValue>{formatDateAndTime(detail.createdAt)}</S.DetailMetaValue>
                                    </S.DetailMetaItem>
                                    <S.DetailMetaItem>
                                        <S.DetailMetaLabel>발행일</S.DetailMetaLabel>
                                        <S.DetailMetaValue>{formatDate(detail.publishedAt)}</S.DetailMetaValue>
                                    </S.DetailMetaItem>
                                </S.DetailMetaList>
                            </S.DetailInfo>

                            <S.DetailHeroActions style={{ marginTop: 0, paddingBottom: '16px' }}>
                                <S.DetailActionLink onClick={handleEdit}>
                                    수정
                                </S.DetailActionLink>
                                <S.DetailActionLink onClick={handleEdit}>
                                    삭제
                                </S.DetailActionLink>
                                <S.DetailActionLink onClick={() => navigate(`/creators/contents/episodes/dashboard?contentId=${contentId}`)}>
                                    대시보드로 돌아가기
                                </S.DetailActionLink>
                            </S.DetailHeroActions>
                        </div>
                    </S.EpisodeDetailHeader>

                    <S.EpisodeViewerBox>
                        {isWebtoon ? (
                            <S.WebtoonEpisodeContent>
                                {(detail as WebtoonEpisodeDetail).episodeImages.map((img) => (
                                    <S.WebtoonDetailImage
                                        key={img.id}
                                        src={img.imageUrl}
                                        alt={`panel-${img.sequence}`}
                                        onContextMenu={(e) => e.preventDefault()}
                                        onDragStart={(e) => e.preventDefault()}
                                        draggable={false}
                                    />
                                ))}
                            </S.WebtoonEpisodeContent>
                        ) : (
                            <S.WebnovelEpisodeContent>
                                {(detail as WebnovelEpisodeDetail).content}
                            </S.WebnovelEpisodeContent>
                        )}
                    </S.EpisodeViewerBox>
                </S.DetailContainer>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default EpisodeDetailPage;
