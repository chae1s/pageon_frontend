import styled from "styled-components";

export const CreatorTitle = styled.h2`
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 24px;
`;

export const CreatorSubtitle = styled.div`
    font-size: 1rem;
    color: #666;
    font-weight: 500;
    margin-top: -10px;
    margin-bottom: 20px;
    width: 960px;
    margin-left: auto;
    margin-right: auto;
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
    max-width: 960px;
    padding: 0;
    margin: 40px auto 0 auto;
    background: #fff;
`;

export const RegisterFormLayout = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 48px;
`;

export const SubmitButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 70px;
`;

export const SubmitButton = styled.button`
    min-width: 180px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b5bdb 0%, #5c7cfa 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

export const CancelButton = styled.button`
    min-width: 180px;
    height: 50px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background: #fff;
    color: #666;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #f8f9fa;
        border-color: #ccc;
        color: #333;
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

export const CompactFieldGroup = styled(FieldGroup)`
    margin-bottom: 14px;
`;

export const FieldLabel = styled.label`
    display: block;
    color: #444;
    font-size: 14px;
    font-weight: 600;
    width: 100px;
`;

export const CoverFieldLabel = styled(FieldLabel)`
    width: auto;
`;

export const TextInput = styled.input`
    height: 48px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 14px;
    transition: all 0.2s;
    background: #fff;

    &:focus {
        outline: none;
        border-color: #3b5bdb;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.1);
    }

    &::placeholder {
        color: #bbb;
    }
`;

export const TextArea = styled.textarea`
    min-height: 140px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 14px;
    resize: none;
    transition: all 0.2s;
    background: #fff;
    line-height: 1.6;

    &:focus {
        outline: none;
        border-color: #3b5bdb;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.1);
    }

    &::placeholder {
        color: #bbb;
    }
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

export const TextSelectGroup = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
    height: 42px;
`;

