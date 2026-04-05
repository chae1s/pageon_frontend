import React, { useEffect, useState } from "react";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import * as H from "./Home.styles"
import { SimpleContent, RankingContent } from "../../types/Content";
import RankingContentList from "../../components/Contents/RankingContentList";
import ThumbnailContentList from "../../components/Contents/ThumbnailContentList";
import api from "../../api/axiosInstance";
import webtoonBanner from "../../assets/webtoon_banner.png";
import webnovelBanner from "../../assets/webnovel_banner.png";

function Home() {

    const [masterpieceContents, setMasterpieceContents] = useState<SimpleContent[]>([]);

    const [webnovelKeywordContents, setWebnovelKeywordContents] = useState<SimpleContent[]>([]);
    const [webnovelKeywordName, setWebnovelKeywordName] = useState<string>("");

    const [webtoonKeywordContents, setWebtoonKeywordContents] = useState<SimpleContent[]>([]);
    const [webtoonKeywordName, setWebtoonKeywordName] = useState<string>("");
    const [rankingContents, setRankingContents] = useState<RankingContent[]>([]);
    const [currentBanner, setCurrentBanner] = useState(0); // 0: webtoon, 1: webnovel
    const banners = [webtoonBanner, webnovelBanner];

    // 배너 자동 전환
    useEffect(() => {
        const bannerInterval = setInterval(() => {
            setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
        }, 20000);
        return () => clearInterval(bannerInterval);
    }, []);

    // 정주행 랭킹 데이터 조회
    useEffect(() => {
        const fetchMasterpiece = async () => {
            try {
                const res = await api.get('/all/completed');
                setMasterpieceContents(res.data);
            } catch (error) {
                console.error("정주행 랭킹 데이터 조회 실패: ", error);
            }
        };
        fetchMasterpiece();
    }, []);

    // 웹소설 키워드 추천 데이터 조회
    useEffect(() => {
        const fetchWebnovelKeyword = async () => {
            try {
                const res = await api.get('/webnovels/keyword');
                setWebnovelKeywordName(res.data.keyword);
                setWebnovelKeywordContents(res.data.contents.content);
            } catch (error) {
                console.error("웹소설 키워드 데이터 조회 실패: ", error);
            }
        };
        fetchWebnovelKeyword();
    }, []);

    // 웹툰 키워드 추천 데이터 조회
    useEffect(() => {
        const fetchWebtoonKeyword = async () => {
            try {
                const res = await api.get('/webtoons/keyword');
                setWebtoonKeywordName(res.data.keyword);
                setWebtoonKeywordContents(res.data.contents.content);
            } catch (error) {
                console.error("웹툰 키워드 데이터 조회 실패: ", error);
            }
        };
        fetchWebtoonKeyword();
    }, []);

    // 실시간 랭킹 데이터 조회
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res = await api.get('/all/hourly-ranking');
                setRankingContents(res.data);
            } catch (error) {
                console.error("실시간 랭킹 데이터 조회 실패: ", error);
            }
        };
        fetchRanking();
    }, []);

    return (
        <MainContainer>
            <NoSidebarMain>
                <H.HomeBanner>
                    <H.BannerSlider $currentIndex={currentBanner}>
                        {banners.map((banner, index) => (
                            <H.BannerImage
                                key={index}
                                src={banner}
                                alt={`메인 배너 ${index + 1}`}
                            />
                        ))}
                    </H.BannerSlider>
                </H.HomeBanner>
                <H.SectionBookList>
                    <H.SectionBookListTitle>실시간 랭킹</H.SectionBookListTitle>
                    <RankingContentList contents={rankingContents} layout="slider" />
                </H.SectionBookList>
                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>추천 {webnovelKeywordName} 웹소설</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={`/search/keyword?contentType=webnovels&keyword=${webnovelKeywordName}`}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <ThumbnailContentList contents={webnovelKeywordContents} />
                </H.SectionBookList>
                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>추천 {webtoonKeywordName} 웹툰</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={`/search/keyword?contentType=webtoons&keyword=${webtoonKeywordName}`}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <ThumbnailContentList contents={webtoonKeywordContents} />
                </H.SectionBookList>
                <H.SectionBookList>
                    <H.SectionBookTitleWrapper>
                        <H.SectionBookListTitle>정주행 랭킹</H.SectionBookListTitle>
                        <H.SectionBookListMoreViewLink to={"/contents/masterpiece"}>더보기</H.SectionBookListMoreViewLink>
                    </H.SectionBookTitleWrapper>
                    <ThumbnailContentList contents={masterpieceContents} />
                </H.SectionBookList>
            </NoSidebarMain>
        </MainContainer>

    )
}

export default Home;