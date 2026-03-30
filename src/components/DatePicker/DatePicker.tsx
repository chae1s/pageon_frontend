import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import * as S from "./DatePicker.styles";

const CalendarIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const ChevronLeftIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const ChevronRightIcon = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    placeholder?: string;
    disabledDate?: (date: dayjs.Dayjs) => boolean;
    disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = "날짜를 선택해 주세요", disabledDate, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(dayjs(value || undefined));
    const containerRef = useRef<HTMLDivElement>(null);

    // 캘린더 외부 영역 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 특정 월의 날짜 배열 생성
    const generateCalendar = () => {
        const startOfMonth = currentMonth.startOf("month");
        const endOfMonth = currentMonth.endOf("month");
        const startDate = startOfMonth.startOf("week"); // 포함된 이전 달력 일수
        const endDate = endOfMonth.endOf("week"); // 포함된 다음 달력 일수

        const calendar = [];
        let day = startDate;
        while (day.isBefore(endDate)) {
            calendar.push(day);
            day = day.add(1, "day");
        }
        return calendar;
    };

    const handlePrevMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentMonth(currentMonth.subtract(1, "month"));
    };

    const handleNextMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentMonth(currentMonth.add(1, "month"));
    };

    const handleDateSelect = (date: dayjs.Dayjs) => {
        onChange(date.format("YYYY-MM-DD"));
        setIsOpen(false);
    };

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const calendarDays = generateCalendar();
    
    const displayValue = value ? dayjs(value).format("YYYY년 M월 D일") : placeholder;

    return (
        <S.Container ref={containerRef}>
            <S.DateInputWrap $isOpen={isOpen} $disabled={disabled} onClick={() => !disabled && setIsOpen(!isOpen)}>
                <S.DateText $hasValue={!!value}>{displayValue}</S.DateText>
                <S.IconWrap>
                    <CalendarIcon />
                </S.IconWrap>
            </S.DateInputWrap>

            {isOpen && (
                <S.CalendarPopup onClick={(e) => e.stopPropagation()}>
                    <S.CalendarHeader>
                        <S.NavButton onClick={handlePrevMonth} type="button">
                            <ChevronLeftIcon />
                        </S.NavButton>
                        <S.MonthYearText>
                            {currentMonth.format("YYYY년 M월")}
                        </S.MonthYearText>
                        <S.NavButton onClick={handleNextMonth} type="button">
                            <ChevronRightIcon />
                        </S.NavButton>
                    </S.CalendarHeader>

                    <S.DaysGrid>
                        {daysOfWeek.map((day) => (
                            <S.DayName key={day}>{day}</S.DayName>
                        ))}
                        {calendarDays.map((day, idx) => {
                            const isCurrentMonth = day.isSame(currentMonth, "month");
                            const isSelected = value ? day.isSame(dayjs(value), "day") : false;
                            const isToday = day.isSame(dayjs(), "day");
                            const isDisabled = disabledDate ? disabledDate(day) : false;

                            return (
                                <S.DayCell
                                    key={idx}
                                    type="button"
                                    disabled={isDisabled}
                                    $isCurrentMonth={isCurrentMonth}
                                    $isSelected={isSelected}
                                    $isToday={isToday}
                                    onClick={() => !isDisabled && handleDateSelect(day)}
                                >
                                    {day.format("D")}
                                </S.DayCell>
                            );
                        })}
                    </S.DaysGrid>
                </S.CalendarPopup>
            )}
        </S.Container>
    );
};

export default DatePicker;