export const TextSelectBox = styled.label<{ $selected: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: ${({ $selected }) => ($selected ? "700" : "500")};
    color: ${({ $selected }) => ($selected ? "#528efa" : "#888")};
    transition: color 0.2s;

    input {
        display: none;
    }

    &:hover {
        color: ${({ $selected }) => ($selected ? "#528efa" : "#444")};
    }
`;

export const FileInput = styled.input`
    display: none;
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
    font-size: 24px;
    background: #fff;
    transition: all 0.22s;
`;

export const CoverUploadBox = styled.label`
    width: 260px;
    height: 380px;
    border: 2px dashed #e0e0e0;
    border-radius: 12px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s;

    &:hover {
        border-color: #3b5bdb;
        background: #f8faff;
        
        ${UploadIcon} {
            border-color: #3b5bdb;
            color: #3b5bdb;
        }
    }
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
    margin-left: 114px;
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 24px;
    width: 100%;
    margin: 15px 0 40px;
`;

export const ContentCard = styled.div`
    display: flex;
    background: #fff;
    border: 1px solid #ebebeb;
    border-radius: 12px;
    overflow: hidden;
    padding: 12px;
    gap: 12px;
    cursor: default;
`;

export const ContentInfoSection = styled.div`
    display: flex;
    flex: 1;
    gap: 16px;
    min-width: 0;
`;

export const EpisodeInfoSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #eee;
    padding-left: 24px;
`;

export const InfoThumbnail = styled.img`
    width: 91px;
    height: 127px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
    border: 1px solid #eee;
`;

export const InfoTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    padding: 2px 0;
`;

export const ContentMetaRow = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #888;
    margin-bottom: 6px;
`;

export const ContentKeywordWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
`;

export const ContentKeywordItem = styled.span`
    font-size: 14px;
`;

export const ContentActionWrap = styled.div`
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

export const ContentStatus = styled.span<{ $status?: string }>`
    color: ${({ $status }) => ($status === 'DELETING' ? '#FC5858' : 'inherit')};
    cursor: ${({ $status }) => ($status === 'DELETING' ? 'pointer' : 'default')};
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

export const CreatorContentListWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-bottom: 50px;
`

export const CreatorContentList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`

export const EmptyListText = styled.div`
    margin: 10px auto;
`

export const ContentItem = styled.div`
    display: flex;
    gap: 12px;
    padding: 14px;
    background: #fff;
    width: calc(50% - 8px);
    min-height: 160px;
    box-sizing: border-box;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: default;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const ContentImageCover = styled.div`
    height: 150px;
    border-radius: 4px;
    overflow: hidden;
    background: #f6f6f6;
    flex-shrink: 0;
`;

export const ContentImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
`;

export const ContentInfoCover = styled.div<{ $history: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    margin: auto 0;
    ${({ $history }) => ($history ? "max-width: 166px" : "")};
`;

export const ContentTitleWrapper = styled.div`
    
`

export const ContentTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal;
    max-height: calc(19px + 1);
    line-height: 19px;
    word-break: break-all;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 4px;
    cursor: pointer;
    padding-right: 10px;
`;

export const ContentInfoWrapper = styled.div`
    display: inline-flex;
    font-size: 14px;
    color: #666;
    line-height: 19px;
`

export const ContentAuthor = styled.div`
    
`;

export const ContentType = styled.div`
    
`


export const ContentEpisodeUpdatedAt = styled.div`
    
`


export const ContentBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px 8px;
    font-size: 12px;
    font-weight: 600;
`;


export const ContentLastReadHistory = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    line-height: 19px;
`;

export const ContentEpisodeReadBtn = styled.button`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 3px;
    width: 74px;
    min-width: 74px;
    flex-shrink: 0;
`

export const ContentEpisodeReadBtnText = styled.div`
    font-size: 14px;
    line-height: 19px;
    color: #444;
`

export const ContentEpisodeReadIcon = styled.img`
    width: 19px;
    height: 19px;
`


export const CreatorSimpleSortBtnWrapper = styled.div`
    display: block;
`

export const CreatorSimpleSortBtnList = styled.div`
    display: block;
    padding-left: 8px;
    margin-bottom: 16px;
`

export const CreatorSimpleSelectType = styled.div`
    display: flex;
    gap: 14px;
    color: #444;
    font-size: 0.98rem;
    padding: 10px 0 10px 8px;
    border-bottom: 1px solid rgba(0, 0, 0, .1)
`

export const SortBtn = styled.button<{ active: boolean }>`
    color: ${({ active }) => (active ? "#69a3ff" : "#b4b4b4")};
    font-weight: ${({ active }) => (active ? "500" : "")};
`

export const CreatorSimpleSearchSelectSort = styled.div`
    display: flex;
    justify-content: space-between;
`

export const MypageCommentsSection = styled.section`
    padding-left: 10px;
`

export const CreatorSimpleSearchGroup = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 250px;
    margin: 12px 0 0 0;
`

export const CreatorSimpleSearchInput = styled.input`
    flex: 1;
    padding: 8px 8px 6px 8px;
    border: none;
    border-radius: 0;
    font-size: 1rem;
    background: none;
    color: #222;
`

export const CreatorSimpleSearchBtn = styled.button`
    background: none;
    border: none;
    padding: 0 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 32px;
`

export const CreatorSimpleSortGroup = styled.div`
    display: flex;
    gap: 12px;
    font-size: 0.85em;
    padding: 10px 8px;
`;

/* Delete Content Request Styles */
export const DeleteInfoBox = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto 30px auto;
    padding: 10px 0;
`;

export const DeleteInfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: #444;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

export const DeleteInfoLabel = styled.span`
    font-weight: 600;
    color: #222;
    min-width: 80px;
`;

export const DeleteWarningBox = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto 30px auto;
    padding: 16px 20px;
    background-color: #fff9f9;
    border: 1px solid #ffebeb;
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

export const DeleteWarningIcon = styled.span`
    color: #e53935;
    font-size: 18px;
    line-height: 1;
    margin-top: 2px;
`;

export const DeleteWarningText = styled.div`
    color: #e53935;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
`;

export const DeleteReasonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
`;

export const DeleteReasonLabel = styled.label<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border: 1px solid ${({ $selected }) => ($selected ? "#528efa" : "#e0e0e0")};
    background-color: ${({ $selected }) => ($selected ? "#f0f6ff" : "#fff")};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
    font-weight: ${({ $selected }) => ($selected ? "600" : "400")};
    color: ${({ $selected }) => ($selected ? "#528efa" : "#666")};

    input {
        display: none;
    }

    &:hover {
        border-color: #528efa;
    }
`;

export const DeleteTextArea = styled(TextArea)`
    min-height: 160px;
    margin-top: 10px;
`;

export const DeleteAgreementWrap = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0;
    margin: 10px 0 10px;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: #333;
    font-weight: 600;

    input {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
`;

/* Delete Request List Styles */
export const DeleteTable = styled.table`
    width: 820px;
    margin: 0 auto 40px auto;
    border-collapse: collapse;
`;

export const DeleteColTitle = styled.col`
    width: auto;
`;

export const DeleteColReason = styled.col`
    width: 220px;
`;

export const DeleteColDate = styled.col`
    width: 150px;
    text-align: center;
`;

export const DeleteColStatus = styled.col`
    width: 140px;
`;

export const DeleteColAction = styled.col`
    width: 120px;
`;

export const DeleteTheadTr = styled.tr`
    border-bottom: solid 1px #e5e5e5;
    font-size: 13px;
    cursor: default;
`;

export const DeleteTh = styled.th<{ $align?: string }>`
    padding: 12px 15px;
    text-align: ${({ $align }) => $align || 'left'};
    font-weight: 600;
    color: #333;
`;

export const DeleteTbodyTr = styled.tr<{ $isOpen?: boolean }>`
    border-bottom: ${({ $isOpen }) => ($isOpen ? 'none' : 'solid 1px #e6e6e6')};
`;

export const DeleteTd = styled.td<{ $align?: string; $bold?: boolean }>`
    padding: ${({ $align }) => ($align === 'center' ? '0' : '13px 15px 12px 14px')};
    font-size: 14px;
    line-height: 14px;
    text-align: ${({ $align }) => $align || 'left'};
    font-weight: ${({ $bold }) => ($bold ? "600" : "400")};
    color: #444;
    vertical-align: middle;
`;

export const DeleteStatusBadge = styled.span<{ $status: string }>`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    min-width: 60px;
    
    ${({ $status }) => {
        switch ($status) {
            case 'PENDING':
                return `background-color: #fff4e5; color: #ff9800;`;
            case 'COMPLETED':
                return `background-color: #e8f5e9; color: #4caf50;`;
            case 'REJECTED':
                return `background-color: #ffebee; color: #f44336;`;
            case 'CANCELED':
                return `background-color: #f5f5f5; color: #9e9e9e;`;
            default:
                return `background-color: #f5f5f5; color: #444;`;
        }
    }}
