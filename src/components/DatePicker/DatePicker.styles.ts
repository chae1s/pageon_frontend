import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
`;

export const DateInputWrap = styled.div<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 42px;
    border: 1px solid ${({ $isOpen }) => ($isOpen ? "#69a3ff" : "#ccc")};
    border-radius: 4px;
    padding: 0 12px;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
        border-color: #69a3ff;
    }
`;

export const DateText = styled.span<{ $hasValue: boolean }>`
    font-size: 14px;
    color: ${({ $hasValue }) => ($hasValue ? "#333" : "#aaa")};
`;

export const IconWrap = styled.div`
    color: #666;
    display: flex;
    align-items: center;
    font-size: 18px;
`;

export const CalendarPopup = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 320px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    border: 1px solid #ebebeb;
    padding: 20px;
    z-index: 100;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const MonthYearText = styled.h4`
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #222;
`;

export const NavButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    transition: background 0.2s;

    &:hover {
        background: #f4f4f4;
        color: #222;
    }
`;

export const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px 4px;
`;

export const DayName = styled.div`
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #888;
    padding-bottom: 10px;
`;

export const DayCell = styled.button<{ 
    $isToday?: boolean; 
    $isSelected?: boolean; 
    $isCurrentMonth: boolean 
}>`
    background: ${({ $isSelected }) => ($isSelected ? "#528efa" : "transparent")};
    color: ${({ $isSelected, $isCurrentMonth }) => 
        $isSelected ? "#fff" : 
        $isCurrentMonth ? "#333" : "#ddd"};
    border: none;
    border-radius: 6px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: ${({ $isSelected, $isToday }) => ($isSelected || $isToday ? "700" : "500")};
    cursor: pointer;
    transition: all 0.2s;

    ${({ $isToday, $isSelected }) => $isToday && !$isSelected && `
        border: 1px solid #528efa;
        color: #528efa;
    `}

    &:disabled {
        cursor: default;
        color: #d1d5db;
    }

    &:hover:not(:disabled) {
        background: ${({ $isSelected }) => ($isSelected ? "#3a71d7" : "#eef5ff")};
        color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#528efa")};
    }
`;
