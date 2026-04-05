export interface SettlementSummary {
    settlementId: number;
    creatorId: number;
    email: string;
    author: string;
    settledPoint: number;
    settlementStatus: string;
    payoutDate: string;
    settledAt: string;
}

export interface SettlementDetail {
    totalPoint: number;
    platformFee: number;
    taxFee: number;
    settledPoint: number;
    failedReason: string;
    resolved: boolean;
}