`;

export const RequestCancelBtn = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    background: #fff;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #fdfdfd;
        color: #333;
    }
`;

export const DeleteDetailTr = styled.tr`
    border-bottom: solid 1px #e6e6e6;
`;

export const DeleteDetailTd = styled.td`
    padding: 15px 20px 20px 25px;
    font-size: 13.5px;
    line-height: 1.6;
    color: #555;
    vertical-align: top;
`;

export const DeleteDetailLabel = styled.div`
    font-weight: 700;
    color: #333;
    margin-bottom: 6px;
    font-size: 13px;
`;

/* Webtoon Episode Image Upload Styles */
export const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 140px));
    gap: 16px;
    margin-top: 10px;
    padding: 18px;
    background: #fdfdfd;
    border: 1px dashed #ddd;
    border-radius: 8px;
    min-height: 200px;
`;

export const ImageItem = styled.div<{ $isDragging?: boolean }>`
    position: relative;
    width: 140px;
    height: 180px;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #fff;
    overflow: hidden;
    cursor: grab;
    transition: transform 0.2s, box-shadow 0.2s;
    opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
    box-shadow: ${({ $isDragging }) => ($isDragging ? '0 8px 20px rgba(0,0,0,0.15)' : 'none')};

    &:active {
        cursor: grabbing;
    }

    &:hover {
        border-color: #528efa;
    }
`;

export const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const ImageDeleteBtn = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    z-index: 2;

    &:hover {
        background: rgba(255, 68, 68, 0.9);
    }
`;

export const OrderBadge = styled.div`
    position: absolute;
    bottom: 4px;
    left: 4px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    z-index: 2;
`;

export const ImageFileName = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 10px;
    padding: 6px 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    z-index: 3;
    pointer-events: none;
`;

export const ImageUploadPrompt = styled.label`
    width: 140px;
    height: 180px;
    border: 2px dashed #ccc;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    background: #fff;
    transition: all 0.2s;

    &:hover {
        border-color: #528efa;
        background: #f0f6ff;
        
        span, svg {
            color: #528efa;
        }
    }

    span {
        font-size: 12px;
        font-weight: 500;
        color: #888;
    }
    
    svg {
        font-size: 24px;
        color: #aaa;
    }
`;

/* Content Management Dashboard Styles */
export const ManagementGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const ManagementCard = styled.div<{ $span2?: boolean }>`
    background: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    ${({ $span2 }) => $span2 && `grid-column: span 2;`}
`;

export const ManagementCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f5f5f5;
`;

export const ManagementCardTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const CardActionBtn = styled.button`
    font-size: 13px;
    font-weight: 600;
    color: #528efa;
    background: none;
    border: none;
    cursor: pointer;
`;

