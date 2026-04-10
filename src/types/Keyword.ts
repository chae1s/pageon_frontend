export interface Keyword {
    keywordId: number;
    keyword: string;
}


export interface Category {
    id: number;
    name: string;
    keywords: Keyword[];
}