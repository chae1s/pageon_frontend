import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MainContainer, SidebarMain, SortBtn } from "../../styles/Layout.styles";
import CustomSelect from "../../components/Common/CustomSelect";
import * as S from "./MyPage.styles";
import Sidebar from "../../components/Sidebars/MyPageSidebar";
import { InterestContent, RecentReadContent } from "../../types/Content";
import api from "../../api/axiosInstance";
import InterestContentItem from "../../components/Contents/InterestContentItem";
import RecentReadContentItem from "../../components/Contents/RecentReadContentItem";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";

type LibraryMode = "INTEREST" | "HISTORY";

function LibraryPage() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const mode: LibraryMode = location.pathname.includes("history") ? "HISTORY" : "INTEREST";

    // 공통 파라미터 추출
    const contentType = searchParams.get("contentType") || "all";
    const page = parseInt(searchParams.get("page") || "0", 10);

    // 모드별 기본 정렬값 설정
    const defaultSort = mode === "HISTORY" ? "recently_read" : "recently_added";
    const sort = searchParams.get("sort") || defaultSort;

    const [contents, setContents] = useState<(InterestContent | RecentReadContent)[]>([]);
    const [pageData, setPageData] = useState<Pagination<any> | null>(null);

    // 모드별 설정 매핑
    const config = {
        INTEREST: {
            title: "관심 작품",
            apiUrl: `/users/interests/${contentType}`,
            emptyMessage: "관심 작품이 없습니다.",
            sortOptions: [
                { label: "관심 등록 순", value: "recently_added" },
                { label: "업데이트 순", value: "update" },
                { label: "제목 순", value: "title" }
            ],
            ItemComponent: InterestContentItem
        },
        HISTORY: {
            title: "최근 읽은 작품",
            apiUrl: `/users/reading-histories/${contentType}`,
            emptyMessage: "최근 읽은 작품이 없습니다.",
            sortOptions: [
                { label: "최신 읽은 순", value: "recently_read" },
                { label: "업데이트 순", value: "update" }
            ],
            ItemComponent: RecentReadContentItem
        }
    };

    const currentConfig = config[mode];

    useEffect(() => {
        async function fetchData() {
            const params = {
                sort: sort,
                page: page,
                // 최근 본 작품 API는 필터 파라미터명이 'type'일 수 있으므로(기존 코드 기반) 범용적으로 구성
                type: contentType
            };

            try {
                const response = await api.get(currentConfig.apiUrl, { params });
                setContents(response.data.content);
                setPageData(response.data);
            } catch (error) {
                console.error(`${currentConfig.title} 데이터 조회 실패: `, error);
            }
        }

        fetchData();
    }, [mode, contentType, sort, page, currentConfig.apiUrl, currentConfig.title]);

    const handleParamClick = (newKey: string, newValue: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(newKey, newValue);
        newParams.set("page", "0");
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    };

    const ItemComponent = currentConfig.ItemComponent;

    return (
        <MainContainer>
            <SidebarMain>
                <Sidebar />
                <S.SidebarRightWrap>
                    <S.MypageTitle>{currentConfig.title}</S.MypageTitle>
                    <S.MypageBooksSortBtnWrapper>
                        <S.mypageBooksSortBtnList>
                            <S.MypageBooksSelectType>
                                <SortBtn $active={contentType === "all"} onClick={() => handleParamClick("contentType", "all")}>전체</SortBtn>
                                <SortBtn $active={contentType === "webtoons"} onClick={() => handleParamClick("contentType", "webtoons")}>웹툰</SortBtn>
                                <SortBtn $active={contentType === "webnovels"} onClick={() => handleParamClick("contentType", "webnovels")}>웹소설</SortBtn>
                            </S.MypageBooksSelectType>
                            <S.MypageBooksSearchSelectSort>
                                <S.MypageBooksSearchGroup>
                                    <S.MypageBooksSearchInput
                                        type="text"
                                        placeholder="책 이름을 입력하세요."
                                    />
                                    <S.MypageBooksSearchBtn>
                                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className="search-icon">
                                            <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2" />
                                            <line x1="14.2" y1="14.2" x2="20" y2="20" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </S.MypageBooksSearchBtn>
                                </S.MypageBooksSearchGroup>
                                <S.MypageBooksSortGroup>
                                    <CustomSelect
                                        width="130px"
                                        options={currentConfig.sortOptions}
                                        value={sort}
                                        onChange={(val) => handleParamClick("sort", val)}
                                    />
                                </S.MypageBooksSortGroup>
                            </S.MypageBooksSearchSelectSort>
                        </S.mypageBooksSortBtnList>
                    </S.MypageBooksSortBtnWrapper>

                    <S.BookListSection>
                        <S.LibraryContentListWrapper>
                            <S.LibraryContentList>
                                {contents.length === 0 ? (
                                    <S.EmptyListText>{currentConfig.emptyMessage}</S.EmptyListText>
                                ) : (
                                    contents.map((content) => (
                                        <ItemComponent key={content.contentId} content={content as any} />
                                    ))
                                )}
                            </S.LibraryContentList>
                        </S.LibraryContentListWrapper>
                        {pageData && pageData.totalPages > 0 && (
                            <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                        )}
                    </S.BookListSection>
                </S.SidebarRightWrap>
            </SidebarMain>
        </MainContainer>
    );
}

export default LibraryPage;