export const CardHeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const WriteEpisodeBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: #3b5bdb;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #364fc7;
        box-shadow: 0 2px 8px rgba(59, 91, 219, 0.3);
    }

    svg {
        font-size: 16px;
    }
`;

/* Metadata Section */
export const MetaInfoWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

export const MetaCover = styled.img`
    width: 100px;
    height: 140px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #eee;
`;

export const MetaTextWrap = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MetaTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #222;
`;

export const MetaDesc = styled.div`
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

/* Operational Status Section */
export const StatusList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const StatusItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StatusLabel = styled.span`
    font-size: 14px;
    color: #555;
    font-weight: 500;
`;

export const StatusValueBadge = styled.span<{ $type?: string }>`
    display: inline-block;
    width: 57px;
    text-align: center;
    padding: 4px 0;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    background: ${({ $type }) =>
        $type === 'ONGOING' ? '#e8f5e9' :
            $type === 'REST' ? '#fff3e0' :
                $type === 'COMPLETED' ? '#e3f2fd' :
                    $type === 'DELETING' ? '#ffebee' :
                        $type === 'PRIVATE' ? '#f5f5f5' : '#f5f5f5'};
    color: ${({ $type }) =>
        $type === 'ONGOING' ? '#2e7d32' :
            $type === 'REST' ? '#ef6c00' :
                $type === 'COMPLETED' ? '#1565c0' :
                    $type === 'DELETING' ? '#d32f2f' :
                        $type === 'PRIVATE' ? '#757575' : '#757575'};
`;

/* Analytics Section */
export const AnalyticsSummaryTotal = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
`;

export const AnalyticsStatBox = styled.div`
    padding: 16px;
    background: #fcfcfc;
    border-radius: 8px;
    text-align: center;
`;

export const StatValue = styled.div`
    font-size: 20px;
    font-weight: 800;
    color: #222;
    margin-bottom: 4px;
`;

export const StatLabel = styled.div`
    font-size: 12px;
    color: #888;
    font-weight: 500;
`;

/* Simple Chart Components */
export const ChartSectionWrap = styled.div`
    margin-top: 10px;
`;


export const ChartTitle = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: #444;
    margin-bottom: 12px;
`;

export const BarChartRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
`;

export const BarLabel = styled.div`
    width: 40px;
    font-size: 12px;
    color: #666;
`;

export const BarTrack = styled.div`
    flex: 1;
    height: 12px;
    background: #f0f0f0;
    border-radius: 6px;
    overflow: hidden;
`;

export const BarFill = styled.div<{ $percent: number; $color?: string }>`
    width: ${({ $percent }) => $percent}%;
    height: 100%;
    background: ${({ $color }) => $color || '#528efa'};
    border-radius: 6px;
`;

export const BarValue = styled.div`
    width: 30px;
    font-size: 12px;
    font-weight: 600;
    color: #444;
    text-align: right;
`;

/* Shortcut / Episode Management Section */
export const ShortcutGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
`;

export const ShortcutItem = styled.div`
    padding: 16px;
    background: #f8faff;
    border: 1px solid #eef2ff;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(82, 142, 250, 0.1);
    }
`;

export const ShortcutTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: #3b5bdb;
`;

export const ShortcutDesc = styled.div`
    font-size: 12px;
    color: #888;
`;

