import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import api from "../../api/axiosInstance";
import { CreatorContentDetail } from "../../types/Creator";
import { formatKorean, formatUrl } from "../../utils/formatContentType";
import { MdOutlineDescription, MdOutlineLabel } from "react-icons/md";

const DescriptionIcon = MdOutlineDescription as any;
const LabelIcon = MdOutlineLabel as any;

const seriesStatusMap: Record<string, string> = {
    ONGOING: "연재 중",
    REST: "휴재",
    COMPLETED: "완결",
    DELETING: "삭제 요청 중"
};

const workStatusMap: Record<string, string> = {
    PUBLISHED: "공개",
    PRIVATE: "비공개",
    DELETING: "삭제 요청 중",
    PENDING: "심사대기"
};

const dayKoMap: Record<string, string> = {
    MONDAY: "월요일", TUESDAY: "화요일", WEDNESDAY: "수요일", THURSDAY: "목요일",
    FRIDAY: "금요일", SATURDAY: "토요일", SUNDAY: "일요일"
};

function ContentDetailPage() {
    const { contentId } = useParams<{ contentId: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<CreatorContentDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await api.get(`/creators/contents/${contentId}`);
                setContent(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("작품 상세 정보 조회 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [contentId]);

    if (loading) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    if (!content) {
        return (
            <MainContainer>
                <NoSidebarMain>
                </NoSidebarMain>
            </MainContainer>
        );
    }

    const keywords = content.keywordLine ? content.keywordLine.split(' ').filter(k => k.startsWith('#')) : [];

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.DetailContainer>
                    <S.DetailHero>
                        <S.DetailCover src={content.cover} alt={content.contentTitle} />
                        <S.DetailInfo>
                            <S.DetailHeader style={{ gap: '6px' }}>
                                <span style={{ fontSize: '16px', color: '#999', fontWeight: '700' }}>
                                    [{formatKorean(content.contentType)}]
                                </span>
                                <S.DetailTitle>{content.contentTitle}</S.DetailTitle>
                            </S.DetailHeader>

                            <S.DetailMetaList>
                                <S.DetailMetaItem>
                                    <S.DetailMetaLabel>연재 상태</S.DetailMetaLabel>
                                    <S.DetailMetaValue>
                                        {content.workStatus === 'DELETING' ? '삭제 요청 중' : seriesStatusMap[content.seriesStatus]}
                                    </S.DetailMetaValue>
                                </S.DetailMetaItem>
                                <S.DetailMetaItem>
                                    <S.DetailMetaLabel>연재 요일</S.DetailMetaLabel>
                                    <S.DetailMetaValue>{dayKoMap[content.serialDay] || "비정기"}</S.DetailMetaValue>
                                </S.DetailMetaItem>
                                <S.DetailMetaItem>
                                    <S.DetailMetaLabel>작품 상태</S.DetailMetaLabel>
                                    <S.DetailMetaValue>{workStatusMap[content.workStatus] || content.workStatus}</S.DetailMetaValue>
                                </S.DetailMetaItem>
                            </S.DetailMetaList>

                            <S.DetailKeywordList style={{ marginTop: '20px' }}>
                                {content.keywordLine ? content.keywordLine.split(',').map(kw => (
                                    <S.DetailKeyword key={kw.trim()}>#{kw.trim()}</S.DetailKeyword>
                                )) : "등록된 키워드가 없습니다."}
                            </S.DetailKeywordList>

                            <S.DetailHeroActions>
                                <S.DetailActionLink onClick={() => navigate(`/creators/${formatUrl(content.contentType)}/${contentId}/episodes/new`)}>
                                    에피소드 등록
                                </S.DetailActionLink>
                                <S.DetailActionLink onClick={() => navigate(`/creators/contents/${contentId}/edit`)}>
                                    수정
                                </S.DetailActionLink>
                                <S.DetailActionLink onClick={() => navigate(`/creators/contents/${contentId}/delete`)}>
                                    삭제
                                </S.DetailActionLink>
                                <S.DetailActionLink onClick={() => navigate(`/creators/contents/dashboard?contentId=${contentId}`)}>
                                    대시보드로 돌아가기
                                </S.DetailActionLink>
                            </S.DetailHeroActions>
                        </S.DetailInfo>
                    </S.DetailHero>

                    <S.DetailSection>
                        <S.DetailSectionTitle>
                            <DescriptionIcon /> 작품 설명
                        </S.DetailSectionTitle>
                        <S.DetailDescription>
                            {content.description || "등록된 설명이 없습니다."}
                        </S.DetailDescription>
                    </S.DetailSection>
                </S.DetailContainer>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default ContentDetailPage;
