import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import { MainContainer, SidebarMain, SidebarRightWrap } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import { useParams, useNavigate } from "react-router-dom";
import { CreatorDeleteContent } from "../../types/Creator";
import { formatKorean } from "../../utils/formatContentType";

function DeleteRequestPage() {
    const { contentId } = useParams<{ contentId: string }>();
    const navigate = useNavigate();
    const [creatorDeleteContent, setCreatorDeleteContent] = useState<CreatorDeleteContent | null>(null);

    // 폼 상태
    const [selectedReason, setSelectedReason] = useState("");
    const [reasonDetail, setReasonDetail] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);

    const deleteReasons = [
        { value: "STORY_ISSUE", label: "스토리 전개 및 비축분 부족" },
        { value: "REMAKE", label: "리메이크 및 재준비" },
        { value: "PERSONAL_ISSUE", label: "개인 사정 (건강, 학업 등)" },
        { value: "PLATFORM_MOVE", label: "타 플랫폼 이동 및 계약" },
        { value: "LOW_PERFORMANCE", label: "조회수 및 반응 미흡" },
        { value: "OTHERS", label: "기타" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            if (!contentId) return;
            try {
                const response = await api.get(`/creators/contents/${contentId}/delete-info`);
                setCreatorDeleteContent(response.data);
            } catch (error) {
                console.error("작품 삭제 정보 조회 실패:", error);
                alert("작품 정보를 불러오는 데 실패했습니다.");
                navigate("/creators/contents/list");
            }
        };
        fetchData();
    }, [contentId, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) return;

        if (!window.confirm("정말로 작품 삭제 요청을 보내시겠습니까?\n삭제는 관리자 승인 후 진행됩니다.")) {
            return;
        }

        try {
            await api.post(`/creators/contents/${contentId}/delete-requests`, {
                deleteReason: selectedReason,
                reasonDetail: reasonDetail
            });
            alert("작품 삭제 요청이 성공적으로 접수되었습니다.\n관리자 승인 후 삭제가 완료됩니다.");
            navigate("/creators/contents/list");
        } catch (error) {
            console.error("작품 삭제 요청 실패:", error);
            alert("작품 삭제 요청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const isFormValid = selectedReason !== "" && reasonDetail.trim().length > 0 && isAgreed;

    if (!creatorDeleteContent) {
        return (
            <MainContainer>
                <SidebarMain>
                    <CreatorSidebar />
                    <SidebarRightWrap>로딩 중...</SidebarRightWrap>
                </SidebarMain>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <SidebarMain>
                <CreatorSidebar />
                <SidebarRightWrap>
                    <S.CreatorTitle>작품 삭제 요청</S.CreatorTitle>

                    <S.DeleteWarningBox>
                        <S.DeleteWarningText>
                            작품 삭제는 관리자의 승인이 필요한 작업입니다.<br />
                            삭제 사유를 작성해 주시면 검토 후 처리가 진행됩니다.<br />
                            관리자가 삭제를 승인하여 삭제 처리가 완료되기 전까지는 요청을 취소하실 수 있습니다.
                        </S.DeleteWarningText>
                    </S.DeleteWarningBox>

                    <S.DeleteInfoBox>
                        <S.DeleteInfoItem>
                            <S.DeleteInfoLabel>작품 제목</S.DeleteInfoLabel>
                            <span>{creatorDeleteContent.contentTitle}</span>
                        </S.DeleteInfoItem>
                        <S.DeleteInfoItem>
                            <S.DeleteInfoLabel>작품 타입</S.DeleteInfoLabel>
                            <span>{formatKorean(creatorDeleteContent.contentType)}</span>
                        </S.DeleteInfoItem>
                    </S.DeleteInfoBox>

                    <S.RegisterForm onSubmit={handleSubmit}>
                        <S.FieldGroup>
                            <S.FieldLabel style={{ width: "auto", marginBottom: "12px" }}>삭제 사유 선택</S.FieldLabel>
                            <S.DeleteReasonGrid>
                                {deleteReasons.map((reason) => (
                                    <S.DeleteReasonLabel key={reason.value} $selected={selectedReason === reason.value}>
                                        <input
                                            type="radio"
                                            name="deleteReason"
                                            value={reason.value}
                                            checked={selectedReason === reason.value}
                                            onChange={(e) => setSelectedReason(e.target.value)}
                                        />
                                        {reason.label}
                                    </S.DeleteReasonLabel>
                                ))}
                            </S.DeleteReasonGrid>
                        </S.FieldGroup>

                        <S.FieldGroup>
                            <S.FieldLabel style={{ width: "auto" }} htmlFor="reason-detail">상세 사유 작성</S.FieldLabel>
                            <S.DeleteTextArea
                                id="reason-detail"
                                value={reasonDetail}
                                onChange={(e) => setReasonDetail(e.target.value)}
                                placeholder="작품을 삭제하려는 구체적인 이유를 입력해 주세요."
                                required
                            />
                        </S.FieldGroup>

                        <S.DeleteAgreementWrap>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                            />
                            <span>삭제 시 복구가 불가능함에 동의합니다.</span>
                        </S.DeleteAgreementWrap>

                        <S.SubmitButtonWrap>
                            <S.SubmitButton type="submit" disabled={!isFormValid}>
                                삭제 요청하기
                            </S.SubmitButton>
                        </S.SubmitButtonWrap>
                    </S.RegisterForm>
                </SidebarRightWrap>
            </SidebarMain>
        </MainContainer>
    );
}

export default DeleteRequestPage;
