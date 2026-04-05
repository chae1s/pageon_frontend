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

export interface DeletionRequestSummary {
    requestId: number;
    contentTitle: string;
    author: string;
    deleteStatus: string;
    requestedAt: string;
    processedAt: string;
}

export interface DeletionRequestDetail {
    requestId: number;
    deleteReason: string;
    reasonDetail: string;
}