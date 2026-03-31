import React, { useState } from "react";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorRevenue.styles";
import {
    MdAccountBalance,
    MdInfoOutline,
    MdCheckCircle,
    MdHistory,
    MdCloudUpload
} from "react-icons/md";

// Icon casting for React 19 compatibility
const BankIcon = MdAccountBalance as any;
const InfoIcon = MdInfoOutline as any;
const CheckIcon = MdCheckCircle as any;
const HistoryIcon = MdHistory as any;
const UploadIcon = MdCloudUpload as any;

function PayoutAccountPage() {
    // 1. Mock Data
    const [currentAccount, setCurrentAccount] = useState({
        bankName: "신한은행",
        accountNumber: "110-***-123456",
        accountHolder: "김작가",
        isVerified: true,
        lastModified: "2026.03.30 14:00"
    });

    const [sellerType, setSellerType] = useState<'PERSONAL' | 'BUSINESS'>('PERSONAL');
    const [form, setForm] = useState({
        bank: "088", // Shinhan (Toss Code)
        accountNumber: "",
        accountHolder: "김작가",
        identityNumber: ""
    });

    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<null | 'SUCCESS' | 'ERROR'>(null);

    const bankList = [
        { code: "088", name: "신한은행" },
        { code: "004", name: "KB국민은행" },
        { code: "020", name: "우리은행" },
        { code: "081", name: "하나은행" },
        { code: "011", name: "NH농협은행" },
        { code: "003", name: "IBK기업은행" },
        { code: "090", name: "카카오뱅크" },
        { code: "092", name: "토스뱅크" },
    ];

    const auditLogs = [
        { date: "2026.03.30 14:00", action: "계좌 정보 변경 (신한은행)" },
        { date: "2026.01.15 10:30", action: "최초 계좌 등록 (국민은행)" }
    ];

    // Handle account number input (numeric only, max 14 digits for Toss)
    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 14);
        setForm({ ...form, accountNumber: value });
        setVerificationStatus(null);
    };

    const handleIdentityNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const limit = sellerType === 'PERSONAL' ? 6 : 10;
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, limit);
        setForm({ ...form, identityNumber: value });
    };

    const handleVerify = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setVerificationStatus('SUCCESS');
        }, 1500);
    };

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.CreatorTitle>정산 계좌 관리</S.CreatorTitle>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '-16px' }}>
                    수익금을 정산받을 본인 명의의 계좌를 등록하고 관리하세요.
                </p>
                <S.RevenueContainer>

                    {/* 1. Current Account Summary */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.CardTitle>현재 등록된 계좌 정보</S.CardTitle>
                        </S.CardHeader>
                        <S.CurrentAccountBox>
                            <S.BankLogo>
                                <BankIcon />
                            </S.BankLogo>
                            <S.AccountInfoDetail>
                                <S.SmallInfoLabel>{currentAccount.bankName}</S.SmallInfoLabel>
                                <S.AccountNumberText>
                                    {currentAccount.accountNumber}
                                    {currentAccount.isVerified && <S.VerifiedBadge>인증 완료</S.VerifiedBadge>}
                                </S.AccountNumberText>
                                <S.SmallInfoLabel>예금주: {currentAccount.accountHolder}</S.SmallInfoLabel>
                            </S.AccountInfoDetail>
                        </S.CurrentAccountBox>
                    </S.DashboardCard>

                    {/* 2. Account Registration / Update Form */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.CardTitle>계좌 정보 설정</S.CardTitle>
                        </S.CardHeader>

                        <S.TypeToggleRow>
                            <S.TypeToggleButton 
                                $active={sellerType === 'PERSONAL'} 
                                onClick={() => setSellerType('PERSONAL')}
                            >
                                개인 작가
                            </S.TypeToggleButton>
                            <S.TypeToggleButton 
                                $active={sellerType === 'BUSINESS'} 
                                onClick={() => setSellerType('BUSINESS')}
                            >
                                사업자 작가
                            </S.TypeToggleButton>
                        </S.TypeToggleRow>
                        
                        <S.InputGrid>
                            <S.InputGroup>
                                <S.LabelText>은행 선택</S.LabelText>
                                <S.StyledSelect 
                                    value={form.bank} 
                                    onChange={(e) => setForm({...form, bank: e.target.value})}
                                >
                                    {bankList.map(bank => (
                                        <option key={bank.code} value={bank.code}>{bank.name}</option>
                                    ))}
                                </S.StyledSelect>
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.LabelText>{sellerType === 'PERSONAL' ? '생년월일 (6자리)' : '사업자 등록번호 (10자리)'}</S.LabelText>
                                <S.StyledInput 
                                    type="text" 
                                    value={form.identityNumber}
                                    onChange={handleIdentityNumberChange}
                                    placeholder={sellerType === 'PERSONAL' ? 'YYMMDD' : '000-00-00000'}
                                />
                            </S.InputGroup>

                            <S.InputGroup style={{ gridColumn: '1 / -1' }}>
                                <S.LabelText>계좌번호</S.LabelText>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <S.StyledInput
                                        type="text"
                                        style={{ flex: 1 }}
                                        placeholder="하이픈(-) 없이 숫자만 입력"
                                        value={form.accountNumber}
                                        onChange={handleAccountNumberChange}
                                    />
                                    <S.MainButton
                                        $variant="secondary"
                                        onClick={handleVerify}
                                        disabled={isVerifying || form.accountNumber.length < 8}
                                    >
                                        {isVerifying ? '인증 중...' : '계좌 인증'}
                                    </S.MainButton>
                                </div>
                                {verificationStatus === 'SUCCESS' && (
                                    <span style={{ fontSize: '13px', color: '#1c7ed6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckIcon style={{ fontSize: '16px' }} /> 계좌가 성공적으로 인증되었습니다.
                                    </span>
                                )}
                            </S.InputGroup>
                        </S.InputGrid>

                        <S.ActionRow>
                            <S.MainButton disabled={verificationStatus !== 'SUCCESS'}>
                                정보 저장하기
                            </S.MainButton>
                        </S.ActionRow>
                    </S.DashboardCard>

                    {/* 3. Notices */}
                    <S.NoticeBox>
                        <S.NoticeIcon>
                            <InfoIcon />
                        </S.NoticeIcon>
                        <S.NoticeContent>
                            <h4>정산 안내 및 주의사항</h4>
                            <ul>
                                <li><strong>정산 주기:</strong> 토스페이먼츠를 통해 매월 10일 정산됩니다. (D+2 정산 기준)</li>
                                <li><strong>실명 인증:</strong> 입력하신 생년월일/사업자번호와 예금주가 일치해야 합니다.</li>
                                <li>계좌번호는 <strong>하이픈(-) 없이 숫자만</strong> 최대 14자리까지 입력 가능합니다.</li>
                                <li>등록된 정보는 토스페이먼츠 시스템에 암호화되어 안전하게 전송됩니다.</li>
                            </ul>
                        </S.NoticeContent>
                    </S.NoticeBox>

                    {/* 4. Audit Log */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <HistoryIcon style={{ color: '#adb5bd' }} />
                                계좌 변경 이력
                            </S.CardTitle>
                        </S.CardHeader>
                        <S.AuditLogList>
                            {auditLogs.map((log, idx) => (
                                <S.AuditLogItem key={idx}>
                                    <span>{log.action}</span>
                                    <span>{log.date}</span>
                                </S.AuditLogItem>
                            ))}
                        </S.AuditLogList>
                    </S.DashboardCard>

                    <S.TossBranding>
                        <span>Powered by</span>
                        <img src="https://static.tosspayments.com/canvas/img/logo-toss-payments-gray.png" alt="Toss Payments" />
                    </S.TossBranding>
                </S.RevenueContainer>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default PayoutAccountPage;