/* Multi-Content Selection Styles */
export const SelectionBar = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 30px;
    overflow-x: auto;
    padding: 4px 4px 12px 4px;
    &::-webkit-scrollbar { height: 6px; }
    &::-webkit-scrollbar-thumb { background: #eee; border-radius: 3px; }
`;

export const MiniWorkCard = styled.div<{ $active: boolean }>`
    width: 179px;
    flex-shrink: 0;
    padding: 12px;
    background: ${({ $active }) => ($active ? '#fff' : '#fcfcfc')};
    border: 2px solid ${({ $active }) => ($active ? '#3b5bdb' : '#eee')};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    gap: 12px;
    transition: all 0.2s;
    box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(59, 91, 219, 0.1)' : 'none')};

    &:hover { 
        border-color: #3b5bdb; 
        background: #fff;
    }
`;

export const MiniCover = styled.img`
    width: 44px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #eee;
`;

export const MiniInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    overflow: hidden;
`;

export const MiniTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const MiniStatus = styled.div`
    font-size: 12px;
    color: #888;
    font-weight: 500;
`;

/* Total Summary Header */
export const TotalStatsHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(135deg, #3b5bdb 0%, #5c7cfa 100%);
    padding: 30px;
    border-radius: 16px;
    color: #fff;
    margin-bottom: 40px;
    box-shadow: 0 10px 20px rgba(59, 91, 219, 0.15);
`;

export const TotalStatItem = styled.div`
    text-align: center;
    flex: 1;
    position: relative;
    &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 20%;
        height: 60%;
        width: 1px;
        background: rgba(255, 255, 255, 0.2);
    }
`;

export const TotalStatValue = styled.div`
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 4px;
`;

export const TotalStatLabel = styled.div`
    font-size: 14px;
    font-weight: 500;
    opacity: 0.9;
`;

/* Episode Management Section */
export const EpisodeStatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 20px;
`;

export const EpisodeStatBox = styled.div<{ $bg?: string; $borderColor?: string }>`
    padding: 16px;
    background: ${({ $bg }) => $bg || '#f8faff'};
    border: 1px solid ${({ $borderColor }) => $borderColor || '#eef2ff'};
    border-radius: 12px;
    text-align: center;
`;

export const EpisodeStatValue = styled.div<{ $color?: string }>`
    font-size: 22px;
    font-weight: 800;
    color: ${({ $color }) => $color || '#3b5bdb'};
    margin-bottom: 4px;
`;

export const EpisodeStatLabel = styled.div`
    font-size: 13px;
    color: #666;
    font-weight: 600;
`;

export const AddWorkCard = styled.div`
    width: 179px;
    flex-shrink: 0;
    padding: 12px;
    background: #fcfcfc;
    border: 2px dashed #eee;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    color: #888;
    font-weight: 700;
    font-size: 14px;

    &:hover {
        background: #fff;
        border-color: #3b5bdb;
        color: #3b5bdb;
    }
`;

export const LastUpdateInfo = styled.div`
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid #f5f5f5;
    font-size: 13px;
    color: #888;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PaginationWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
    width: 100%;
`;

export const StatusSummaryRow = styled.div<{ $cols?: number }>`
    display: grid;
    grid-template-columns: ${({ $cols }) => ($cols ? `repeat(${$cols}, 1fr)` : 'repeat(4, 1fr)')};
    gap: 16px;
    margin-bottom: 24px;
`;

export const StatusSummaryItem = styled.div<{ $type?: string }>`
    padding: 16px;
    background: ${({ $type }) => ($type === 'DELETING' ? '#fff9f9' : '#f8faff')};
    border: 1px solid ${({ $type }) => ($type === 'DELETING' ? '#ffebeb' : '#eef2ff')};
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${({ $type }) => ($type === 'DELETING' ? '#ffcdd2' : '#dbe4ff')};
        background: ${({ $type }) => ($type === 'DELETING' ? '#fff0f0' : '#f0f4ff')};
    }
`;

export const StatusSummaryValue = styled.div<{ $type?: string }>`
    font-size: 22px;
    font-weight: 800;
    color: ${({ $type }) => ($type === 'DELETING' ? '#d32f2f' : '#3b5bdb')};
    margin-bottom: 4px;
`;

export const StatusSummaryLabel = styled.div`
    font-size: 13px;
    color: #666;
    font-weight: 600;
`;

export const SummaryCardsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 24px;
`;

/* Content Management Page Specific Styles */
export const PageHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
`;

export const PageDescription = styled.p`
    color: #666;
    font-size: 14px;
`;

export const SubHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const SectionTitleFlex = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const SectionTitleIcon = styled.div<{ $color?: string; $size?: string }>`
    display: flex;
    align-items: center;
    color: ${({ $color }) => $color || '#3b5bdb'};
    font-size: ${({ $size }) => $size || '20px'};
`;

export const SectionTitleLabel = styled.span`
    font-weight: 700;
    font-size: 15px;
    color: #333;
`;

export const PageSeparator = styled.hr`
    border: none;
    border-top: 1px solid #eee;
    margin: 10px 0 40px 0;
`;

export const CurrentWorkHeader = styled.div`
    margin-bottom: 20px;
`;

export const CurrentWorkTitleText = styled.span`
    font-size: 18px;
    font-weight: 800;
    color: #222;
`;

export const MetaFlexRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const MetaFieldRow = styled.div`
    display: flex;
    align-items: center;
    margin-top: 4px;
`;

export const MetaFieldLabel = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: #555;
`;

export const MetaFieldValue = styled.span`
    font-size: 13px;
    font-weight: 600;
`;


export const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`;

export const GenderBarContainer = styled.div`
    display: flex;
    height: 24px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
`;

export const GenderBarSegment = styled.div<{ $percent: number; $bg: string }>`
    width: ${({ $percent }) => $percent}%;
    background: ${({ $bg }) => $bg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
`;

export const ChartLegendRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`;

export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #666;
`;

export const LegendDot = styled.div<{ $bg: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $bg }) => $bg};
`;

export const ShortcutTitleGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

/* Episode Management Page Styles */
export const EpisodeHeaderSummary = styled.div`
    background: #fff;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const EpisodeHeaderInfo = styled.div`
    display: flex;
    width: 460px;
    gap: 8px;
