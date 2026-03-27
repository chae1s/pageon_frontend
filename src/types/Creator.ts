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
    contentTitle: string;
    description: string;
    keywords: string;
    cover: string;
    serialDay: string;
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
