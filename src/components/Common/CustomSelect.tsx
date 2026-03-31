import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdExpandMore } from "react-icons/md";

const ExpandMoreIcon = MdExpandMore as any;

interface Option {
    label: string;
    value: any;
}

interface CustomSelectProps {
    options: Option[];
    value: any;
    onChange: (value: any) => void;
    width?: string;
    placeholder?: string;
}

const SelectWrapper = styled.div<{ $width?: string }>`
    position: relative;
    width: ${({ $width }) => $width || "140px"};
    user-select: none;
`;

const SelectTrigger = styled.div<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #fff;
    border: 1px solid ${({ $isOpen }) => ($isOpen ? "#3b5bdb" : "#d1d5db")};
    border-radius: 6px;
    font-size: 14px;
    color: #444;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: #3b5bdb;
    }
`;

const SelectOptions = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow: hidden;
`;

const SelectOption = styled.div<{ $active: boolean }>`
    padding: 10px 12px;
    font-size: 14px;
    color: ${({ $active }) => ($active ? "#3b5bdb" : "#444")};
    background: #fff;
    font-weight: ${({ $active }) => ($active ? "600" : "400")};
    cursor: pointer;

    &:hover {
        background: #f8f9fa;
    }
`;

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    width,
    placeholder = "선택"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <SelectWrapper ref={containerRef} $width={width}>
            <SelectTrigger $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.label : placeholder}
                <ExpandMoreIcon
                    style={{
                        transition: "transform 0.2s",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        color: "#888"
                    }}
                />
            </SelectTrigger>
            {isOpen && (
                <SelectOptions>
                    {options.map((opt) => (
                        <SelectOption
                            key={opt.value}
                            $active={value === opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </SelectOption>
                    ))}
                </SelectOptions>
            )}
        </SelectWrapper>
    );
};

export default CustomSelect;