`;

export const EpisodeHeaderTitle = styled.h2`
    font-size: 22px;
    font-weight: 800;
    color: #222;
    margin: 0;
`;

export const EpisodeHeaderSubTitle = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #222;
    margin: 0;
`

export const EpisodeHeaderMeta = styled.div`
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: #666;
    font-weight: 500;
`;

export const EpisodeHeaderStats = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 4px;
    cursor: default;
    user-select: none;
`;

export const EpisodeHeaderStatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
`;

export const EpisodeHeaderStatValue = styled.span`
    color: #3b5bdb;
    font-weight: 700;
`;

export const EpisodeHeaderStatLabel = styled.span`
    color: #888;
    font-weight: 500;
`;

export const FilterBarRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 16px;
`;

export const FilterButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
    padding: 4px 8px;
    background: none;
    border: none;
    color: ${({ $active }) => ($active ? "#69a3ff" : "#b4b4b4")};
    font-size: 14px;
    font-weight: ${({ $active }) => ($active ? "600" : "500")};
    transition: all 0.2s;
`;

export const SearchSortGroup = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

export const EpisodeSearchInput = styled.input`
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #eee;
    font-size: 14px;
    width: 200px;
    outline: none;
    transition: all 0.2s;

    &:focus {
        border-color: #3b5bdb;
        box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.1);
    }
`;


export const EpisodeTableContainer = styled.div`
    width: 100%;
    background: #fff;
    margin-bottom: 40px;
`;

export const EpisodeTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const EpisodeTh = styled.th<{ $align?: string }>`
    padding: 12px 15px;
    text-align: ${({ $align }) => $align || 'left'};
    font-weight: 600;
    color: #333;
    font-size: 13px;
    border-bottom: solid 1px #e5e5e5;
`;

export const EpisodeTd = styled.td<{ $align?: string; $bold?: boolean }>`
    padding: 13px 15px 12px 14px;
    font-size: 14px;
    line-height: 1.4;
    text-align: ${({ $align }) => $align || 'left'};
    font-weight: ${({ $bold }) => ($bold ? "600" : "400")};
    color: #444;
    border-bottom: solid 1px #f0f0f0;
    vertical-align: middle;
`;

export const EpisodeRow = styled.tr`
    transition: background 0.1s;
`;

export const EpisodeThumbnailMini = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #eee;
`;

export const EpisodeTitleColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const EpisodeTitleText = styled.span`
    font-weight: 700;
    color: #222;
    cursor: pointer;
`;

export const EpisodeDateText = styled.span`
    font-size: 12px;
    color: #999;
`;

export const EpisodeStatusTag = styled.span<{ $type: string }>`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    min-width: 70px;
    
    background: ${({ $type }) =>
        $type === 'PUBLISHED' ? '#e8f5e9' :
            $type === 'SCHEDULED' ? '#fff3e0' :
                $type === 'DRAFT' ? '#f5f5f5' : '#f5f5f5'};
    color: ${({ $type }) =>
        $type === 'PUBLISHED' ? '#2e7d32' :
            $type === 'SCHEDULED' ? '#ef6c00' :
                $type === 'DRAFT' ? '#757575' : '#757575'};
`;

export const EpisodePriceBadge = styled.span<{ $isPaid: boolean }>`
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid ${({ $isPaid }) => ($isPaid ? "#ffd43b" : "#eee")};
    background: ${({ $isPaid }) => ($isPaid ? "#fff9db" : "#fff")};
    color: ${({ $isPaid }) => ($isPaid ? "#f08c00" : "#888")};
`;

export const EpisodeActionWrap = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`;

export const EpisodeActionIconBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #fff;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #3b5bdb;
        color: #3b5bdb;
        background: #f0f4ff;
    }
`;

export const EpisodeStatsCell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 12px;
    color: #666;
`;

export const EpisodeStatRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100px;
`;

/* Revenue Dashboard Styles */
export const RevenueGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 24px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const FullWidthSection = styled.div`
    grid-column: 1 / -1;
