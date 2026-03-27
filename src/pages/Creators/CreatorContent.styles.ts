import styled from "styled-components";

export const CreatorTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
`;

export const CreatorFilterSortRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CreatorFilterWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    color: #444;
    font-size: 0.85em;
`;

export const CreatorSortWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 14px;
    color: #444;
    font-size: 0.85em;
`;

export const RegisterForm = styled.form`
    width: 100%;
    max-width: 820px;
    padding: 0;
    margin: 0;
    border-radius: 12px;
    background: #fff;
`;

export const RegisterFormLayout = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 28px;
`;

export const SubmitButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 70px;
`;

export const SubmitButton = styled.button`
    min-width: 140px;
    height: 42px;
    border: none;
    border-radius: 6px;
    background: #528efa;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        background-color: var(--accent-color);
    }
`;

export const CoverFieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 0 0 auto;
`;

export const FieldsColumn = styled.div`
    flex: 1;
    min-width: 0;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
`;

export const FieldLabel = styled.label`
    display: block;
    color: #444;
    font-size: 14px;
    font-weight: 600;
    width: 52px;
`;

export const CoverFieldLabel = styled(FieldLabel)`
    width: auto;
`;

export const TextInput = styled.input`
    height: 42px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0 12px;
    font-size: 14px;
`;

export const TextArea = styled.textarea`
    min-height: 120px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px 12px;
    font-size: 14px;
    resize: none;
`;

export const WeekdayGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px 20px;
`;

export const WeekdayFieldRow = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const KeywordFieldRow = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const KeywordLineInput = styled.input`
    flex: 1;
    height: 34px;
    border: none;
    padding: 0 4px;
    font-size: 14px;
    background: transparent;

`;

export const WeekdayLabel = styled.label<{ $selected: boolean }>`
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: ${({ $selected }) => ($selected ? "#69a3ff" : "#aaa")};
    cursor: pointer;

    input {
        display: none;
    }
`;

export const TypeSelectGroup = styled.div`
    display: flex;
`;

export const TypeSelectBox = styled.label<{ $selected: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 100px;
    padding: 0;
    border: 1px solid ${({ $selected }) => ($selected ? "#69a3ff" : "#ccc")};
    background-color: ${({ $selected }) => ($selected ? "#f0f6ff" : "#fff")};
    color: ${({ $selected }) => ($selected ? "#69a3ff" : "#444")};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:not(:first-child) {
        margin-left: -1px;
    }

    &:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    &:last-child {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    ${({ $selected }) => $selected && `
        z-index: 1;
    `}

    input {
        display: none;
    }
`;

export const FileInput = styled.input`
    display: none;
`;

export const CoverUploadBox = styled.label`
    width: 250px;
    height: 375px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    overflow: hidden;
`;

export const UploadIcon = styled.span`
    width: 42px;
    height: 42px;
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 22px;
    line-height: 1;
`;

export const UploadText = styled.span`
    color: #666;
    font-size: 14px;
    font-weight: 500;
`;

export const CoverPreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const FileName = styled.p`
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #666;
`;

export const KeywordTagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-left: 66px;
`;

export const KeywordTag = styled.span`
    display: inline-block;
    padding: 6px 12px;
    background-color: #F4F4F4;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    white-space: nowrap;
    line-height: 1;
`;

export const ImageModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ImageModalContent = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ImageModalTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #333;
`;

export const ImageModalButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ImageModalButton = styled.button<{ $variant?: 'danger' | 'cancel' }>`
    flex: 1;
    padding: 10px 0;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    background: ${({ $variant }) =>
        $variant === 'danger' ? '#ffebee' :
            $variant === 'cancel' ? '#f0f0f0' : '#e3f2fd'};
    color: ${({ $variant }) =>
        $variant === 'danger' ? '#d32f2f' :
            $variant === 'cancel' ? '#666' : '#1976d2'};
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin: 15px 0 40px;
`;

export const ContentCard = styled.div`
    display: flex;
    background: #fff;
    border: 1px solid #ebebeb;
    border-radius: 12px;
    overflow: hidden;
    padding: 24px;
    gap: 24px;
    cursor: default;
`;

export const ContentInfoSection = styled.div`
    width: 360px;
    flex-shrink: 0;
    display: flex;
    gap: 20px;
`;

export const EpisodeInfoSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #eee;
    padding-left: 24px;
`;

export const InfoThumbnail = styled.img`
    width: 130px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
    border: 1px solid #eee;
`;

export const InfoTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    min-width: 0;
`;

export const ContentMetaRow = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #888;
    margin-bottom: 8px;
`;

export const ContentActionWrap = styled.div`
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ContentActionLink = styled.span<{ $danger?: boolean }>`
    font-size: 13px;
    color: ${({ $danger }) => ($danger ? '#c62828' : '#888')};
    cursor: pointer;
`;

export const ContentMetaItem = styled.span`
    /* font overrides if necessary */
`;

export const ContentSeparate = styled.span`

`;

export const ContentStatus = styled.span`

`;

export const CardTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: #222;
    margin: 0 0 12px 0;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// Episode Side Styles
export const EpisodeHeaderWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const EpisodeSectionTitle = styled.h4`
    font-size: 15px;
    font-weight: 600;
    color: #444;
    margin: 0;
`;

export const NewEpisodeButton = styled.button`
    padding: 6px 12px;
    background: #528efa;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
`;

export const MockEpisodeItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #555;
`;

export const ActionButtonWrap = styled.div`
    margin-top: auto;
    display: flex;
    gap: 12px;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
    flex: 1;
    padding: 10px 0;
    border: 1px solid ${({ $primary }) => ($primary ? '#528efa' : '#ddd')};
    background: ${({ $primary }) => ($primary ? '#528efa' : '#fff')};
    color: ${({ $primary }) => ($primary ? '#fff' : '#555')};
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #ebebeb;
    color: #888;
    font-size: 16px;
    margin-top: 24px;
`;