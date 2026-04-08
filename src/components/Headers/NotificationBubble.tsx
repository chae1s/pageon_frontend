import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface NotificationBubbleProps {
    message: string;
    link?: string | null;
    onClose: (e: React.MouseEvent) => void;
}

const BubbleWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;

const BubbleContent = styled.div<{ $isLink: boolean }>`
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 12px 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    min-width: 280px;
    max-width: 500px;
    color: #333;
    font-size: 14px;
    line-height: 1.5;
    cursor: ${props => props.$isLink ? 'pointer' : 'default'};
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$isLink ? '#f9f9f9' : '#fff'};
    }
`;

const MessageText = styled.span`
    display: block;
    word-break: break-all;
    white-space: normal;
`;

const Arrow = styled.div`
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: -5px;
    width: 10px;
    height: 10px;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    transform: rotate(45deg);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #999;
    padding: 0 4px;
    line-height: 1;

    &:hover {
        color: #666;
    }
`;

const NotificationBubble = ({ message, link, onClose }: NotificationBubbleProps) => {
    const navigate = useNavigate();

    const handleContentClick = (e: React.MouseEvent) => {
        if (link) {
            e.preventDefault();
            e.stopPropagation();
            navigate(link);
            onClose(e);
        }
    };

    return (
        <BubbleWrapper>
            <BubbleContent $isLink={!!link} onClick={handleContentClick}>
                <Arrow />
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <MessageText>{message}</MessageText>
            </BubbleContent>
        </BubbleWrapper>
    );
};

export default NotificationBubble;
