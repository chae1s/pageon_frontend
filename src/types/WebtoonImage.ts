export interface EpisodeImage {
    id: number;
    sequence: number;
    imageUrl: string;
}

export interface EpisodeImageItem {
    id: string | number;
    file?: File;
    preview: string;
    label: number;
}