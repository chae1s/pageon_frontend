import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import api from "../../api/axiosInstance";
import { BankAccount, ExpectedRevenue, RevenueAnalytics, RevenueDetail, SettlementSummary, RevenueTrend } from "../../types/Creator";
import {
    MdInfoOutline,
    MdFileDownload,
    MdTrendingUp
} from "react-icons/md";
import { formatDate, formatMonth, formatCurrency } from "../../utils/formatData";

// Icon casting for React 19 compatibility
const InfoIcon = MdInfoOutline as any;
const DownloadIcon = MdFileDownload as any;
const TrendIcon = MdTrendingUp as any;

function RevenueDashboard() {
    const navigate = useNavigate();
    const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
    const [settlementSummaries, setSettlementSummaries] = useState<SettlementSummary[]>([]);
    const [revenueDetail, setRevenueDetail] = useState<RevenueDetail | null>(null);
    const [expectedRevenue, setExpectedRevenue] = useState<ExpectedRevenue | null>(null);
    const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueAnalytics | null>(null);
    const [revenueTrend, setRevenueTrend] = useState<RevenueTrend | null>(null);
    const [hoveredPoint, setHoveredPoint] = useState<{ date: string, revenue: number, x: number, y: number } | null>(null);

    useEffect(() => {
        const fetchExpectedRevenue = async () => {
            try {
                const response = await api.get("/creators/revenue/dashboard");
                setExpectedRevenue(response.data);
            } catch (error) {
                console.error("예상 수익 조회 실패:", error);
            }
        }
        fetchExpectedRevenue();
    }, []);

    useEffect(() => {
        const fetchDailyRevenue = async () => {
            try {
                const response = await api.get("/creators/revenue/daily");
                console.log("일별 수익 조회 성공:", response.data);
                setRevenueTrend(response.data);
            } catch (error) {
                console.error("일별 수익 조회 실패:", error);
            }
        }
        fetchDailyRevenue();
    }, []);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await api.get("/creators/settlements/bank-account");
                console.log(response.data);
                setBankAccount(response.data);
            } catch (error) {
                console.error("계좌 정보 조회 실패:", error);
            }
        };
        fetchAccount();
    }, []);

    useEffect(() => {
        const fetchRevenuAnalytics = async () => {
            try {
                const response = await api.get("/creators/revenue/analytics");
                setRevenueAnalytics(response.data);
            } catch (error) {
                console.error("수익 분석 조회 실패:", error);
            }
        }
        fetchRevenuAnalytics();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/creators/settlements/recent");
                setSettlementSummaries(response.data);
            } catch (error) {
                console.error("수익 정보 조회 실패:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/creators/revenue/latest");
                setRevenueDetail(response.data);
            } catch (error) {
                console.error("수익 정보 조회 실패:", error);
            }
        }
        fetchData();
    }, []);

    const formatAccountNumber = (num: string) => {
        if (!num || num.length < 8) return num;
        const first = num.slice(0, 4);
        const last = num.slice(-4);
        const middle = num.slice(4, -4);
        return `${first}-${middle}-${last}`;
    };


    const statusMap: Record<string, string> = {
        PENDING: "지급 예정",
        DONE: "지급 완료",
        FAILED: "지급 실패"
    };



    if (!expectedRevenue || !revenueAnalytics) {
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
                        <S.CreatorTitle>정산 및 수익 관리</S.CreatorTitle>
                        <S.PageDescription>이번 달 수익 정산 현황과 상세 내역을 확인하세요.</S.PageDescription>
                    </div>
                </S.PageHeaderWrapper>


                <S.RevenueGrid>
                    {/* 1. Settlement Overview */}
                    <S.FullWidthSection>
                        <S.SummaryCard>
                            <S.SummaryMainInfo>
                                <S.SummaryLabel style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1em', lineHeight: '1', marginRight: '6px' }}>💰</span>
                                    이번 달 예상 순수익
                                </S.SummaryLabel>
                                <S.SummaryValue>{formatCurrency(expectedRevenue?.settledPoint || 0)}</S.SummaryValue>
                                <S.SummarySubInfo>
                                    <S.SummarySubItem>
                                        <S.SummarySubLabel>총 매출</S.SummarySubLabel>
                                        <S.SummarySubValue>{formatCurrency(expectedRevenue?.totalPoint || 0)}</S.SummarySubValue>
                                    </S.SummarySubItem>
                                    <S.SummarySubItem>
                                        <S.SummarySubLabel>정산 예정일</S.SummarySubLabel>
                                        <S.SummarySubValue>{formatDate(expectedRevenue?.payoutDate || "")} (자동 정산)</S.SummarySubValue>
                                    </S.SummarySubItem>
                                </S.SummarySubInfo>
                            </S.SummaryMainInfo>
                        </S.SummaryCard>
                    </S.FullWidthSection>

                    {/* 2. Revenue Breakdown */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <S.DashboardCardTitle>수익 산출 내역</S.DashboardCardTitle>
                                {revenueDetail?.payoutDate && (
                                    <span style={{ fontSize: '12px', color: '#adb5bd', fontWeight: 500 }}>
                                        ({formatMonth(revenueDetail.payoutDate)} 기준)
                                    </span>
                                )}
                            </div>
                            <InfoIcon style={{ color: '#adb5bd' }} />
                        </S.CardHeader>
                        <S.BreakdownList>
                            <S.BreakdownItem>
                                <span>총 결제 매출 (Gross)</span>
                                <span>{formatCurrency(revenueDetail?.totalPoint || 0)}</span>
                            </S.BreakdownItem>
                            <S.BreakdownItem $isDeduction={true}>
                                <span>플랫폼 운영 수수료</span>
                                <span>-{formatCurrency(revenueDetail?.platformFee || 0)}</span>
                            </S.BreakdownItem>
                            <S.BreakdownItem $isDeduction={true}>
                                <span>원천세 (3.3%)</span>
                                <span>-{formatCurrency(revenueDetail?.taxFee || 0)}</span>
                            </S.BreakdownItem>

                            <S.BreakdownItem $isTotal>
                                <span>최종 정산 예정 금액</span>
                                <span>{formatCurrency(revenueDetail?.settledPoint || 0)}</span>
                            </S.BreakdownItem>
                        </S.BreakdownList>
                    </S.DashboardCard>

                    {/* 3. Analytics Highlights */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.DashboardCardTitle>주요 수익 지표 Analytics</S.DashboardCardTitle>
                            <TrendIcon style={{ color: '#4c6ef5' }} />
                        </S.CardHeader>
                        <S.ConversionStats>
                        </S.ConversionStats>
                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ width: '120px', height: '120px', flexShrink: 0, position: 'relative' }}>
                                <svg width="120" height="120" viewBox="0 0 120 120">
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="45"
                                        fill="none"
                                        stroke="#f1f3f5"
                                        strokeWidth="15"
                                    />
                                    {(() => {
                                        let cumulativePercent = 0;
                                        const chartColors = ['#4c6ef5', '#fab005', '#20c997', '#ff922b', '#adb5bd'];
                                        return (revenueAnalytics?.contents || []).slice(0, 5).map((w, idx) => {
                                            const strokeDasharray = `${(w.percentage * 2.827).toFixed(2)} 282.7`;
                                            const strokeDashoffset = `${(-(cumulativePercent * 2.827)).toFixed(2)}`;
                                            cumulativePercent += w.percentage;
                                            return (
                                                <circle
                                                    key={idx}
                                                    cx="60"
                                                    cy="60"
                                                    r="45"
                                                    fill="none"
                                                    stroke={chartColors[idx % chartColors.length]}
                                                    strokeWidth="15"
                                                    strokeDasharray={strokeDasharray}
                                                    strokeDashoffset={strokeDashoffset}
                                                    transform="rotate(-90 60 60)"
                                                    style={{ transition: 'all 0.5s ease-out' }}
                                                />
                                            );
                                        });
                                    })()}
                                </svg>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '10px', color: '#adb5bd', fontWeight: 600 }}>Total</div>
                                    <div style={{ fontSize: '14px', color: '#222', fontWeight: 700 }}>100%</div>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {(revenueAnalytics?.contents || []).slice(0, 5).map((w, idx) => {
                                    const legendColors = ['#4c6ef5', '#fab005', '#20c997', '#ff922b', '#adb5bd'];
                                    return (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: legendColors[idx % legendColors.length] }} />
                                            <span style={{ fontSize: '12px', flex: 1, color: '#495057', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.contentTitle}</span>
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#222' }}>{Math.round(w.percentage)}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </S.DashboardCard>

                    {/* 4. Chart Visualization (Line Chart) */}
                    <S.FullWidthSection>
                        <S.DashboardCard>
                            <S.CardHeader>
                                <S.DashboardCardTitle>일별 수익 추이 (최근 7일)</S.DashboardCardTitle>
                            </S.CardHeader>
                            <S.ChartWrapper>
                                {hoveredPoint && (
                                    <S.ChartTooltip $x={hoveredPoint.x} $y={hoveredPoint.y}>
                                        <span>{formatDate(hoveredPoint.date)}</span>
                                        <span>{formatCurrency(hoveredPoint.revenue)}</span>
                                    </S.ChartTooltip>
                                )}
                                {revenueTrend && revenueTrend.dailyRevenues.length > 0 ? (() => {
                                    const maxRevenue = revenueTrend.maxRevenue || 100;
                                    const getY = (rev: number) => 180 - (rev / maxRevenue * 140);

                                    return (
                                        <svg width="100%" height="200" viewBox="0 0 700 200" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#4c6ef5" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#4c6ef5" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>

                                            {/* Line Path */}
                                            <path
                                                d={`M 0 180 ${revenueTrend.dailyRevenues.map((v, i) => `L ${(i * 100) + 50} ${getY(v.revenue)}`).join(' ')} L 700 180`}
                                                fill="url(#chartGradient)"
                                            />
                                            <path
                                                d={`M 50 ${getY(revenueTrend.dailyRevenues[0].revenue)} ${revenueTrend.dailyRevenues.slice(1).map((v, i) => `L ${((i + 1) * 100) + 50} ${getY(v.revenue)}`).join(' ')}`}
                                                fill="none"
                                                stroke="#4c6ef5"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />

                                            {/* Data Points */}
                                            {revenueTrend.dailyRevenues.map((v, i) => {
                                                const cx = (i * 100) + 50;
                                                const cy = getY(v.revenue);
                                                return (
                                                    <circle
                                                        key={i}
                                                        cx={cx}
                                                        cy={cy}
                                                        r="5"
                                                        fill="#fff"
                                                        stroke="#4c6ef5"
                                                        strokeWidth="2.5"
                                                        style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                                                        onMouseEnter={() => setHoveredPoint({ date: v.date, revenue: v.revenue, x: (cx / 700) * 100, y: cy })}
                                                        onMouseLeave={() => setHoveredPoint(null)}
                                                    />
                                                );
                                            })}
                                        </svg>
                                    );
                                })() : (
                                    <div style={{ color: '#adb5bd', fontSize: '14px' }}>수익 데이터가 없습니다.</div>
                                )}
                            </S.ChartWrapper>
                        </S.DashboardCard>
                    </S.FullWidthSection>

                    {/* 5. History and Accounts */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.DashboardCardTitle>정산 히스토리</S.DashboardCardTitle>
                            <S.CardActionBtn onClick={() => navigate("/creators/revenue/history")}>더보기</S.CardActionBtn>
                        </S.CardHeader>
                        <S.RevenueTable>
                            <thead>
                                <tr>
                                    <th>지급 연월</th>
                                    <th>지급 금액</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {settlementSummaries.length > 0 ? (
                                    settlementSummaries.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{formatMonth(s.scheduledAt)}</td>
                                            <td style={{ fontWeight: 700 }}>{formatCurrency(s.settledPoint)}</td>
                                            <td>{statusMap[s.settlementStatus]}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: 'center', padding: '40px 0', color: '#adb5bd' }}>
                                            정산 내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </S.RevenueTable>
                    </S.DashboardCard>

                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.DashboardCardTitle>입금 계좌 정보</S.DashboardCardTitle>
                            <S.ContentActionLink onClick={() => navigate('/creators/settlements/bank-account')}>
                                관리
                            </S.ContentActionLink>
                        </S.CardHeader>
                        <S.PageDescription>매달 10일 등록된 계좌로 자동 입금됩니다.</S.PageDescription>
                        <S.AccountInfoCard>
                            {bankAccount && bankAccount.bankCode ? (
                                <S.BankInfo>
                                    <span style={{ fontWeight: 700, color: '#495057' }}>{bankAccount.bankCode}</span>
                                    <span style={{ fontSize: '15px' }}>{formatAccountNumber(bankAccount.accountNumber)}</span>
                                </S.BankInfo>
                            ) : (
                                <S.BankInfo>
                                    <span style={{ color: '#adb5bd' }}>등록된 계좌가 없습니다.</span>
                                </S.BankInfo>
                            )}
                        </S.AccountInfoCard>
                    </S.DashboardCard>
                </S.RevenueGrid>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default RevenueDashboard;