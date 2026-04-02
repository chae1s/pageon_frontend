import { Pagination } from "./Page";
import { EpisodeImage } from "./WebtoonImage";

export interface RegisterRequest {
    penName: string,
    contentType: string,
    agreedToAiPolicy: boolean
}

export interface CreateContent {
    title: string;
    description: string;
    contentType: string;
    publishedAt: string;
    keywords: string;
    coverImage: File;
    workStatus: string;
}

export interface CreatorContentList {
    contentId: number;
    contentTitle: string;
    cover: string;
    contentType: string;
    workStatus: string;
    seriesStatus: string;
    serialDay: string;
    episodeUpdatedAt: string;
    keywords: string[];
}

export interface CreatorContentSimple {
    contentId: number;
    contentType: string;
    contentTitle: string;
    cover: string;
    seriesStatus: string;
    serialDay: string;
}

export interface CreatorContentDetail {
    contentId: number;
    contentType: string;
    contentTitle: string;
    description: string;
    keywordLine: string;
    cover: string;
    serialDay: string;
    seriesStatus: string;
    workStatus: string;
}

export interface CreatorDeleteContent {
    contentId: number;
    contentTitle: string;
    contentType: string;
}

export interface CreatorDeletionList {
    id: number;
    contentTitle: string;
    deleteReason: string;
    reasonDetail: string;
    requestedAt: string;
    deleteStatus: string;
}

export interface SimpleContent {
    contentId: number;
    contentTitle: string;
    contentType: string;
    serialDay: string;
    nextEpisodeNum: number;
}

export interface ContentTab {
    contentId: number;
    contentTitle: string;
    cover: string;
    seriesStatus: string;
    contentType: string;
}

export interface ContentStats {
    ongoingCount: number;
    restCount: number;
    completedCount: number;
    deletionCount: number;
    totalViewCount: number;
    averageRating: number;
    totalInterestCount: number;
    contents: ContentTab[];
}

export interface ContentIndividual {
    contentId: number;
    contentTitle: string;
    cover: string;
    description: string;
    contentType: string;
    serialDay: string;
    seriesStatus: string;
    keywords: string[];
    viewCount: number;
    interestCount: number;
    workStatus: string;
    episodeUpdatedAt: string;
    episodeStats: EpisodeStats;
}

export interface EpisodeStats {
    totalEpisodeCount: number;
    publishedEpisodeCount: number;
    draftEpisodeCount: number;
    scheduledEpisodeCount: number;
}

export interface EpisodeList {
    episodeId: number;
    episodeNum: number;
    episodeTitle: string;
    averageRating: number;
    viewCount: number;
    episodeStatus: string;
    publishedAt: string;
    createdAt: string;
}

export interface ContentEpisode {
    contentTitle: string;
    contentType: string;
    episodeStats: EpisodeStats;
    episodes: Pagination<EpisodeList>;
}

export interface WebnovelEpisodeDetail {
    contentTitle: string;
    episodeId: number;
    episodeNum: number;
    episodeTitle: string;
    publishedAt: string;
    episodeStatus: string;
    content: string;
    createdAt: string;
}

export interface WebtoonEpisodeDetail {
    contentTitle: string;
    episodeId: number;
    episodeNum: number;
    episodeTitle: string;
    publishedAt: string;
    episodeStatus: string;
    episodeImages: EpisodeImage[];
    createdAt: string;
}

export interface BankAccount {
    id: number;
    bankCode: string;
    accountNumber: string;
}


export interface BankAccountList {
    id: number;
    bankCode: string;
    createdAt: string;
    deletedAt: string;
}

export interface SettlementSummary {
    settlementId: number;
    settledPoint: number;
    scheduledAt: string;
    settlementStatus: string;
}

export interface RevenueDetail {
    settlementId: number;
    totalPoint: number;
    platformFee: number;
    taxFee: number;
    settledPoint: number;
    payoutDate: string;
}

export interface ExpectedRevenue {
    totalPoint: number;
    settledPoint: number;
    payoutDate: string;
}

export interface ContentRevenue {
    contentTitle: string;
    revenue: number;
    percentage: number;
}

export interface RevenueAnalytics {
    totalRevenue: number;
    contents: ContentRevenue[];
}

export interface DailyRevenue {
    date: string;
    revenue: number;
}

export interface RevenueTrend {
    maxRevenue: number;
    dailyRevenues: DailyRevenue[];
}

export interface SettlementDetail {
    settlementId: number;
    totalPoint: number;
    platformFee: number;
    taxFee: number;
    settledPoint: number;
    periodStart: string;
    periodEnd: string;
    scheduledAt: string;
    settledAt: string;
    payoutDate: string;
    settlementStatus: string;
}