import React, { useEffect, useState } from "react";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import CustomSelect from "../../components/Common/CustomSelect";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import { Category } from "../../types/Keyword";
import * as S from "./Search.styles"
import { SearchContent } from "../../types/Content";
import SearchContentList from "../../components/Contents/SearchContentList";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";

function KeywordSearch() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [categories, setCategories] = useState<Category[]>([]);

    const [pageData, setPageData] = useState<Pagination<SearchContent> | null>(null);

    const contentType = searchParams.get("contentType") || "webtoons";
    const query = searchParams.get("keyword") || "SF";
    const sort = searchParams.get("sort") || "popular"
    const page = parseInt(searchParams.get("page") || "0", 10);

    const sortOptions = [
        { label: "최신 순", value: "latest" },
        { label: "별점 순", value: "rating" },
        { label: "인기 순", value: "popular" }
    ];

    useEffect(() => {
        async function fetchCategoryKeywords() {
            window.scrollTo(0, 0);

            try {

                const response = await api.get("/keywords");

                setCategories(response.data);
            } catch (error) {
                console.error("카테고리 별 키워드 조회 실패: ", error);
            }
        }

        fetchCategoryKeywords();

    }, [query]);

    useEffect(() => {
        async function fetchSearchResults() {
            try {
                const response = await api.get(`/${contentType}`, {
                    params: {
                        keyword: query,
                        sort: sort,
                        page: page,
                    }
                });

                setPageData(response.data)

            } catch (error) {
                console.error("키워드 검색 결과 조회 실패: ", error);
            }
        }

        if (query) {
            fetchSearchResults();
        }

    }, [contentType, query, sort, page]);

    const handleParamClick = (newKey: string, newValue: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.set(newKey, newValue);
        newParams.set("page", "0");
        setSearchParams(newParams);
    }

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
    }

    return (
        <MainContainer>
            <NoSidebarMain>
                <S.ContentTypeList>
                    <S.ContentTypeItem>
                        <S.ContentTypeBtn $active={contentType === "webtoons"} onClick={() => handleParamClick("contentType", "webtoons")}>
                            웹툰
                        </S.ContentTypeBtn>
                    </S.ContentTypeItem>
                    <S.ContentTypeItem>
                        <S.ContentTypeBtn $active={contentType === "webnovels"} onClick={() => handleParamClick("contentType", "webnovels")}>
                            웹소설
                        </S.ContentTypeBtn>
                    </S.ContentTypeItem>
                </S.ContentTypeList>
                <S.KeywordTable>
                    {categories.map((category) => (
                        <S.CategoryWithKeywords key={category.id}>
                            <S.CategoryName>{category.name}</S.CategoryName>
                            <S.KeywordList>
                                <S.KeywordItemWrap>
                                    {category.keywords.map((keyword) => (
                                        <S.KeywordItem key={keyword.keywordId}>
                                            <S.KeywordBtn $active={query === `${keyword.keyword}`} onClick={() => handleParamClick("keyword", `${keyword.keyword}`)}>
                                                {keyword.keyword}
                                            </S.KeywordBtn>
                                        </S.KeywordItem>
                                    ))}
                                </S.KeywordItemWrap>
                            </S.KeywordList>
                        </S.CategoryWithKeywords>
                    ))}
                </S.KeywordTable>
                <S.SelectSortSection>
                    <S.SelectSortBtnGroup>
                        <CustomSelect
                            options={sortOptions}
                            value={sort}
                            onChange={(val) => handleParamClick("sort", val)}
                        />
                    </S.SelectSortBtnGroup>
                </S.SelectSortSection>
                {pageData && (
                    <SearchContentList
                        contents={pageData.content}
                        totalElements={pageData.totalElements}
                        emptyMessage="해당 키워드를 가진 작품이 없습니다."
                    />
                )}

                {pageData && pageData.totalPages > 0 && (
                    <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                )}


            </NoSidebarMain>
        </MainContainer>
    )
}

export default KeywordSearch;