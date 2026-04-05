import React, { useEffect, useState } from "react";
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import { MainContainer, NoSidebarMain, SidebarMain, SidebarRightWrap } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import { CreatorDeletionList } from "../../types/Creator";
import api from "../../api/axiosInstance";
import { Pagination } from "../../types/Page";

function DeleteContentList() {
    const [deletionList, setDeletionList] = useState<CreatorDeletionList[]>([]);
    const [pageData, setPageData] = useState<Pagination<CreatorDeletionList> | null>(null);
    const [openRequestId, setOpenRequestId] = useState<number | null>(null);

    const reasonMap: Record<string, string> = {
        STORY_ISSUE: "스토리 전개 및 비축분 부족",
        REMAKE: "리메이크 및 재준비",
        PERSONAL_ISSUE: "개인 사정 (건강, 학업 등)",
        PLATFORM_MOVE: "타 플랫폼 이동 및 계약",
        LOW_PERFORMANCE: "조회수 및 반응 미흡",
        OTHERS: "기타",
    };

    const statusMap: Record<string, string> = {
        PENDING: "대기 중",
        APPROVED: "승인",
        REJECTED: "반려",
        CANCELED: "취소됨",
    };

    const fetchData = async () => {
        try {
            const response = await api.get("/creators/contents/delete-requests");
            setDeletionList(response.data.content || []);
            setPageData(response.data);
        } catch (error) {
            console.error("삭제 요청 목록 조회 실패:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRowClick = (id: number) => {
        setOpenRequestId((prev) => (prev === id ? null : id));
    };

    const handleCancelRequest = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // 행 클릭 이벤트 전파 방지
        if (!window.confirm("정말로 삭제 요청을 취소하시겠습니까?")) {
            return;
        }

        try {
            await api.delete(`/creators/contents/delete-requests/${id}`);
            alert("삭제 요청이 성공적으로 취소되었습니다.");
            fetchData(); // 목록 갱신
        } catch (error) {
            console.error("삭제 요청 취소 실패:", error);
            alert("삭제 요청 취소에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <MainContainer>
            <NoSidebarMain>

                <S.CreatorTitle>삭제 요청 작품</S.CreatorTitle>

                {deletionList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#888' }}>
                        삭제 요청한 작품이 없습니다.
                    </div>
                ) : (
                    <S.DeleteTable>
                        <colgroup>
                            <S.DeleteColTitle />
                            <S.DeleteColReason />
                            <S.DeleteColDate />
                            <S.DeleteColStatus />
                            <S.DeleteColAction />
                        </colgroup>
                        <thead>
                            <S.DeleteTheadTr>
                                <S.DeleteTh>작품명</S.DeleteTh>
                                <S.DeleteTh>삭제 사유</S.DeleteTh>
                                <S.DeleteTh $align="center">신청일</S.DeleteTh>
                                <S.DeleteTh $align="center">상태</S.DeleteTh>
                                <S.DeleteTh $align="center">관리</S.DeleteTh>
                            </S.DeleteTheadTr>
                        </thead>
                        <tbody>
                            {deletionList.map((item) => (
                                <React.Fragment key={item.id}>
                                    <S.DeleteTbodyTr
                                        onClick={() => handleRowClick(item.id)}
                                        style={{ cursor: 'pointer' }}
                                        $isOpen={openRequestId === item.id}
                                    >
                                        <S.DeleteTd style={{ fontWeight: 600 }}>{item.contentTitle}</S.DeleteTd>
                                        <S.DeleteTd>{reasonMap[item.deleteReason] || item.deleteReason}</S.DeleteTd>
                                        <S.DeleteTd $align="center">{formatDate(item.requestedAt)}</S.DeleteTd>
                                        <S.DeleteTd $align="center">
                                            <S.DeleteStatusBadge $status={item.deleteStatus}>
                                                {statusMap[item.deleteStatus] || item.deleteStatus}
                                            </S.DeleteStatusBadge>
                                        </S.DeleteTd>
                                        <S.DeleteTd $align="center">
                                            {item.deleteStatus === 'PENDING' && (
                                                <S.RequestCancelBtn onClick={(e) => handleCancelRequest(e, item.id)}>
                                                    요청 취소
                                                </S.RequestCancelBtn>
                                            )}
                                        </S.DeleteTd>
                                    </S.DeleteTbodyTr>
                                    {openRequestId === item.id && (
                                        <S.DeleteDetailTr>
                                            <S.DeleteDetailTd colSpan={5}>
                                                <S.DeleteDetailLabel>상세 사유</S.DeleteDetailLabel>
                                                <div style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                                                    {item.reasonDetail || "작성된 상세 사유가 없습니다."}
                                                </div>
                                            </S.DeleteDetailTd>
                                        </S.DeleteDetailTr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </S.DeleteTable>
                )}
            </NoSidebarMain>
        </MainContainer>
    );
}

export default DeleteContentList;