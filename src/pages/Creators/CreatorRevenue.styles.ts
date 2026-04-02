import styled from "styled-components";

export const CreatorTitle = styled.h2`
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 24px;
`;

export const RevenueContainer = styled.div`
    max-width: 800px;
    margin: 32px auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

export const PageSeparator = styled.hr`
    border: none;
    border-top: 1px solid #eee;
    margin: 8px 0;
`;

export const DashboardCard = styled.div`
    background: #fff;
    border: 1px solid #eee;
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

export const CardTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #222;
    margin: 0;
`;

export const CurrentAccountBox = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #f1f3f5;
`;

export const BankLogo = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #4c6ef5;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    flex-shrink: 0;
`;

export const AccountInfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
`;

export const AccountNumberText = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #222;
    letter-spacing: 0.5px;
`;

export const SmallInfoLabel = styled.span`
    font-size: 13px;
    color: #868e96;
    font-weight: 500;
`;

export const VerifiedBadge = styled.span`
    padding: 4px 8px;
    background: #e7f5ff;
    color: #1c7ed6;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    margin-left: 8px;
`;

export const InputGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const LabelText = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #495057;
`;

export const StyledInput = styled.input`
    height: 48px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 14px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #4c6ef5;
        box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.1);
    }
    
    &:disabled {
        background: #f1f3f5;
        cursor: not-allowed;
    }
`;

export const StyledSelect = styled.select`
    height: 48px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 0 16px;
    font-size: 14px;
    background: #fff;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #4c6ef5;
    }
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    gap: 12px;
`;

export const MainButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.2s;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b5bdb 0%, #5c7cfa 100%);
    color: #fff;
    cursor: pointer;
}
    
    background: ${({ $variant }) => ($variant === 'secondary' ? '#f1f3f5' : '#4c6ef5')};
    color: ${({ $variant }) => ($variant === 'secondary' ? '#495057' : '#fff')};
    
    &:hover {
        background: ${({ $variant }) => ($variant === 'secondary' ? '#e9ecef' : '#364fc7')};
    }
    
    &:disabled {
        background: #adb5bd;
    }
`;

export const FileUploadBox = styled.label`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: 1px dashed #dee2e6;
    border-radius: 8px;
    background: #f8f9fa;
    cursor: pointer;
    font-size: 14px;
    color: #868e96;
    transition: all 0.2s;

    &:hover {
        border-color: #4c6ef5;
        background: #f1f3f5;
    }
`;

export const NoticeBox = styled.div`
    background: #fff9db;
    border: 1px solid #fcf2bd;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    gap: 16px;
`;

export const NoticeIcon = styled.div`
    color: #f08c00;
    font-size: 20px;
    flex-shrink: 0;
`;

export const NoticeContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    h4 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        color: #826a1b;
    }
    
    ul {
        margin: 0;
        padding-left: 20px;
        list-style-type: disc;
    }
    
    li {
        font-size: 13px;
        color: #857022;
        line-height: 1.6;
    }
`;

export const AuditLogList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const AuditLogItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f3f5;
    font-size: 13px;
    
    span:first-child {
        color: #495057;
        font-weight: 500;
    }
    
    span:last-child {
        color: #adb5bd;
    }
`;

export const TypeToggleRow = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    background: #f1f3f5;
    padding: 4px;
    border-radius: 8px;
    width: fit-content;
`;

export const TypeToggleButton = styled.button<{ $active: boolean }>`
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
    color: ${({ $active }) => ($active ? '#4c6ef5' : '#868e96')};
    box-shadow: ${({ $active }) => ($active ? '0 2px 4px rgba(0,0,0,0.05)' : 'none')};
    
    &:hover {
        color: ${({ $active }) => ($active ? '#4c6ef5' : '#495057')};
    }
`;

export const TossBranding = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #f1f3f5;
    opacity: 0.6;
    
    span {
        font-size: 13px;
        color: #868e96;
    }
    
    img {
        height: 14px;
        filter: grayscale(100%);
    }
`;