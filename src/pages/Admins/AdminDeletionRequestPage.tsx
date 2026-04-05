import React, { useEffect, useState } from "react";
import * as S from "./AdminContent.styles";
import { MainContainer, NoSidebarMain, SortBtn } from "../../styles/Layout.styles";
import api from "../../api/axiosInstance";
import { DeletionRequestSummary, DeletionRequestDetail } from "../../types/Admins";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";
import { formatDate } from "../../utils/formatData";

// PENDING, APPROVED, REJECTED, CANCELED
const statusTabs = [
    { label: "대기", value: "PENDING" },
    { label: "승인", value: "APPROVED" },
    { label: "거절", value: "REJECTED" },
    { label: "취소", value: "CANCELED" }
];

function AdminDeletionRequestPage() {
    const [requests, setRequests] = useState<DeletionRequestSummary[]>([]);
    const [pageData, setPageData] = useState<Pagination<DeletionRequestSummary> | null>(null);
    const [page, setPage] = useState<number>(0);
    const [openId, setOpenId] = useState<number | null>(null);
    const [requestDetails, setRequestDetails] = useState<Record<number, DeletionRequestDetail>>({});

    // Default to PENDING as requested
    const [statusFilter, setStatusFilter] = useState<string>("PENDING");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get("/admin/contents/deletion-requests", {
                    params: {
                        status: statusFilter,
                        page: page
                    }
                });

                if (response.data) {
                    setRequests(response.data.content);
                    if (response.data.totalPages !== undefined) {
                        setPageData(response.data);
                    }
                }
            } catch (error) {
                console.error("작품 삭제 요청 목록 조회 실패: ", error);
            }
        };

        fetchRequests();
        setOpenId(null);
    }, [statusFilter, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setOpenId(null);
    };

    const getStatusLabel = (statusValue: string) => {
        if (!statusValue) return "-";
        const upperStatus = statusValue.toUpperCase();
        const tab = statusTabs.find(t => t.value.toUpperCase() === upperStatus);
        return tab ? tab.label : upperStatus;
    };

    const handleRowClick = async (id: number) => {
        if (openId === id) {
            setOpenId(null);
            return;
        }

        setOpenId(id);

        if (!requestDetails[id]) {
            try {
                const response = await api.get(`/admin/contents/deletion-requests/${id}`);
                setRequestDetails(prev => ({
                    ...prev,
                    [id]: response.data
                }));
            } catch (error) {
                console.error("작품 삭제 요청 상세 조회 실패: ", error);
            }
        }
    };

    const deleteReasons = [
        { value: "STORY_ISSUE", label: "스토리 전개 및 비축분 부족" },
        { value: "REMAKE", label: "리메이크 및 재준비" },
        { value: "PERSONAL_ISSUE", label: "개인 사정 (건강, 학업 등)" },
        { value: "PLATFORM_MOVE", label: "타 플랫폼 이동 및 계약" },
        { value: "LOW_PERFORMANCE", label: "조회수 및 반응 미흡" },
        { value: "OTHERS", label: "기타" },
    ];

    const getDeleteReasonLabel = (reasonValue: string) => {
        if (!reasonValue) return "-";
        const reason = deleteReasons.find(r => r.value === reasonValue);
        return reason ? reason.label : reasonValue;
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("이 삭제 요청을 승인하시겠습니까?")) return;
        
        try {
            await api.patch(`/admin/contents/deletion-requests/${id}/approval`);
            alert("삭제 요청이 승인되었습니다.");
            
            setRequests(prev => {
                if (statusFilter === 'PENDING') return prev.filter(item => item.requestId !== id);
                return prev.map(item => item.requestId === id ? { ...item, deleteStatus: 'APPROVED' } : item);
            });
        } catch (error) {
            console.error("삭제 승인 실패: ", error);
            alert("승인 요청에 실패했습니다.");
        }
    };

    const handleReject = async (id: number) => {
        if (!window.confirm("이 삭제 요청을 거절하시겠습니까?")) return;
        
        try {
            await api.patch(`/admin/contents/deletion-requests/${id}/rejection`);
            alert("삭제 요청이 거절되었습니다.");

            setRequests(prev => {
                if (statusFilter === 'PENDING') return prev.filter(item => item.requestId !== id);
                return prev.map(item => item.requestId === id ? { ...item, deleteStatus: 'REJECTED' } : item);
            });
        } catch (error) {
            console.error("삭제 거절 실패: ", error);
            alert("거절 요청에 실패했습니다.");
        }
    };

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.AdminPageTitle>작품 삭제 요청 관리</S.AdminPageTitle>

                <S.FilterWrapper>
                    <S.FilterList>
                        <S.MonthTabs>
                            {statusTabs.map(tab => (
                                <SortBtn
                                    key={tab.value}
                                    $active={statusFilter === tab.value}
                                    onClick={() => {
                                        setStatusFilter(tab.value);
                                        setPage(0);
                                    }}
                                >
                                    {tab.label}
                                </SortBtn>
                            ))}
                        </S.MonthTabs>
                    </S.FilterList>
                </S.FilterWrapper>

                <S.SettlementList>
                    <S.SettlementTable>
                        <colgroup>
                            <S.DeletionColId />
                            <S.DeletionColTitle />
                            <S.DeletionColAuthor />
                            <S.DeletionColStatus />
                            <S.DeletionColRequestDate />
                            <S.DeletionColProcessDate />
                        </colgroup>
                        <S.SettlementTableHead>
                            <S.SettlementTheadTr>
                                <S.DeletionTh>ID</S.DeletionTh>
                                <S.DeletionTh>제목</S.DeletionTh>
                                <S.DeletionTh>작가 이름</S.DeletionTh>
                                <S.DeletionTh>삭제 상태</S.DeletionTh>
                                <S.DeletionTh>요청 날짜</S.DeletionTh>
                                <S.DeletionTh>처리 날짜</S.DeletionTh>
                            </S.SettlementTheadTr>
                        </S.SettlementTableHead>
                        <S.SettlementTableBody>
                            {requests.length === 0 ? (
                                <S.SettlementTbodyTr>
                                    <td colSpan={6} style={{ padding: '60px 0', textAlign: 'center', color: '#888', fontSize: '15px' }}>
                                        삭제 요청 내역이 존재하지 않습니다.
                                    </td>
                                </S.SettlementTbodyTr>
                            ) : (
                                requests.map((item, index) => {
                                    const rowId = item.requestId ?? index;
                                    const isOpen = openId !== null && openId === rowId;
                                    const detail = requestDetails[rowId];

                                    return (
                                        <React.Fragment key={rowId}>
                                            <S.SettlementTbodyTr
                                                onClick={() => handleRowClick(rowId)}
                                                style={isOpen ? { borderBottom: "none" } : undefined}
                                            >
                                                <S.SettlementTdId>{rowId}</S.SettlementTdId>
                                                <S.DeletionTdTitle>{item.contentTitle}</S.DeletionTdTitle>
                                                <S.SettlementTdDate>{item.author}</S.SettlementTdDate>
                                                <S.SettlementTdStatus
                                                    $status={item.deleteStatus?.toUpperCase() as any}
                                                    style={{
                                                        color: item.deleteStatus?.toUpperCase() === 'REJECTED' ? '#FC5858' :
                                                            item.deleteStatus?.toUpperCase() === 'APPROVED' ? '#2ecc71' : 'inherit'
                                                    }}
                                                >
                                                    {getStatusLabel(item.deleteStatus)}
                                                </S.SettlementTdStatus>
                                                <S.SettlementTdDate>{formatDate(item.requestedAt) || '-'}</S.SettlementTdDate>
                                                <S.SettlementTdDate>{formatDate(item.processedAt) || '-'}</S.SettlementTdDate>
                                            </S.SettlementTbodyTr>

                                            {isOpen && (
                                                <S.SettlementDetailTr>
                                                    <S.SettlementDetailTd colSpan={6}>
                                                        <S.SettlementDetailGrid style={{ gridTemplateColumns: '1fr', marginBottom: '0' }}>
                                                            <div>
                                                                <S.SettlementDetailItem style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px', borderBottom: 'none' }}>
                                                                    <span>삭제 이유</span>
                                                                    <span style={{ fontWeight: 400, color: '#444' }}>
                                                                        {detail ? getDeleteReasonLabel(detail.deleteReason) : '로딩 중...'}
                                                                    </span>
                                                                </S.SettlementDetailItem>
                                                                <S.SettlementDetailItem style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                                                                    <span>상세 이유</span>
                                                                    <span style={{ fontWeight: 400, color: '#444', lineHeight: '1.5' }}>
                                                                        {detail ? (detail.reasonDetail || '-') : '로딩 중...'}
                                                                    </span>
                                                                </S.SettlementDetailItem>
                                                            </div>
                                                        </S.SettlementDetailGrid>

                                                        {detail && item.deleteStatus?.toUpperCase() === 'PENDING' && (
                                                            <S.DeletionActionContainer>
                                                                <S.DangerButton onClick={(e) => { e.stopPropagation(); handleDelete(rowId); }}>승인</S.DangerButton>
                                                                <S.RejectButton onClick={(e) => { e.stopPropagation(); handleReject(rowId); }}>거절</S.RejectButton>
                                                            </S.DeletionActionContainer>
                                                        )}
                                                    </S.SettlementDetailTd>
                                                </S.SettlementDetailTr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </S.SettlementTableBody>
                    </S.SettlementTable>

                    {pageData && pageData.totalPages > 0 && (
                        <div style={{ paddingBottom: '30px' }}>
                            <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                        </div>
                    )}
                </S.SettlementList>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default AdminDeletionRequestPage;
