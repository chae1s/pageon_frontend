import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorContent.styles";
import {
    MdInfoOutline,
    MdFileDownload,
    MdTrendingUp,
    MdPieChart,
    MdPaid
} from "react-icons/md";

// Icon casting for React 19 compatibility
const InfoIcon = MdInfoOutline as any;
const DownloadIcon = MdFileDownload as any;
const TrendIcon = MdTrendingUp as any;
const ChartIcon = MdPieChart as any;

function RevenueDashboard() {
    const navigate = useNavigate();
    // 1. Mock Data: Settlement Summary
    const settlementSummary = {
        estimatedPayout: 3450200,
        grossRevenue: 5200000,
        settlementDate: "2026.04.10",
        status: "CALC" as const, // CALC, CONFIRM, DONE
        statusText: "수익 집계 중"
    };

    // 2. Mock Data: Breakdown
    const breakdown = [
        { label: "총 결제 매출 (Gross)", value: 5200000 },
        { label: "결제 수수료 (신용카드/간편결제)", value: -156000, isDeduction: true },
        { label: "플랫폼 운영 수수료 (30%)", value: -1560000, isDeduction: true },
        { label: "원천세 (3.3%)", value: -33780, isDeduction: true },
        { label: "기타 차감 항목", value: 0, isDeduction: true },
    ];

    // 3. Mock Data: Analytics (Chart Data)
    const dailyRevenue = [240000, 310000, 280000, 450000, 390000, 520000, 480000];
    const workDistribution = [
        { title: "은하수의 끝에서", percent: 65, color: "#4c6ef5" },
        { title: "심해의 그림자", percent: 25, color: "#fab005" },
        { title: "기타", percent: 10, color: "#adb5bd" }
    ];

    // 4. Mock Data: History
    const history = [
        { month: "2026.03", amount: 2840000, status: "지급완료" },
        { month: "2026.02", amount: 1950000, status: "지급완료" },
        { month: "2026.01", amount: 2100000, status: "지급완료" },
    ];

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(val);
    };

    return (
        <MainContainer>
            <NoSidebarMain>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <S.CreatorTitle>정산 및 수익 관리</S.CreatorTitle>
                </div>
                <S.PageDescription style={{ marginBottom: '24px' }}>이번 달 수익 정산 현황과 상세 내역을 확인하세요.</S.PageDescription>

                <S.RevenueGrid>
                    {/* 1. Settlement Overview */}
                    <S.FullWidthSection>
                        <S.SummaryCard>
                            <S.SummaryMainInfo>
                                <S.SummaryLabel style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1em', lineHeight: '1', marginRight: '6px' }}>💰</span>
                                    이번 달 예상 순수익
                                </S.SummaryLabel>
                                <S.SummaryValue>{formatCurrency(settlementSummary.estimatedPayout)}</S.SummaryValue>
                                <S.SummarySubInfo>
                                    <S.SummarySubItem>
                                        <S.SummarySubLabel>총 매출</S.SummarySubLabel>
                                        <S.SummarySubValue>{formatCurrency(settlementSummary.grossRevenue)}</S.SummarySubValue>
                                    </S.SummarySubItem>
                                    <S.SummarySubItem>
                                        <S.SummarySubLabel>정산 예정일</S.SummarySubLabel>
                                        <S.SummarySubValue>{settlementSummary.settlementDate} (자동 정산)</S.SummarySubValue>
                                    </S.SummarySubItem>
                                </S.SummarySubInfo>
                            </S.SummaryMainInfo>
                        </S.SummaryCard>
                    </S.FullWidthSection>

                    {/* 2. Revenue Breakdown */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.DashboardCardTitle>수익 산출 내역</S.DashboardCardTitle>
                            <InfoIcon style={{ color: '#adb5bd' }} />
                        </S.CardHeader>
                        <S.BreakdownList>
                            {breakdown.map((item, idx) => (
                                <S.BreakdownItem key={idx} $isDeduction={item.isDeduction}>
                                    <span>{item.label}</span>
                                    <span>{item.value === 0 ? '-' : (item.isDeduction ? '-' : '') + formatCurrency(Math.abs(item.value))}</span>
                                </S.BreakdownItem>
                            ))}
                            <S.BreakdownItem $isTotal>
                                <span>최종 정산 예정 금액</span>
                                <span>{formatCurrency(settlementSummary.estimatedPayout)}</span>
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
                            <S.StatBox>
                                <span>평균 유료 전환율</span>
                                <span>14.2%</span>
                            </S.StatBox>
                            <S.StatBox>
                                <span>객단가</span>
                                <span>{formatCurrency(12400)}</span>
                            </S.StatBox>
                        </S.ConversionStats>
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <ChartIcon style={{ color: '#adb5bd' }} />
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#495057' }}>작품별 수익 비중</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {workDistribution.map((w, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: w.color }} />
                                        <span style={{ fontSize: '13px', flex: 1, color: '#495057' }}>{w.title}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#222' }}>{w.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </S.DashboardCard>

                    {/* 4. Chart Visualization (Line Chart Placeholder) */}
                    <S.FullWidthSection>
                        <S.DashboardCard>
                            <S.CardHeader>
                                <S.DashboardCardTitle>일별 수익 추이 (최근 7일)</S.DashboardCardTitle>
                            </S.CardHeader>
                            <S.ChartWrapper>
                                <svg width="100%" height="200" viewBox="0 0 700 200" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#4c6ef5" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#4c6ef5" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Line Path */}
                                    <path
                                        d={`M 0 180 ${dailyRevenue.map((v, i) => `L ${(i * 100) + 50} ${180 - (v / 3000)}`).join(' ')} L 700 180`}
                                        fill="url(#chartGradient)"
                                    />
                                    <path
                                        d={`M 50 ${180 - (dailyRevenue[0] / 3000)} ${dailyRevenue.slice(1).map((v, i) => `L ${((i + 1) * 100) + 50} ${180 - (v / 3000)}`).join(' ')}`}
                                        fill="none"
                                        stroke="#4c6ef5"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {/* Data Points */}
                                    {dailyRevenue.map((v, i) => (
                                        <circle key={i} cx={(i * 100) + 50} cy={180 - (v / 3000)} r="4" fill="#fff" stroke="#4c6ef5" strokeWidth="2" />
                                    ))}
                                </svg>
                            </S.ChartWrapper>
                        </S.DashboardCard>
                    </S.FullWidthSection>

                    {/* 5. History and Accounts */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.DashboardCardTitle>정산 히스토리</S.DashboardCardTitle>
                        </S.CardHeader>
                        <S.RevenueTable>
                            <thead>
                                <tr>
                                    <th>지급 연월</th>
                                    <th>지급 금액</th>
                                    <th>상태</th>
                                    <th>명세서</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((h, idx) => (
                                    <tr key={idx}>
                                        <td>{h.month}</td>
                                        <td style={{ fontWeight: 700 }}>{formatCurrency(h.amount)}</td>
                                        <td>{h.status}</td>
                                        <td>
                                            <S.DownloadBtn>
                                                <DownloadIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                                PDF
                                            </S.DownloadBtn>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </S.RevenueTable>
                    </S.DashboardCard>

                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.DashboardCardTitle>입금 계좌 정보</S.DashboardCardTitle>
                            <S.ContentActionLink onClick={() => navigate('/creators/revenue/account')}>
                                수정
                            </S.ContentActionLink>
                        </S.CardHeader>
                        <S.PageDescription>매달 10일 등록된 계좌로 자동 입금됩니다.</S.PageDescription>
                        <S.AccountInfoCard>
                            <S.BankInfo>
                                <span>신한은행</span>
                                <span>110-***-123456</span>
                            </S.BankInfo>
                        </S.AccountInfoCard>
                    </S.DashboardCard>
                </S.RevenueGrid>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default RevenueDashboard;