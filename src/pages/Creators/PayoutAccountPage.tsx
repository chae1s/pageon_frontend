import React, { useEffect, useState } from "react";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as S from "./CreatorRevenue.styles";
import api from "../../api/axiosInstance";
import {
    MdAccountBalance,
    MdInfoOutline,
    MdCheckCircle,
    MdHistory,
    MdCloudUpload
} from "react-icons/md";
import { BankAccount, BankAccountList } from "../../types/Creator";
import { formatDateAndTime } from "../../utils/formatData";

// Icon casting for React 19 compatibility
const BankIcon = MdAccountBalance as any;
const InfoIcon = MdInfoOutline as any;
const CheckIcon = MdCheckCircle as any;
const HistoryIcon = MdHistory as any;
const UploadIcon = MdCloudUpload as any;

function PayoutAccountPage() {
    // 1. State Management
    const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
    const [accountHistory, setAccountHistory] = useState<BankAccountList[]>([]);

    const bankList = [
        { code: "002", name: "KDB산업은행" },
        { code: "003", name: "IBK기업은행" },
        { code: "004", name: "국민은행" },
        { code: "007", name: "수협" },
        { code: "011", name: "NH농협은행" },
        { code: "020", name: "우리은행" },
        { code: "023", name: "SC제일은행" },
        { code: "031", name: "대구은행" },
        { code: "032", name: "부산은행" },
        { code: "034", name: "광주은행" },
        { code: "035", name: "제주은행" },
        { code: "037", name: "전북은행" },
        { code: "039", name: "경남은행" },
        { code: "071", name: "우체국" },
        { code: "081", name: "하나은행" },
        { code: "088", name: "신한은행" },
        { code: "090", name: "카카오뱅크" },
        { code: "092", name: "토스뱅크" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Current Account Info
                const accountResponse = await api.get("/creators/settlements/bank-account");
                setBankAccount(accountResponse.data);

                // 2. Account History Info
                const historyResponse = await api.get("/creators/settlements/bank-account/history");
                setAccountHistory(historyResponse.data);
                console.log("History Data:", historyResponse.data);
            } catch (error) {
                console.error("데이터 조회 실패: ", error);
            }
        }
        fetchData();
    }, [])

    const [form, setForm] = useState({
        bankCode: "088", // Shinhan (Toss Code)
        accountNumber: "",
    });

    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<null | 'SUCCESS' | 'ERROR'>(null);



    const formatAccountNumber = (num: string) => {
        if (!num || num.length < 8) return num;
        const first = num.slice(0, 4);
        const last = num.slice(-4);
        const middle = num.slice(4, -4);
        return `${first}-${middle}-${last}`;
    };

    // Handle account number input (numeric only)
    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 14);
        setForm(prev => ({ ...prev, accountNumber: value }));
        if (verificationStatus) setVerificationStatus(null);
    };

    const handleVerify = async () => {
        // 기존 계좌가 있을 경우 확인 절차 추가
        if (bankAccount) {
            const isConfirmed = window.confirm("새로운 계좌를 인증하면 기존에 등록된 계좌 정보가 삭제되고 변경됩니다.");
            if (!isConfirmed) return;
        }

        setIsVerifying(true);
        setVerificationStatus(null);

        try {
            const response = await api.post("/creators/settlements/bank-account", {
                bankCode: form.bankCode,
                accountNumber: form.accountNumber
            });

            if (response.status === 200 || response.status === 201) {
                setVerificationStatus('SUCCESS');
                window.location.reload();
            } else {
                setVerificationStatus('ERROR');
            }
        } catch (error) {
            console.error("계좌 인증 실패:", error);
            setVerificationStatus('ERROR');
        } finally {
            setIsVerifying(false);
        }
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
                            {bankAccount && bankAccount.bankCode ? (
                                <>
                                    <S.BankLogo>
                                        <BankIcon />
                                    </S.BankLogo>
                                    <S.AccountInfoDetail>
                                        <S.AccountNumberText>
                                            {formatAccountNumber(bankAccount.accountNumber)}
                                        </S.AccountNumberText>
                                        <S.SmallInfoLabel>{bankAccount.bankCode}</S.SmallInfoLabel>
                                    </S.AccountInfoDetail>
                                </>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '20px 0', gap: '8px' }}>
                                    <BankIcon style={{ fontSize: '32px', color: '#dee2e6', marginBottom: '8px' }} />
                                    <p style={{ color: '#adb5bd', fontSize: '14px', fontWeight: 500 }}>
                                        등록된 정산 계좌 정보가 없습니다.
                                    </p>
                                </div>
                            )}
                        </S.CurrentAccountBox>
                    </S.DashboardCard>

                    {/* 2. Account Registration / Update Form */}
                    <S.DashboardCard>
                        <S.CardHeader>
                            <S.CardTitle>계좌 정보 등록</S.CardTitle>
                        </S.CardHeader>


                        <S.InputGrid>

                            <S.InputGroup>
                                <S.LabelText>은행 선택</S.LabelText>
                                <S.StyledSelect
                                    value={form.bankCode}
                                    onChange={(e) => setForm(prev => ({ ...prev, bankCode: e.target.value }))}
                                >
                                    {bankList.map(bank => (
                                        <option key={bank.code} value={bank.code}>{bank.name}</option>
                                    ))}
                                </S.StyledSelect>
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
                                {verificationStatus === 'ERROR' && (
                                    <span style={{ fontSize: '13px', color: '#e03131', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        계좌 인증에 실패했습니다. 정보를 다시 확인해주세요.
                                    </span>
                                )}
                            </S.InputGroup>
                        </S.InputGrid>
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
                            {accountHistory.length > 0 ? (
                                [...accountHistory]
                                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                    .map((log) => {
                                        const isCurrent = log.deletedAt === null;
                                        return (
                                            <S.AuditLogItem key={log.id}>
                                                <span style={{ color: isCurrent ? '#4c6ef5' : 'inherit' }}>
                                                    {isCurrent ? "현재 등록 계좌" : "이전 계좌 기록"} ({log.bankCode})
                                                </span>
                                                <span style={{ textAlign: 'right', fontSize: '12px' }}>
                                                    <div>등록: {formatDateAndTime(log.createdAt)}</div>
                                                    {!isCurrent && (
                                                        <div style={{ marginTop: '2px' }}>
                                                            변경: {formatDateAndTime(log.deletedAt)}
                                                        </div>
                                                    )}
                                                </span>
                                            </S.AuditLogItem>
                                        );
                                    })
                            ) : (
                                <p style={{ fontSize: '13px', color: '#adb5bd', textAlign: 'center', padding: '10px 0' }}>변경 이력이 없습니다.</p>
                            )}
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