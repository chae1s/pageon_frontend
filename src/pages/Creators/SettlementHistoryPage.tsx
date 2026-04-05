import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import api from "../../api/axiosInstance";
import { SettlementDetail } from "../../types/Creator";
import { MdFileDownload } from "react-icons/md";
import { formatMonth, formatCurrency, formatDate } from "../../utils/formatData";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";

// Icon casting for React 19 compatibility
const DownloadIcon = MdFileDownload as any;
function SettlementHistoryPage() {
    const navigate = useNavigate();
    const [settlementDetails, setSettlementDetails] = useState<SettlementDetail[]>([]);
    const [pageData, setPageData] = useState<Pagination<SettlementDetail> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openSettlementId, setOpenSettlementId] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0", 10);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get("/creators/settlements");
                setSettlementDetails(response.data.content);
                setPageData(response.data);

            } catch (error) {
                console.error("정산 내역 조회 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const statusMap: Record<string, string> = {
        PENDING: "지급 예정",
        DONE: "지급 완료",
        FAILED: "지급 실패"
    };

    const handleToggle = (id: number) => {
        setOpenSettlementId(prev => prev === id ? null : id);
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    }

    if (isLoading) {
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
                <S.PageHeaderWrapper>
                    <div>
                        <S.CreatorTitle>전체 정산 내역</S.CreatorTitle>
                        <S.PageDescription>지금까지의 모든 정산 내역을 확인하고 명세서를 다운로드할 수 있습니다.</S.PageDescription>
                    </div>
                </S.PageHeaderWrapper>

                <S.HistoryListSection>
                    <S.HistoryTable>
                        <colgroup>
                            <S.HistoryCol $width="120px" />
                            <S.HistoryCol $width="auto" />
                            <S.HistoryCol $width="140px" />
                            <S.HistoryCol $width="140px" />
                            <S.HistoryCol $width="120px" />
                        </colgroup>
                        <S.HistoryThead>
                            <S.HistoryTr>
                                <S.HistoryTh $align="center">지급 연월</S.HistoryTh>
                                <S.HistoryTh $align="left">내역</S.HistoryTh>
                                <S.HistoryTh $align="right">지급 금액</S.HistoryTh>
                                <S.HistoryTh $align="center">지급 날짜</S.HistoryTh>
                                <S.HistoryTh $align="center">상태</S.HistoryTh>
                            </S.HistoryTr>
                        </S.HistoryThead>
                        <S.HistoryTbody>
                            {settlementDetails.length > 0 ? (
                                settlementDetails.map((s, idx) => {
                                    const isOpen = openSettlementId === s.settlementId;
                                    // 임시 데이터 계산 (총액의 10% 수수료, 3.3% 세금 등 시뮬레이션)
                                    const mockTotal = Math.round(s.settledPoint / 0.867); // 대략적인 역산
                                    const mockFee = Math.round(mockTotal * 0.1);
                                    const mockTax = Math.round(mockTotal * 0.033);

                                    return (
                                        <React.Fragment key={s.settlementId}>
                                            <S.HistoryTr style={isOpen ? { borderBottom: 'none' } : undefined}>
                                                <S.HistoryTd $align="center" style={{ color: '#868e96' }}>{formatMonth(s.scheduledAt)}</S.HistoryTd>
                                                <S.HistoryTd
                                                    $align="left"
                                                    onClick={() => handleToggle(s.settlementId)}
                                                    style={{ fontWeight: 600, cursor: 'pointer', color: isOpen ? '#69a3ff' : '#444' }}
                                                >
                                                    정산 대금 지급
                                                </S.HistoryTd>
                                                <S.HistoryTd $align="right" $isAmount={true}>{formatCurrency(s.settledPoint)}</S.HistoryTd>
                                                <S.HistoryTd $align="center">{formatDate(s.scheduledAt)}</S.HistoryTd>
                                                <S.HistoryTd $align="center">
                                                    <span style={{ fontSize: '13px', color: s.settlementStatus === 'DONE' ? '#20c997' : '#adb5bd', fontWeight: 600 }}>
                                                        {statusMap[s.settlementStatus]}
                                                    </span>
                                                </S.HistoryTd>
                                            </S.HistoryTr>
                                            {isOpen && (
                                                <S.HistoryDetailTr>
                                                    <S.HistoryDetailTd colSpan={5}>
                                                        <S.HistoryDetailGrid>
                                                            <S.HistoryDetailLeft>
                                                                <div style={{ display: 'flex', gap: '40px', marginBottom: '4px' }}>
                                                                    <div style={{ fontSize: '13px' }}>
                                                                        <span style={{ color: '#868e96', marginRight: '8px' }}>정산 대상 기간</span>
                                                                        <span style={{ fontWeight: 600, color: '#444' }}>{formatDate(s.periodStart)} ~ {formatDate(s.periodEnd)}</span>
                                                                    </div>
                                                                    <div style={{ fontSize: '13px' }}>
                                                                        <span style={{ color: '#868e96', marginRight: '8px' }}>
                                                                            {s.settlementStatus === 'PENDING' ? '정산 지급 예정 날짜' : '정산 지급 날짜'}
                                                                        </span>
                                                                        <span style={{ fontWeight: 600, color: '#444' }}>
                                                                            {s.settlementStatus === 'PENDING' ? formatDate(s.payoutDate) : formatDate(s.settledAt)}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <S.HistoryDetailHeaderLabel>정산 금액 상세</S.HistoryDetailHeaderLabel>
                                                                    <S.HistoryDetailContent>
                                                                        <span>총 발생 수익</span>
                                                                        <span>{formatCurrency(s.totalPoint)}</span>
                                                                    </S.HistoryDetailContent>
                                                                    <S.HistoryDetailContent>
                                                                        <span>플랫폼 수수료 (10%)</span>
                                                                        <span style={{ color: '#e03131' }}>- {formatCurrency(s.platformFee)}</span>
                                                                    </S.HistoryDetailContent>
                                                                    <S.HistoryDetailContent>
                                                                        <span>원천세 (3.3%)</span>
                                                                        <span style={{ color: '#e03131' }}>- {formatCurrency(s.taxFee)}</span>
                                                                    </S.HistoryDetailContent>
                                                                    <S.HistoryDetailDivider />
                                                                    <S.HistoryDetailContent>
                                                                        <span>실지급액</span>
                                                                        <span style={{ color: '#222', fontSize: '15px' }}>{formatCurrency(s.settledPoint)}</span>
                                                                    </S.HistoryDetailContent>
                                                                </div>
                                                            </S.HistoryDetailLeft>

                                                            <S.HistoryDetailRight>
                                                                <div>
                                                                    <S.DownloadBtn>
                                                                        <DownloadIcon style={{ marginRight: '8px', fontSize: '16px' }} />
                                                                        PDF 명세서 다운로드
                                                                    </S.DownloadBtn>
                                                                </div>
                                                            </S.HistoryDetailRight>
                                                        </S.HistoryDetailGrid>
                                                    </S.HistoryDetailTd>
                                                </S.HistoryDetailTr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <S.HistoryTr>
                                    <td colSpan={5}>
                                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#adb5bd' }}>
                                            정산 내역이 존재하지 않습니다.
                                        </div>
                                    </td>
                                </S.HistoryTr>
                            )}
                        </S.HistoryTbody>
                    </S.HistoryTable>
                    {pageData && pageData.totalPages > 0 && (
                        <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                    )}
                </S.HistoryListSection>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default SettlementHistoryPage;
