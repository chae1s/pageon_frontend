import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MainContainer, SidebarMain, SidebarRightWrap } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import DatePicker from "../../components/DatePicker/DatePicker";
import { CreateContent } from "../../types/Creator";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

function NewContentPage() {
    const contentTypeOptions = [
        { value: "webtoons", label: "웹툰" },
        { value: "webnovels", label: "웹소설" }
    ];
    const [contentType, setContentType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [keywords, setKeywords] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsImageModalOpen(true);
    };

    const handleDeleteImage = () => {
        setCoverImage(null);
        setCoverPreviewUrl("");
        setIsImageModalOpen(false);
    };

    const handleChangeImage = () => {
        const fileInput = document.getElementById("content-cover-image");
        if (fileInput) {
            fileInput.click();
        }
        setIsImageModalOpen(false);
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverImage(file);
    };

    const handleDisabledDate = (date: dayjs.Dayjs) => {
        const now = dayjs();
        const isPast = date.isBefore(now, "day");
        const isToday = date.isSame(now, "day");
        if (isPast) return true;
        if (isToday && now.hour() >= 23) return true;
        return false;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid || !coverImage) return;

        const formatted = dayjs(publishDate).format("YYYY-MM-DD");

        const contentData: CreateContent = {
            title,
            description,
            contentType,
            publishedAt: formatted,
            keywords,
            coverImage: coverImage,
            workStatus: 'PENDING'
        };

        console.log("제출할 데이터:", contentData);

        try {
            const response = await api.post("/creators/contents", contentData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("작품 등록 성공:", response.data);
            alert("작품이 성공적으로 등록되었습니다.");
            navigate("/creators/dashboard");
        } catch (error) {
            console.error("작품 등록 실패:", error);
            alert("작품 등록에 실패했습니다.");
        }

    };

    useEffect(() => {
        if (!coverImage) {
            setCoverPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(coverImage);
        setCoverPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [coverImage]);

    const keywordTags = keywords
        .split(/,/)
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);
    const hasValidKoreanKeyword = keywordTags.some((tag) => /[가-힣]/.test(tag));

    const isFormValid =
        !!coverImage &&
        contentType !== "" &&
        title.trim().length > 0 &&
        description.trim().length > 0 &&
        publishDate !== "" &&
        hasValidKoreanKeyword;

    return (
        <MainContainer>
            <SidebarMain>
                <CreatorSidebar />
                <SidebarRightWrap>
                    <S.CreatorTitle>작품 등록</S.CreatorTitle>
                    <S.RegisterForm onSubmit={handleSubmit}>
                        <S.RegisterFormLayout>
                            <S.CoverFieldGroup>
                                <S.CoverFieldLabel htmlFor="content-cover-image">표지이미지</S.CoverFieldLabel>
                                <S.FileInput
                                    id="content-cover-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverImageChange}
                                />
                                {coverPreviewUrl ? (
                                    <S.CoverUploadBox as="div" onClick={handleImageClick}>
                                        <S.CoverPreviewImage src={coverPreviewUrl} alt="표지 미리보기" />
                                    </S.CoverUploadBox>
                                ) : (
                                    <S.CoverUploadBox htmlFor="content-cover-image">
                                        <S.UploadIcon>+</S.UploadIcon>
                                        <S.UploadText>이미지 선택</S.UploadText>
                                    </S.CoverUploadBox>
                                )}
                            </S.CoverFieldGroup>

                            <S.FieldsColumn>
                                <S.FieldGroup>
                                    <S.FieldLabel>작품타입</S.FieldLabel>
                                    <S.TypeSelectGroup>
                                        {contentTypeOptions.map((option) => (
                                            <S.TypeSelectBox key={option.value} $selected={contentType === option.value}>
                                                <input
                                                    type="radio"
                                                    name="contentType"
                                                    value={option.value}
                                                    checked={contentType === option.value}
                                                    onChange={(e) => setContentType(e.target.value)}
                                                />
                                                {option.label}
                                            </S.TypeSelectBox>
                                        ))}
                                    </S.TypeSelectGroup>
                                </S.FieldGroup>

                                <S.FieldGroup>
                                    <S.FieldLabel htmlFor="content-title">제목</S.FieldLabel>
                                    <S.TextInput
                                        id="content-title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="작품 제목을 입력하세요."
                                    />
                                </S.FieldGroup>

                                <S.FieldGroup>
                                    <S.FieldLabel htmlFor="content-description">설명</S.FieldLabel>
                                    <S.TextArea
                                        id="content-description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="작품 설명을 입력하세요."
                                    />
                                </S.FieldGroup>

                                <S.FieldGroup>
                                    <S.FieldLabel htmlFor="publish-date">연재일</S.FieldLabel>
                                    <DatePicker
                                        value={publishDate}
                                        onChange={setPublishDate}
                                        placeholder="날짜 선택"
                                        disabledDate={handleDisabledDate}
                                    />
                                </S.FieldGroup>

                                <S.FieldGroup>
                                    <S.KeywordFieldRow>
                                        <S.FieldLabel htmlFor="content-keywords">키워드</S.FieldLabel>
                                        <S.KeywordLineInput
                                            id="content-keywords"
                                            type="text"
                                            value={keywords}
                                            onChange={(e) => setKeywords(e.target.value)}
                                            placeholder="예: 판타지, 액션, 성장"
                                        />
                                    </S.KeywordFieldRow>
                                    {keywordTags.length > 0 && (
                                        <S.KeywordTagList>
                                            {keywordTags.map((tag, idx) => (
                                                <S.KeywordTag key={`${tag}-${idx}`}>#{tag}</S.KeywordTag>
                                            ))}
                                        </S.KeywordTagList>
                                    )}
                                </S.FieldGroup>
                            </S.FieldsColumn>
                        </S.RegisterFormLayout>
                        <S.SubmitButtonWrap>
                            <S.SubmitButton type="submit" disabled={!isFormValid}>
                                작품 등록
                            </S.SubmitButton>
                        </S.SubmitButtonWrap>
                    </S.RegisterForm>
                </SidebarRightWrap>
            </SidebarMain>

            {isImageModalOpen && (
                <S.ImageModalOverlay onClick={() => setIsImageModalOpen(false)}>
                    <S.ImageModalContent onClick={(e) => e.stopPropagation()}>
                        <S.ImageModalButtons>
                            <S.ImageModalButton type="button" onClick={handleChangeImage}>
                                이미지 바꾸기
                            </S.ImageModalButton>
                            <S.ImageModalButton $variant="danger" type="button" onClick={handleDeleteImage}>
                                이미지 지우기
                            </S.ImageModalButton>
                            <S.ImageModalButton $variant="cancel" type="button" onClick={() => setIsImageModalOpen(false)}>
                                취소
                            </S.ImageModalButton>
                        </S.ImageModalButtons>
                    </S.ImageModalContent>
                </S.ImageModalOverlay>
            )}
        </MainContainer>
    )
}

export default NewContentPage;