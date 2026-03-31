import React from "react";
import * as S from "../../pages/Creators/CreatorContent.styles";

interface WebnovelEditorProps {
    content: string;
    onChange: (value: string) => void;
}

const WebnovelEditor: React.FC<WebnovelEditorProps> = ({ content, onChange }) => {
    return (
        <S.FieldGroup>
            <S.FieldLabel htmlFor="episode-content">에피소드 내용</S.FieldLabel>
            <S.TextArea
                id="episode-content"
                value={content}
                onChange={(e) => onChange(e.target.value)}
                placeholder="에피소드 내용을 입력하세요."
                style={{ minHeight: "400px" }}
            />
        </S.FieldGroup>
    );
};

export default WebnovelEditor;
