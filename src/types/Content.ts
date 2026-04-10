import { EpisodeSummary } from "./Episodes";
import { Keyword } from "./Keyword";

export type ContentType = 'WEBNOVEL' | 'WEBTOON';
export type ContentStatus = 'COMPLETED' | 'ONGOING' | 'REST';

export interface SimpleContent {
    contentId: number;
    contentTitle: string;
    author: string;
    cover: string;
    contentType: ContentType;
    totalAverageRating: number;
    totalRatingCount: number;
}

export interface RankingContent {
    contentId: number;
    contentTitle: string;
    author: string;
    cover: string;
    totalAverageRating: number;
    totalRatingCount: number;
    contentType: ContentType;
}

export interface ContentDetail {
    contentId: number;
    contentType: ContentType;
    contentTitle: string;
    cover: string;
    author: string;
    description: string;
    serialDay: string;
    seriesStatus: ContentStatus;
    totalAverageRating: number;
    totalRatingCount: number;
    viewCount: number;
    keywords: Keyword[];
    isInterested: boolean;
}

export interface SearchContent {
    contentId: number;
    contentTitle: string;
    description: string;
    cover: string;
    author: string;
    episodeCount: number;
    episodeUpdatedAt: string;
    keywords: Keyword[];
    totalAverageRating: number;
    totalRatingCount: number;
    contentType: ContentType;
}

export interface InterestContent {
    contentId: number;
    contentTitle: string;
    author: string;
    episodeUpdatedAt: string;
    cover: string;
    contentType: ContentType;
    serialDay: string;
    status: ContentStatus;
}

export interface RecentReadContent {
    contentId: number;
    contentTitle: string;
    author: string;
    cover: string;
    episodeUpdatedAt: string;
    lastReadAt: string;
    lastReadEpisodeId: number;
    contentType: ContentType;
    serialDay: string;
    status: ContentStatus;
}
