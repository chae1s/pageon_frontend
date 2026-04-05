import React, { useEffect, useState } from "react";
import * as S from "./AdminContent.styles";
import { MainContainer, NoSidebarMain, SortBtn } from "../../styles/Layout.styles";
import CustomSelect from "../../components/Common/CustomSelect";
import api from "../../api/axiosInstance";
import { SettlementSummary, SettlementDetail } from "../../types/Admins";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";
import { formatDate } from "../../utils/formatData";

const statusOptions = [
    { label: "전체", value: "ALL" },
    { label: "지급 예정", value: "PENDING" },
    { label: "지급 완료", value: "DONE" },
    { label: "지급 실패", value: "FAILED" }
];

function AdminSettlementPage() {
    const getCurrentMonthOnly = () => {
        const today = new Date();
        return String(today.getMonth() + 1).padStart(2, '0');
    };

    const [settlements, setSettlements] = useState<SettlementSummary[]>([]);
    const [pageData, setPageData] = useState<Pagination<SettlementSummary> | null>(null);
    const [page, setPage] = useState<number>(0);
    const [openId, setOpenId] = useState<number | null>(null);
    const [settlementDetails, setSettlementDetails] = useState<Record<number, SettlementDetail>>({});
    const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonthOnly());
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    useEffect(() => {
        const fetchSettlements = async () => {
            try {
                const response = await api.get("/admin/settlements", {
                    params: {
                        month: parseInt(selectedMonth, 10),
                        page: page,
                        status: statusFilter
                    }
                });

                if (response.data) {
                    setSettlements(response.data.content);
                    if (response.data.totalPages !== undefined) {
                        setPageData(response.data);
                    }
                }
            } catch (error) {
                console.error("정산 내역 조회 실패: ", error);
            }
        }

        fetchSettlements();
        setOpenId(null);
    }, [selectedMonth, statusFilter, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setOpenId(null);
    };

    const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    };

    const getStatusLabel = (statusValue: string) => {
        if (!statusValue) return "-";
        const upperStatus = statusValue.toUpperCase();
        const option = statusOptions.find(opt => opt.value.toUpperCase() === upperStatus);
        return option ? option.label : upperStatus;
    };

    const handleRowClick = async (id: number) => {
        if (openId === id) {
            setOpenId(null);
            return;
        }

        setOpenId(id);

        if (!settlementDetails[id]) {
            try {
                const response = await api.get(`/admin/settlements/${id}`);
                setSettlementDetails(prev => ({
                    ...prev,
                    [id]: response.data
                }));
                console.log(response.data);
            } catch (error) {
                console.error("정산 상세 내역 조회 실패: ", error);
            }
        }
    };

    const handleRetry = async (id: number, creatorId: number) => {
        const detail = settlementDetails[id];
        if (detail && detail.resolved === false) {
            alert("문제가 아직 해결되지 않아(계좌 미인증 등) 재요청을 진행할 수 없습니다.");
            return;
        }

        try {
            await api.patch(`/admin/settlements/${id}/payout-retry`, null, {
                params: { creatorId }
            });
            alert("재처리 요청이 완료되었습니다.");

            setSettlements(prev => {
                if (statusFilter === 'FAILED') {
                    return prev.filter(item => item.settlementId !== id);
                }
                return prev.map(item =>
                    item.settlementId === id ? { ...item, settlementStatus: 'DONE' } : item
                );
            });
        } catch (error) {
            console.error("재요청 실패: ", error);
            alert("재처리 요청에 실패했습니다.");
        }
    };

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.AdminPageTitle>정산 내역 관리</S.AdminPageTitle>

                <S.FilterWrapper>
                    <S.FilterList>
                        <S.MonthTabs>
                            {months.map(m => (
                                <SortBtn
                                    key={m}
                                    $active={selectedMonth === m}
                                    onClick={() => {
                                        setSelectedMonth(m);
                                        setPage(0);
                                    }}
                                >
                                    {parseInt(m, 10)}월
                                </SortBtn>
                            ))}
                        </S.MonthTabs>
                        <S.RightSelectSort>
                            <CustomSelect
                                width="120px"
                                options={statusOptions}
                                value={statusFilter}
                                onChange={(val) => {
                                    setStatusFilter(val);
                                    setPage(0);
                                }}
                            />
                        </S.RightSelectSort>
                    </S.FilterList>
                </S.FilterWrapper>

                <S.SettlementList>
                    <S.SettlementTable>
                        <colgroup>
                            <S.SettlementColId />
                            <S.SettlementColEmail />
                            <S.SettlementColAmount />
                            <S.SettlementColStatus />
                            <S.SettlementColScheduleDate />
                            <S.SettlementColDate />
                        </colgroup>
                        <S.SettlementTableHead>
                            <S.SettlementTheadTr>
                                <S.SettlementTh>ID</S.SettlementTh>
                                <S.SettlementTh>크리에이터 이메일</S.SettlementTh>
                                <S.SettlementTh>정산 금액</S.SettlementTh>
                                <S.SettlementTh>정산 상태</S.SettlementTh>
                                <S.SettlementTh>정산 예정일</S.SettlementTh>
                                <S.SettlementTh>정산일</S.SettlementTh>
                            </S.SettlementTheadTr>
                        </S.SettlementTableHead>
                        <S.SettlementTableBody>
                            {settlements.length === 0 ? (
                                <S.SettlementTbodyTr>
                                    <td colSpan={6} style={{ padding: '60px 0', textAlign: 'center', color: '#888', fontSize: '15px' }}>
                                        정산 내역이 존재하지 않습니다.
                                    </td>
                                </S.SettlementTbodyTr>
                            ) : (
                                settlements.map((item, index) => {
                                    const rowId = item.settlementId ?? (item as any).id ?? index;
                                    const isOpen = openId !== null && openId === rowId;
                                    const detail = settlementDetails[rowId];

                                    return (
                                        <React.Fragment key={rowId}>
                                            <S.SettlementTbodyTr
                                                onClick={() => handleRowClick(rowId)}
                                                style={isOpen ? { borderBottom: "none" } : undefined}
                                            >
                                                <S.SettlementTdId>{rowId}</S.SettlementTdId>
                                                <S.SettlementTdEmail>{item.email}</S.SettlementTdEmail>
                                                <S.SettlementTdAmount>{formatCurrency(item.settledPoint)}원</S.SettlementTdAmount>
                                                <S.SettlementTdStatus $status={item.settlementStatus?.toUpperCase() as any}>
                                                    {getStatusLabel(item.settlementStatus)}
                                                </S.SettlementTdStatus>
                                                <S.SettlementTdDate>{formatDate(item.payoutDate) || '-'}</S.SettlementTdDate>
                                                <S.SettlementTdDate>{formatDate(item.settledAt) || '-'}</S.SettlementTdDate>
                                            </S.SettlementTbodyTr>

                                            {isOpen && (
                                                <S.SettlementDetailTr>
                                                    <S.SettlementDetailTd colSpan={6}>
                                                        <S.SettlementDetailGrid>
                                                            <div>
                                                                <S.SettlementDetailItem>
                                                                    <span>총 이익금</span>
                                                                    <span>{detail ? formatCurrency(detail.totalPoint) + '원' : '로딩 중...'}</span>
                                                                </S.SettlementDetailItem>
                                                                <S.SettlementDetailItem>
                                                                    <span>플랫폼 수수료</span>
                                                                    <span>{detail ? formatCurrency(detail.platformFee) + '원' : '-'}</span>
                                                                </S.SettlementDetailItem>
                                                                <S.SettlementDetailItem>
                                                                    <span>세금</span>
                                                                    <span>{detail ? formatCurrency(detail.taxFee) + '원' : '-'}</span>
                                                                </S.SettlementDetailItem>
                                                            </div>
                                                            <div>
                                                                <S.SettlementDetailItem>
                                                                    <span>최종 정산 금액</span>
                                                                    <span style={{ color: '#69a3ff' }}>{detail ? formatCurrency(detail.settledPoint) + '원' : '-'}</span>
                                                                </S.SettlementDetailItem>
                                                                <S.SettlementDetailItem>
                                                                    <span>정산 상태</span>
                                                                    <span style={{ color: item.settlementStatus?.toUpperCase() === 'FAILED' ? '#FC5858' : 'inherit' }}>
                                                                        {getStatusLabel(item.settlementStatus)}
                                                                    </span>
                                                                </S.SettlementDetailItem>
                                                            </div>
                                                        </S.SettlementDetailGrid>

                                                        {item.settlementStatus?.toUpperCase() === 'FAILED' && detail && (
                                                            <S.IssueSection>
                                                                <S.IssueTitle>정산 실패 사유</S.IssueTitle>
                                                                <p>{detail.failedReason || '알 수 없는 사유'}</p>
                                                                {detail.resolved !== undefined && (
                                                                    <p style={{ marginTop: '8px', fontSize: '0.9rem', color: detail.resolved ? '#2ecc71' : '#e74c3c' }}>
                                                                        <strong>문제 해결 여부:</strong> {detail.resolved ? "해결됨" : "미해결"}
                                                                    </p>
                                                                )}

                                                                {(detail.resolved === undefined || detail.resolved) && (
                                                                    <div style={{ marginTop: '12px', textAlign: 'right' }}>
                                                                        <S.RetryButton
                                                                            onClick={() => handleRetry(rowId, item.creatorId)}
                                                                        >
                                                                            정산 재요청
                                                                        </S.RetryButton>
                                                                    </div>
                                                                )}
                                                            </S.IssueSection>
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

export default AdminSettlementPage;
