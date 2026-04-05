import React, {useEffect, useState} from "react";
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

    useEffect(() => {
        async function fetchData() {
            try {
                const [masterpieceRes, webnovelKeywordRes, webtoonKeywordRes, rankingRes] = await Promise.all([
                    api.get('/all/completed'), 
                    api.get('/webnovels/keyword'), 
                    api.get('/webtoons/keyword'), 
                    api.get('/all/hourly-ranking')

                ]);
                
                setMasterpieceContents(masterpieceRes.data);

                setWebnovelKeywordName(webnovelKeywordRes.data.keyword);
                setWebnovelKeywordContents(webnovelKeywordRes.data.contents.content);

                setWebtoonKeywordName(webtoonKeywordRes.data.keyword);
                setWebtoonKeywordContents(webtoonKeywordRes.data.contents.content);
                console.log(rankingRes.data);
                setRankingContents(rankingRes.data);
            } catch (error) {
                console.error("작품 데이터 조회 실패: ", error);
            }
        }

        fetchData();

        const bannerInterval = setInterval(() => {
            setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
        }, 20000);

        return () => clearInterval(bannerInterval);
    }, []);

    return(
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
                    <RankingContentList contents={ rankingContents } layout="slider" />
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