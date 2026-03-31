import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import DatePicker from "../../components/DatePicker/DatePicker";
import api from "../../api/axiosInstance";
import { SimpleContent, WebnovelEpisodeDetail, WebtoonEpisodeDetail } from "../../types/Creator";
import WebnovelEditor from "../../components/Creators/WebnovelEditor";
import WebtoonUploader from "../../components/Creators/WebtoonUploader";
import { formatUrl } from "../../utils/formatContentType";

import { EpisodeImageItem } from "../../types/WebtoonImage";

function EpisodeUpdatePage() {
    const { type, contentId, episodeId } = useParams<{ type: string; contentId: string; episodeId: string }>();
    const navigate = useNavigate();

    const [simpleContent, setSimpleContent] = useState<SimpleContent | null>(null);
    const [title, setTitle] = useState("");
    const [publishedAt, setPublishedAt] = useState("");

    // Webnovel specific
    const [novelContent, setNovelContent] = useState("");

    // Webtoon specific
    const [webtoonImages, setWebtoonImages] = useState<EpisodeImageItem[]>([]);
    const [episodeNum, setEpisodeNum] = useState<number | null>(null);
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(true);

    const dayMap: Record<string, number> = {
        "SUNDAY": 0, "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, "FRIDAY": 5, "SATURDAY": 6
    };

    useEffect(() => {
        const fetchAllData = async () => {
            if (!contentId || !episodeId || !type) return;

            try {
                // 1. Fetch Simple Content to get serialDay and confirm contentType
                const contentResponse = await api.get(`/creators/contents/${contentId}/simple`);
                setSimpleContent(contentResponse.data);

                // 2. Fetch Episode Detail
                const contentTypePath = formatUrl(contentResponse.data.contentType);
                const episodeResponse = await api.get(`/creators/${contentTypePath}/${contentId}/episodes/${episodeId}`);

                if (contentResponse.data.contentType === "WEBNOVEL") {
                    const data = episodeResponse.data as WebnovelEpisodeDetail;
                    setTitle(data.episodeTitle || "");
                    setPublishedAt(data.publishedAt || "");
                    setNovelContent(data.content || "");
                    setEpisodeNum(data.episodeNum);
                    setIsPublished(data.episodeStatus === "PUBLISHED");
                } else {
                    const data = episodeResponse.data as WebtoonEpisodeDetail;
                    setTitle(data.episodeTitle || "");
                    setPublishedAt(data.publishedAt || "");
                    setEpisodeNum(data.episodeNum);
                    setIsPublished(data.episodeStatus === "PUBLISHED");

                    // Map existing images to the hybrid structure
                    const existingImages: EpisodeImageItem[] = data.episodeImages.map((img, index) => ({
                        id: img.id,
                        preview: img.imageUrl,
                        file: undefined, // No file object for existing images
                        label: index + 1
                    }));
                    setWebtoonImages(existingImages);
                }

                setLoading(false);
            } catch (error) {
                console.error("데이터 조회 실패:", error);
                alert("정보를 불러오는 데 실패했습니다.");
                navigate(-1);
            }
        };

        fetchAllData();
    }, [contentId, episodeId, type, navigate]);

    const handleDisabledDate = (date: dayjs.Dayjs) => {
        if (!simpleContent?.serialDay) return false;

        // 과거 날짜 선택 불가
        if (date.isBefore(dayjs(), "day")) return true;

        const targetDay = dayMap[simpleContent.serialDay];
        if (date.day() !== targetDay) return true;
        return false;
    };

    const isFormValid = () => {
        if (!title || !title.trim() || !publishedAt) return false;
        if (simpleContent?.contentType === "WEBNOVEL") return !!novelContent && novelContent.trim().length > 0;
        if (simpleContent?.contentType === "WEBTOON") return webtoonImages.length > 0;
        return false;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid() || !simpleContent) return;

        const isWebtoon = simpleContent.contentType === "WEBTOON";
        const contentTypePath = formatUrl(simpleContent.contentType);
        let payload: any;
        let headers = {};

        if (isWebtoon) {
            const formData = new FormData();

            const existingImages = webtoonImages
                .map((img, index) => ({ id: img.id, sequence: index + 1, file: img.file }))
                .filter(item => !item.file)
                .map(({ id, sequence }) => ({ id, sequence }));

            const newImageSequences = webtoonImages
                .map((img, index) => ({ file: img.file, sequence: index + 1 }))
                .filter(item => !!item.file)
                .map(item => item.sequence);

            const updateData = {
                title: title,
                publishedAt: dayjs(publishedAt).format("YYYY-MM-DD"),
                existingImages,
                newImageSequences
            };

            console.log("전송 데이터(Webtoon) 확인:", updateData);

            formData.append(
                "data",
                new Blob([JSON.stringify(updateData)], { type: "application/json" })
            );

            // Append new files
            const hasNewFiles = webtoonImages.some(img => img.file);
            if (hasNewFiles) {
                webtoonImages.forEach(img => {
                    if (img.file) {
                        formData.append("newFiles", img.file);
                    }
                });
            } else {
                // 백엔드에서 'newFiles' 파트가 필수(Required)인 경우를 위해 빈 파트를 추가합니다.
                formData.append("newFiles", new Blob([], { type: "application/octet-stream" }));
            }

            payload = formData;
            headers = { "Content-Type": "multipart/form-data" };
        } else {
            payload = {
                title: title,
                content: novelContent,
                publishedAt: dayjs(publishedAt).format("YYYY-MM-DD")
            };
            headers = { "Content-Type": "application/json" };
        }

        try {
            const response = await api.patch(`/creators/${contentTypePath}/${contentId}/episodes/${episodeId}`, payload, { headers });
            alert("에피소드가 성공적으로 수정되었습니다.");
            console.log(payload);
            navigate(`/creators/${contentTypePath}/${contentId}/episodes/${response.data}`);
        } catch (error) {
            console.error("에피소드 수정 실패:", error);
            alert("에피소드 수정에 실패했습니다.");
        }
    };

    if (loading || !simpleContent) {
        return (
            <MainContainer>
                <NoSidebarMain />
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.CreatorTitle>
                    {simpleContent.contentType === "WEBTOON" ? "웹툰" : "웹소설"} 에피소드 수정
                </S.CreatorTitle>
                <S.CreatorSubtitle>
                    {simpleContent.contentTitle} - {episodeNum}화 수정
                </S.CreatorSubtitle>

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
                                value={publishedAt}
                                onChange={setPublishedAt}
                                placeholder="연재 요일에 맞춰 날짜를 선택해 주세요."
                                disabledDate={handleDisabledDate}
                                disabled={isPublished}
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
                            수정 완료
                        </S.SubmitButton>
                        <S.CancelButton
                            type="button"
                            onClick={() => navigate(-1)}
                            style={{ marginLeft: '12px' }}
                        >
                            취소
                        </S.CancelButton>
                    </S.SubmitButtonWrap>
                </S.RegisterForm>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default EpisodeUpdatePage;
