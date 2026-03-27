import styled from "styled-components";

export const CreatorTitle = styled.h2`
    font-size: 1.3rem;
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
    margin-bottom: 12px;
`;

export const ContentKeywordWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
`;

export const ContentKeywordItem = styled.span`
    font-size: 14px;
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

export const ContentStatus = styled.span<{ $status?: string }>`
    color: ${({ $status }) => ($status === 'DELETING' ? '#FC5858' : 'inherit')};
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
    border-radius: 8px;
    background: #eef2ff;
    color: #3b5bdb;
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
`

/* Delete Content Request Styles */
export const DeleteInfoBox = styled.div`
    padding: 10px 0;
    margin-bottom: 30px;
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
    padding: 16px 20px;
    background-color: #fff9f9;
    border: 1px solid #ffebeb;
    border-radius: 8px;
    margin-bottom: 30px;
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
    width: 100%;
    margin-bottom: 40px;
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

