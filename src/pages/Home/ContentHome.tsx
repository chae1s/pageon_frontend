import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as H from "./Home.styles";
import { SimpleContent, RankingContent } from "../../types/Content";
import ThumbnailContentList from "../../components/Contents/ThumbnailContentList";
import RankingContentList from "../../components/Contents/RankingContentList";
import api from "../../api/axiosInstance";
import webtoonBanner from "../../assets/webtoon_banner.png";
import webnovelBanner from "../../assets/webnovel_banner.png";

function ContentHome() {
    const location = useLocation();
    const isWebtoon = location.pathname.includes("webtoons");
    const contentTypePath = isWebtoon ? "webtoons" : "webnovels";
    const contentLabel = isWebtoon ? "웹툰" : "웹소설";

    const [dailyContents, setDailyContents] = useState<SimpleContent[]>([]);
    const [newContents, setNewContents] = useState<SimpleContent[]>([]);
    const [masterpieceContents, setMasterpieceContents] = useState<SimpleContent[]>([]);
    const [keywordContents, setKeywordContents] = useState<SimpleContent[]>([]);
    const [keywordName, setKeywordName] = useState<string>("");
    const [rankingContents, setRankingContents] = useState<RankingContent[]>([]);

    const todayIndex = new Date().getDay();
    const dayOfWeekNames = ["월", "화", "수", "목", "금", "토", "일"];
    const dayOfWeekNamesEng = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

    const initialDay = todayIndex === 0 ? "일" : dayOfWeekNames[todayIndex - 1];
    const initialDayEng = todayIndex === 0 ? "SUNDAY" : dayOfWeekNamesEng[todayIndex - 1];

    const [activeDay, setActiveDay] = useState<string>(initialDay);

    // 요일별 데이터 조회
    useEffect(() => {
        const fetchDaily = async () => {
            try {
                const res = await api.get(`/${contentTypePath}/daily/${initialDayEng}`);
                setDailyContents(res.data);
            } catch (error) {
                console.error(`${contentLabel} 요일별 데이터 조회 실패: `, error);
            }
        };
        fetchDaily();
        setActiveDay(initialDay);
    }, [contentTypePath, initialDayEng, contentLabel, initialDay]);

    // 신작 데이터 조회
    useEffect(() => {
        const fetchNew = async () => {
            try {
                const res = await api.get(`/${contentTypePath}/new`);
                setNewContents(res.data);
            } catch (error) {
                console.error(`${contentLabel} 신작 데이터 조회 실패: `, error);
            }
        };
        fetchNew();
    }, [contentTypePath, contentLabel]);

    // 정주행 명작 데이터 조회
    useEffect(() => {
        const fetchMasterpiece = async () => {
            try {
                const res = await api.get(`/${contentTypePath}/completed`);
                setMasterpieceContents(res.data);
            } catch (error) {
                console.error(`${contentLabel} 명작 데이터 조회 실패: `, error);
            }
        };
        fetchMasterpiece();
    }, [contentTypePath, contentLabel]);

    // 키워드 추천 데이터 조회
    useEffect(() => {
        const fetchKeyword = async () => {
            try {
                const res = await api.get(`/${contentTypePath}/keyword`);
                setKeywordName(res.data.keyword);
                setKeywordContents(res.data.contents.content);
            } catch (error) {
                console.error(`${contentLabel} 키워드 데이터 조회 실패: `, error);
            }
        };
        fetchKeyword();
    }, [contentTypePath, contentLabel]);

    // 실시간 랭킹 데이터 조회
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res = await api.get(`/${contentTypePath}/hourly-ranking`);
                setRankingContents(res.data);
            } catch (error) {
                console.error(`${contentLabel} 실시간 랭킹 데이터 조회 실패: `, error);
            }
        };
        fetchRanking();
    }, [contentTypePath, contentLabel]);

    const handleDayClick = async (dayIndex: number) => {
        const dayName = dayOfWeekNames[dayIndex];
        setActiveDay(dayName);
        const day = dayOfWeekNamesEng[dayIndex];
        setDailyContents([]);

        try {
            const response = await api.get(`/${contentTypePath}/daily/${day}`);
            setDailyContents(response.data);
        } catch (error) {
            console.error(`${contentLabel} 요일별 데이터 조회 실패: `, error);
        }
    };

    return (
        <MainContainer>
            <NoSidebarMain>
                <H.HomeBanner>
                    <img
                        key={isWebtoon ? "webtoon" : "webnovel"}
                        src={isWebtoon ? webtoonBanner : webnovelBanner}
                        alt="메인 배너"
                    />
                </H.HomeBanner>

                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>요일별 {contentLabel}</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={"#"}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <H.WeeklyTabsWrapper>
                        <H.WeeklyTabs>
                            {dayOfWeekNames.map((dayName, dayIndex) => (
                                <H.WeeklyTabsBtn
                                    key={dayName}
                                    $isActive={activeDay === dayName}
                                    onClick={() => handleDayClick(dayIndex)}
                                >
                                    {dayName}
                                </H.WeeklyTabsBtn>
                            ))}
                        </H.WeeklyTabs>
                    </H.WeeklyTabsWrapper>
                    <ThumbnailContentList contents={dailyContents} key={`${contentTypePath}-${activeDay}`} />
                </H.SectionBookList>

                <H.SectionBookList>
                    <H.SectionBookListTitle>{contentLabel} 실시간 랭킹</H.SectionBookListTitle>
                    <RankingContentList contents={rankingContents} layout="grid" />
                </H.SectionBookList>

                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>추천 {keywordName} {contentLabel}</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={`/search/keyword?contentType=${contentTypePath}&keyword=${keywordName}`}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <ThumbnailContentList contents={keywordContents} />
                </H.SectionBookList>

                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>{contentLabel} 신작</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={`/${contentTypePath}/new`}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <ThumbnailContentList contents={newContents} />
                </H.SectionBookList>

                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>정주행 필수 명작</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={`/${contentTypePath}/masterpiece`}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <ThumbnailContentList contents={masterpieceContents} />
                </H.SectionBookList>
            </NoSidebarMain>
        </MainContainer>
    );
}

export default ContentHome;
