import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as H from "./Home.styles";
import { SimpleContent, RankingContent } from "../../types/Content";
import ThumbnailContentList from "../../components/Contents/ThumbnailContentList";
import RankingContentList from "../../components/Contents/RankingContentList";
import api from "../../api/axiosInstance";

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

    useEffect(() => {
        async function fetchData() {
            try {
                const [dailyRes, newRes, masterpieceRes, keywordRes, rankingRes] = await Promise.all([
                    api.get(`/${contentTypePath}/daily/${initialDayEng}`),
                    api.get(`/${contentTypePath}/new`),
                    api.get(`/${contentTypePath}/completed`),
                    api.get(`/${contentTypePath}/keyword`),
                    api.get(`/${contentTypePath}/hourly-ranking`)
                ]);

                setDailyContents(dailyRes.data);
                setNewContents(newRes.data);
                setMasterpieceContents(masterpieceRes.data);
                setKeywordName(keywordRes.data.keyword);
                setKeywordContents(keywordRes.data.contents.content);
                setRankingContents(rankingRes.data);
            } catch (error) {
                console.error(`${contentLabel} 데이터 조회 실패: `, error);
            }
        }

        fetchData();
        // contentTypePath가 변경될 때마다 데이터를 다시 불러옵니다.
        setActiveDay(initialDay);
    }, [contentTypePath, initialDayEng, contentLabel]);

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
                    <div className="banner-text">
                        <h1>
                            인기 웹툰과 웹소설을<br />한 곳에서 즐기세요
                        </h1>
                        <p>
                            최신 인기작부터 다양한 장르의 작품까지<br />
                            지금 바로 감상해보세요!
                        </p>
                        <div className="banner-btns">
                            <button className="go-webtoon-btn">웹툰 보러가기</button>
                            <button className="go-webnovel-btn">웹소설 보러가기</button>
                        </div>
                    </div>
                    <div className="banner-image">
                        <img
                            src="https://cdn.ridicdn.net/cover/1/cover13/2023/12/cover_1000000001_1701400000.jpg"
                            alt="메인 배너"
                        />
                    </div>
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
