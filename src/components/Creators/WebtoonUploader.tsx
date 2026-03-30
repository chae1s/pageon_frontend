import React, { useRef } from "react";
import { MdCloudUpload, MdClose } from "react-icons/md";
import * as S from "../../pages/Creators/CreatorContent.styles";

import { EpisodeImageItem } from "../../types/WebtoonImage";

const CloudUploadIcon = MdCloudUpload as any;
const CloseIcon = MdClose as any;

interface WebtoonUploaderProps {
    images: EpisodeImageItem[];
    setImages: React.Dispatch<React.SetStateAction<EpisodeImageItem[]>>;
}

const WebtoonUploader: React.FC<WebtoonUploaderProps> = ({ images, setImages }) => {
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxLabel = images.length > 0 ? Math.max(...images.map(img => img.label)) : 0;

        const newImages: EpisodeImageItem[] = files.map((file, index) => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file),
            label: maxLabel + index + 1
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id: string | number, preview: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
        if (preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }
    };

    const handleDragStart = (index: number) => {
        dragItem.current = index;
    };

    const handleDragEnter = (index: number) => {
        dragOverItem.current = index;
    };

    const handleSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const newList = [...images];
        const draggedItemContent = newList.splice(dragItem.current, 1)[0];
        newList.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setImages(newList);
    };

    return (
        <S.FieldGroup style={{ marginTop: '10px' }}>
            <S.WeekdayFieldRow style={{ marginBottom: '10px', gap: '8px' }}>
                <S.FieldLabel style={{ width: 'auto', marginBottom: 0 }}>에피소드 이미지</S.FieldLabel>
                <S.ContentBadge>[이미지 개수 {images.length}]</S.ContentBadge>
            </S.WeekdayFieldRow>
            <S.ImageGrid>
                <S.FileInput
                    id="episode-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                />
                <S.ImageUploadPrompt htmlFor="episode-images">
                    <CloudUploadIcon />
                    <span>이미지 추가</span>
                </S.ImageUploadPrompt>
                {images.map((img, index) => (
                    <S.ImageItem
                        key={img.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <S.ImageDeleteBtn
                            type="button"
                            onClick={() => removeImage(img.id, img.preview)}
                        >
                            <CloseIcon />
                        </S.ImageDeleteBtn>
                        <S.ImagePreview src={img.preview} alt={`원고 ${img.label}`} />
                        <S.ImageFileName>{img.file ? img.file.name : `기존 이미지 ${img.label}`}</S.ImageFileName>
                        <S.OrderBadge>{img.label}</S.OrderBadge>
                    </S.ImageItem>
                ))}
            </S.ImageGrid>
            <div style={{ marginTop: '8px', fontSize: '13px', color: '#888' }}>
                * 드래그하여 이미지 순서를 변경할 수 있습니다.
            </div>
        </S.FieldGroup>
    );
};

export default WebtoonUploader;