`;

export const SummaryCard = styled.div`
    background: #fff;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 32px;
    color: #222;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
    position: relative;
    overflow: hidden;
`;

export const SummaryMainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SummaryLabel = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #868e96;
`;

export const SummaryValue = styled.h2`
    font-size: 32px;
    font-weight: 800;
    margin: 0;
`;

export const SummarySubInfo = styled.div`
    display: flex;
    gap: 40px;
    margin-top: 16px;
`;

export const SummarySubItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const SummarySubLabel = styled.span`
    font-size: 13px;
    color: #adb5bd;
    font-weight: 500;
`;

export const SummarySubValue = styled.span`
    font-size: 16px;
    font-weight: 700;
    color: #495057;
`;

export const StatusBadge = styled.span<{ $status: 'CALC' | 'CONFIRM' | 'DONE' }>`
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    background: ${({ $status }) =>
        $status === 'DONE' ? '#e7f5ff' :
            $status === 'CONFIRM' ? '#f0f4ff' : '#fff9db'};
    color: ${({ $status }) =>
        $status === 'DONE' ? '#1c7ed6' :
            $status === 'CONFIRM' ? '#3b5bdb' : '#f08c00'};
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const DashboardCard = styled.div`
    background: #fff;
    border: 1px solid #ebebeb;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const DashboardCardTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #222;
    margin: 0;
`;

export const BreakdownList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const BreakdownItem = styled.div<{ $isDeduction?: boolean, $isTotal?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ $isTotal }) => ($isTotal ? '16px 0 0 0' : '0')};
    border-top: ${({ $isTotal }) => ($isTotal ? '1.5px dashed #eee' : 'none')};
    
    span:first-child {
        font-size: 14px;
        color: #666;
        font-weight: ${({ $isTotal }) => ($isTotal ? '700' : '500')};
    }
    
    span:last-child {
        font-size: ${({ $isTotal }) => ($isTotal ? '18px' : '15px')};
        font-weight: 700;
        color: ${({ $isDeduction }) => ($isDeduction ? '#fa5252' : '#222')};
    }
`;

export const AnalyticsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-top: 24px;
`;

export const ChartWrapper = styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    svg {
        overflow: visible;
    }
`;

export const ChartTooltip = styled.div<{ $x: number; $y: number }>`
    position: absolute;
    left: ${props => props.$x}%;
    top: ${props => props.$y}px;
    transform: translate(-50%, -110%);
    background: rgba(33, 37, 41, 0.9);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    transition: opacity 0.15s ease-out;

    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: rgba(33, 37, 41, 0.9) transparent transparent transparent;
    }

    span:first-child {
        font-weight: 700;
        opacity: 0.8;
        font-size: 11px;
    }
    
    span:last-child {
        font-weight: 800;
        font-size: 13px;
        color: #fab005;
    }
`;

export const ConversionStats = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 20px;
`;

export const StatBox = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 0;

    span:first-child {
        font-size: 14px;
        color: #868e96;
        font-weight: 600;
        
        &::after {
            content: ':';
            margin-left: 2px;
        }
    }
    
    span:last-child {
        font-size: 18px;
        font-weight: 800;
        color: #222;
    }
`;

export const RevenueTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;

    th {
        text-align: left;
        padding: 12px;
        font-size: 13px;
        font-weight: 600;
        color: #868e96;
        border-bottom: 1px solid #f1f3f5;

        &:nth-child(2) {
            width: 134px;
            min-width: 134px;
            max-width: 134px;
        }
    }

    td {
        padding: 16px 12px;
        font-size: 14px;
        color: #495057;
        border-bottom: 1px solid #f1f3f5;

        &:nth-child(2) {
            width: 134px;
            min-width: 134px;
            max-width: 134px;
        }
    }
`;

export const HistoryTable = styled.table`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 40px;
`;

export const HistoryCol = styled.col<{ $width?: string }>`
    width: ${props => props.$width || 'auto'};
`;

export const HistoryThead = styled.thead`
`;

export const HistoryTr = styled.tr`
    border-bottom: solid 1px #e5e5e5;
    font-size: 13px;
`;

export const HistoryTh = styled.th<{ $align?: string }>`
    padding: 12px 15px;
    font-weight: 600;
    color: #222;
    text-align: ${props => props.$align || 'center'};
`;

export const HistoryTbody = styled.tbody`
`;

export const HistoryTd = styled.td<{ $align?: string; $isAmount?: boolean }>`
    padding: 15px;
    font-size: 14px;
    color: ${props => props.$isAmount ? '#69a3ff' : '#444'};
    font-weight: ${props => props.$isAmount ? '600' : '400'};
    text-align: ${props => props.$align || 'center'};
