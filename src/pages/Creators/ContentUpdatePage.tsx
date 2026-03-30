import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import { MainContainer, NoSidebarMain, SidebarMain } from "../../styles/Layout.styles";
import { MdAdd } from "react-icons/md";
import { SidebarRightWrap } from "../Users/MyPage.styles";
import * as S from "./CreatorContent.styles";
import api from "../../api/axiosInstance";
import { CreatorContentDetail } from "../../types/Creator";

const AddIcon = MdAdd as any;

function ContentUpdatePage() {
    const { contentId } = useParams<{ contentId: string }>();
    const navigate = useNavigate();

    const [creatorContentDetail, setCreatorContentDetail] = useState<CreatorContentDetail | null>(null);

    // 폼 상태
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [serialDay, setSerialDay] = useState("");
    const [seriesStatus, setSeriesStatus] = useState("");

    // 이미지 관련 상태
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const serialDayOptions = [
        { value: "MONDAY", label: "월" },
        { value: "TUESDAY", label: "화" },
        { value: "WEDNESDAY", label: "수" },
        { value: "THURSDAY", label: "목" },
        { value: "FRIDAY", label: "금" },
        { value: "SATURDAY", label: "토" },
        { value: "SUNDAY", label: "일" },
    ];

    const seriesStatusOptions = [
        { value: "ONGOING", label: "연재" },
        { value: "REST", label: "휴재" },
        { value: "COMPLETED", label: "완결" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            if (contentId) {
                try {
                    const response = await api.get(`/creators/contents/${contentId}`);
                    setCreatorContentDetail(response.data);
                } catch (error) {
                    console.error("작품 정보 조회 실패: ", error);
                }
            }
        };
        fetchData();
    }, [contentId]);

    // 데이터를 성공적으로 받아오면 폼에 초기값 세팅해줍니다.
    useEffect(() => {
        if (creatorContentDetail) {
            // 삭제 요청 중인 경우 수정 접근 차단
            if (creatorContentDetail.workStatus === "DELETING") {
                alert("삭제 요청 중인 작품은 수정할 수 없습니다.");
                navigate("/creators/contents/list");
                return;
            }

            setTitle(creatorContentDetail.contentTitle || "");
            setDescription(creatorContentDetail.description || "");
            setKeywords(creatorContentDetail.keywordLine || "");
            setSerialDay(creatorContentDetail.serialDay || "");
            setSeriesStatus(creatorContentDetail.seriesStatus || "");

            if (creatorContentDetail.cover) {
                setCoverPreviewUrl(creatorContentDetail.cover);
            }
        }
    }, [creatorContentDetail]);

    // 새 이미지가 선택되었을 때만 로컬 미리보기를 업데이트합니다.
    useEffect(() => {
        if (!coverImage) return;

        const objectUrl = URL.createObjectURL(coverImage);
        setCoverPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [coverImage]);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) return;

        // 백엔드 @RequestPart("data") ContentUpdate request 구조에 맞게 구성
        const contentUpdate = {
            title: title.trim(),
            description: description.trim(),
            keywords: keywords.trim(),
            serialDay: serialDay,
            seriesStatus: seriesStatus
        };

        const formData = new FormData();

        // 1. "data" 파트: JSON 데이터를 Blob으로 만들어 Content-Type 명시
        formData.append(
            "data",
            new Blob([JSON.stringify(contentUpdate)], { type: "application/json" })
        );

        // 2. "coverImage" 파트: 새로운 이미지가 있을 때만 추가 (없으면 파트가 제외되어 백엔드에서 null로 받게 됨)
        if (coverImage) {
            formData.append("coverImage", coverImage);
        }

        try {
            await api.patch(`/creators/contents/${contentId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            alert("작품 수정이 성공적으로 완료되었습니다.");
            navigate(`/creators/contents/${contentId}`);
        } catch (error) {
            console.error("작품 수정 실패:", error);
            alert("작품 수정에 실패했습니다.");
        }
    };

    const keywordTags = keywords
        .split(/,/)
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);
    const hasValidKoreanKeyword = keywordTags.some((tag) => /[가-힣]/.test(tag));

    const isFormValid =
        !!coverPreviewUrl &&
        title.trim().length > 0 &&
        description.trim().length > 0 &&
        !!seriesStatus &&
        hasValidKoreanKeyword;

    if (!creatorContentDetail) {
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
                <S.CreatorTitle>작품 수정</S.CreatorTitle>
                <S.RegisterForm onSubmit={handleSubmit}>
                    <S.RegisterFormLayout>
                        {/* 좌측 표지 영역 */}
                        <div>
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
                                        <S.UploadIcon><AddIcon /></S.UploadIcon>
                                        <S.UploadText>이미지 선택</S.UploadText>
                                    </S.CoverUploadBox>
                                )}
                            </S.CoverFieldGroup>
                        </div>

                        {/* 우측 입력 폼 영역 */}
                        <S.FieldsColumn>
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

                            <S.CompactFieldGroup>
                                <S.KeywordFieldRow>
                                    <S.FieldLabel>연재요일</S.FieldLabel>
                                    <S.TextSelectGroup>
                                        {serialDayOptions.map((option) => (
                                            <S.TextSelectBox key={option.value} $selected={serialDay === option.value}>
                                                <input
                                                    type="radio"
                                                    name="serialDay"
                                                    value={option.value}
                                                    checked={serialDay === option.value}
                                                    onChange={(e) => setSerialDay(e.target.value)}
                                                />
                                                {option.label}
                                            </S.TextSelectBox>
                                        ))}
                                    </S.TextSelectGroup>
                                </S.KeywordFieldRow>
                            </S.CompactFieldGroup>

                            <S.CompactFieldGroup>
                                <S.KeywordFieldRow>
                                    <S.FieldLabel>연재상태</S.FieldLabel>
                                    <S.TextSelectGroup>
                                        {seriesStatusOptions.map((option) => (
                                            <S.TextSelectBox key={option.value} $selected={seriesStatus === option.value}>
                                                <input
                                                    type="radio"
                                                    name="seriesStatus"
                                                    value={option.value}
                                                    checked={seriesStatus === option.value}
                                                    onChange={(e) => setSeriesStatus(e.target.value)}
                                                />
                                                {option.label}
                                            </S.TextSelectBox>
                                        ))}
                                    </S.TextSelectGroup>
                                </S.KeywordFieldRow>
                            </S.CompactFieldGroup>

                            <S.CompactFieldGroup>
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
                            </S.CompactFieldGroup>
                        </S.FieldsColumn>
                    </S.RegisterFormLayout>

                    <S.SubmitButtonWrap>
                        <S.SubmitButton type="submit" disabled={!isFormValid}>
                            수정하기
                        </S.SubmitButton>
                    </S.SubmitButtonWrap>
                </S.RegisterForm>
            </NoSidebarMain>

            {/* 이미지 모달 */}
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
    );
}

export default ContentUpdatePage;
