import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import DatePicker from "../../components/DatePicker/DatePicker";
import api from "../../api/axiosInstance";
import { SimpleContent } from "../../types/Creator";
import WebnovelEditor from "../../components/Creators/WebnovelEditor";
import WebtoonUploader from "../../components/Creators/WebtoonUploader";
import { formatUrl } from "../../utils/formatContentType";
import { formatDate } from "../../utils/formatData";

import { EpisodeImageItem } from "../../types/WebtoonImage";

function EpisodeRegistrationPage() {
    const { contentId } = useParams<{ contentId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const [simpleContent, setSimpleContent] = useState<SimpleContent | null>(null);
    const [title, setTitle] = useState("");
    const [uploadDate, setUploadDate] = useState("");

    // Webnovel specific
    const [novelContent, setNovelContent] = useState("");

    // Webtoon specific
    const [webtoonImages, setWebtoonImages] = useState<EpisodeImageItem[]>([]);

    const dayMap: Record<string, number> = {
        "SUNDAY": 0, "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, "FRIDAY": 5, "SATURDAY": 6
    };

    useEffect(() => {
        const fetchContentData = async () => {
            if (contentId) {
                try {
                    const response = await api.get(`/creators/contents/${contentId}/simple`);
                    console.log(response.data);
                    setSimpleContent(response.data);
                } catch (error) {
                    console.error("작품 정보 조회 실패:", error);
                }
            }
        };
        fetchContentData();
    }, [contentId]);

    const handleDisabledDate = (date: dayjs.Dayjs) => {
        if (!simpleContent || !simpleContent.serialDay) return false;
        const targetDay = dayMap[simpleContent.serialDay];
        if (date.day() !== targetDay) return true;
        const now = dayjs();
        if (date.isBefore(now, "day")) return true;
        return false;
    };

    const isFormValid = () => {
        if (!title.trim() || !uploadDate) return false;
        if (simpleContent?.contentType === "WEBNOVEL") return novelContent.trim().length > 0;
        if (simpleContent?.contentType === "WEBTOON") return webtoonImages.length > 0;
        return false;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid() || !simpleContent) return;

        const isWebtoon = simpleContent.contentType === "WEBTOON";
        let payload: any;
        let headers = {};

        if (isWebtoon) {
            const formData = new FormData();
            const data = {
                title,
                publishedAt: dayjs(uploadDate).format("YYYY-MM-DD")
            };

            formData.append(
                "data",
                new Blob([JSON.stringify(data)], { type: "application/json" })
            );

            webtoonImages.forEach(img => {
                if (img.file) {
                    formData.append("files", img.file);
                }
            });
            payload = formData;
            headers = { "Content-Type": "multipart/form-data" };
        } else {
            payload = {
                title,
                content: novelContent,
                publishedAt: dayjs(uploadDate).format("YYYY-MM-DD")
            };
        }

        try {
            const response = await api.post(`/creators/${formatUrl(simpleContent.contentType)}/${contentId}/episodes`, payload, { headers });
            alert("에피소드가 성공적으로 등록되었습니다.");
            navigate(`/creators/${formatUrl(simpleContent.contentType)}/${contentId}/episodes/${response.data}`);
        } catch (error) {
            console.error("에피소드 등록 실패:", error);
            alert("에피소드 등록에 실패했습니다.");
        }
    };

    if (!simpleContent) {
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
                <S.CreatorTitle>
                    {simpleContent.contentType === "WEBTOON" || location.pathname.includes("webtoons") ? "웹툰" : "웹소설"} 에피소드 등록
                </S.CreatorTitle>
                {simpleContent && (
                    <S.CreatorSubtitle>
                        {simpleContent.contentTitle} - {simpleContent.nextEpisodeNum}화
                    </S.CreatorSubtitle>
                )}

                <S.RegisterForm onSubmit={handleSubmit}>
                    <S.FieldsColumn>
                        <S.FieldGroup>
                            <S.FieldLabel htmlFor="episode-title">제목</S.FieldLabel>
                            <S.TextInput
                                id="episode-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="에피소드 제목을 입력하세요."
                            />
                        </S.FieldGroup>

                        <S.FieldGroup>
                            <S.FieldLabel>업로드 날짜</S.FieldLabel>
                            <DatePicker
                                value={uploadDate}
                                onChange={setUploadDate}
                                placeholder="연재 요일에 맞춰 날짜를 선택해 주세요."
                                disabledDate={handleDisabledDate}
                            />
                        </S.FieldGroup>

                        {/* Content specific section */}
                        {simpleContent.contentType === "WEBNOVEL" ? (
                            <WebnovelEditor content={novelContent} onChange={setNovelContent} />
                        ) : (
                            <WebtoonUploader images={webtoonImages} setImages={setWebtoonImages} />
                        )}
                    </S.FieldsColumn>

                    <S.SubmitButtonWrap>
                        <S.SubmitButton type="submit" disabled={!isFormValid()}>
                            에피소드 등록
                        </S.SubmitButton>
                    </S.SubmitButtonWrap>
                </S.RegisterForm>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default EpisodeRegistrationPage;