`;

export const HistoryListSection = styled.div`
    width: 100%;
    margin-top: 24px;
`;

export const HistoryDetailTr = styled.tr`
    background: none;
    border-bottom: solid 1px #e6e6e6;
`;

export const HistoryDetailTd = styled.td`
    padding: 24px 40px;
    font-size: 13px;
    line-height: 1.6;
    color: #444;
`;

export const HistoryDetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 40px;
`;

export const HistoryDetailLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const HistoryDetailRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-end;
    padding-top: 4px;
`;

export const HistoryDetailHeaderLabel = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: #adb5bd;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const HistoryDetailContent = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    margin-bottom: 6px;
    
    span:first-child {
        color: #868e96;
        font-size: 13px;
    }
    
    span:last-child {
        font-weight: 600;
        color: #222;
        font-size: 13px;
    }
`;

export const HistoryDetailDivider = styled.div`
    border-top: 1px solid #f1f3f5;
    margin: 12px 0 8px 0;
    max-width: 320px;
`;

export const DownloadBtn = styled.button`
    display: inline-flex;
    align-items: center;
    padding: 10px 18px;
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #495057;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);

    &:hover {
        background: #f8f9fa;
        border-color: #adb5bd;
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

export const AccountInfoCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: #f1f3f5;
    border-radius: 10px;
    margin-top: 16px;
`;

export const BankInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    span:first-child {
        font-size: 12px;
        color: #868e96;
        font-weight: 600;
    }
    
    span:last-child {
        font-size: 14px;
        font-weight: 600;
        color: #495057;
    }
`;
/* Content Detail Page Styles */
export const DetailContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 40px;
`;

export const DetailHero = styled.div`
    display: flex;
    gap: 32px;
    margin-bottom: 24px;
    background: #fff;
    padding: 24px 0;
    border-radius: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 24px;
        padding: 20px 0;
    }
`;

export const DetailCover = styled.img`
    width: 180px;
    height: 255px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    flex-shrink: 0;
`;

export const DetailInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const DetailHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
`;

export const DetailTitle = styled.h1`
    font-size: 26px;
    font-weight: 800;
    color: #222;
    margin: 0;
    line-height: 1.2;
`;

export const DetailMetaList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin: 20px 0;
`;

export const DetailMetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #444;
`;

export const DetailMetaLabel = styled.span`
    width: 65px;
    font-weight: 700;
    color: #999;
`;

export const DetailMetaValue = styled.span`
    font-weight: 600;
`;

export const DetailHeroActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    padding-top: 16px;
`;

export const DetailActionLink = styled.button`
    background: none;
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: 700;
    color: #5c7cfa;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;

    &:not(:last-child)::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: 12px;
        background: #dee2e6;
        margin-left: 16px;
        cursor: default;
    }
`;

export const DetailSection = styled.div`
    background: #fff;
    padding: 20px 0;
    margin-bottom: 16px;
`;

export const DetailSectionTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #222;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const DetailDescription = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    white-space: pre-wrap;
    margin: 0;
`;

export const DetailKeywordList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
`;

export const DetailKeyword = styled.span`
    background: #f1f3f5;
    color: #495057;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
`;

export const DetailActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 32px;
`;

export const DetailButton = styled.button<{ $primary?: boolean }>`
    min-width: 140px;
    height: 48px;
    padding: 0 20px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    
    border: ${({ $primary }) => $primary ? 'none' : '1px solid #dee2e6'};
    background: ${({ $primary }) => $primary ? 'linear-gradient(135deg, #3b5bdb 0%, #5c7cfa 100%)' : '#fff'};
    color: ${({ $primary }) => $primary ? '#fff' : '#495057'};
`;

/* Episode Detail Page Styles */
export const EpisodeDetailHeader = styled(DetailHero)`
    padding: 24px 0;
`;

export const EpisodeViewerBox = styled.div`
    background: #fff;
    padding: 24px 0;
    margin-bottom: 20px;
    min-height: 400px;
`;

export const WebnovelEpisodeContent = styled.div`
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    white-space: pre-wrap;
    max-width: 850px;
    margin: 0 auto;
`;

export const WebtoonEpisodeContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    max-width: 720px;
    padding: 0 4%;
    margin: 0 auto;
`;

export const WebtoonDetailImage = styled.img`
    width: 100%;
    max-width: 800px;
    height: auto;
    display: block;
`;

