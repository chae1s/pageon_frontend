import { styled } from "styled-components";

export const AdminMainContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2em;
    min-height: 100vh;
`;

export const AdminPageTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
`;

export const FilterWrapper = styled.div`
    display: block;
`;

export const FilterList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

export const MonthTabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    color: #444;
    font-size: 0.98rem;
    padding: 10px 0 10px 8px;
`;

export const RightSelectSort = styled.div`
    display: flex;
    align-items: center;
`;

export const SettlementList = styled.div`
    width: 100%;
    margin: 0 0 80px;
`;

export const SettlementTable = styled.table`
    width: 100%;
    margin-bottom: 40px;
    border-collapse: collapse;
`;

export const SettlementColId = styled.col`
    width: 60px;
    text-align: center;
`;

export const SettlementColEmail = styled.col`
    width: auto;
`;

export const SettlementColAmount = styled.col`
    width: 150px;
    text-align: right;
`;

export const SettlementColStatus = styled.col`
    width: 120px;
    text-align: center;
`;

export const SettlementColScheduleDate = styled.col`
    width: 150px;
    text-align: center;
`;

export const SettlementColDate = styled.col`
    width: 150px;
    text-align: center;
`;

export const SettlementTableHead = styled.thead``;

export const SettlementTheadTr = styled.tr`
    border-bottom: solid 1px #e5e5e5;
    font-size: 14px;
    cursor: default;
`;

export const SettlementTh = styled.th`
    padding: 12px 15px;
    text-align: center;
    font-weight: 600;
    color: #333;
    
    &:nth-child(2) {
        text-align: left;
    }
    &:nth-child(3) {
        text-align: right;
    }
`;

export const SettlementTableBody = styled.tbody`
    cursor: default;
`;

export const SettlementTbodyTr = styled.tr`
    border-bottom: solid 1px #e6e6e6;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #fafafa;
    }
`;

export const SettlementTdId = styled.td`
    padding: 13px 15px;
    font-size: 14px;
    color: #888;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
`;

export const SettlementTdEmail = styled.td`
    padding: 13px 15px;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
`;

export const SettlementTdAmount = styled.td`
    padding: 13px 15px;
    font-size: 14px;
    text-align: right;
    cursor: pointer;
`;

export const SettlementTdStatus = styled.td<{ $status: string }>`
    padding: 13px 15px;
    font-size: 14px;
    text-align: center;
    color: ${({ $status }) => ($status === 'FAILED' ? '#FC5858' : 'inherit')};
    cursor: pointer;
`;

export const SettlementTdDate = styled.td`
    padding: 13px 15px;
    font-size: 14px;
    text-align: center;
    color: #666;
    cursor: pointer;
`;

export const SettlementDetailTr = styled.tr`
    border-bottom: solid 1px #e6e6e6;
`;

export const SettlementDetailTd = styled.td`
    padding: 20px 25px;
    font-size: 14px;
    line-height: 1.6;
    color: #555;
`;

export const SettlementDetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
`;

export const SettlementDetailItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed #e0e0e0;
    
    span:first-child {
        font-weight: 600;
        color: #777;
    }
    
    span:last-child {
        font-weight: 700;
        color: #333;
    }
`;

export const IssueSection = styled.div`
    margin-top: 16px;
    padding: 16px;
    background-color: #fff3f3;
    border: 1px solid #ffcaca;
    border-radius: 8px;
`;

export const IssueTitle = styled.div`
    font-weight: 700;
    color: #e74c3c;
    margin-bottom: 8px;
`;

export const RetryButton = styled.button`
    padding: 8px 16px;
    background-color: #528efa;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 12px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #3b76e0;
    }
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

// --- Deletion Request Specific Styles ---

export const DeletionColId = styled.col`
    width: 60px;
    text-align: center;
`;

export const DeletionColTitle = styled.col`
    width: auto;
    text-align: left;
`;

export const DeletionColAuthor = styled.col`
    width: 200px;
    text-align: center;
`;

export const DeletionColStatus = styled.col`
    width: 120px;
    text-align: center;
`;

export const DeletionColRequestDate = styled.col`
    width: 150px;
    text-align: center;
`;

export const DeletionColProcessDate = styled.col`
    width: 150px;
    text-align: center;
`;

export const DeletionTdTitle = styled.td`
    padding: 13px 15px;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    font-weight: 500;
`;

export const DeletionTh = styled.th`
    padding: 12px 15px;
    text-align: center;
    font-weight: 600;
    color: #333;
    
    &:nth-child(2) {
        text-align: left;
    }
`;

export const DeletionActionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 16px;
`;

export const DangerButton = styled.button`
    padding: 8px 16px;
    background-color: #FC5858;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e54c4c;
    }
`;

export const RejectButton = styled.button`
    padding: 8px 16px;
    background-color: #f1f3f5;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #e9ecef;
        color: #212529;
    }
`;

