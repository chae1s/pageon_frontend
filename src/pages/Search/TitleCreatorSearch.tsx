import React, { useEffect, useState } from "react";
import { MainContainer, NoSidebarMain } from "../../styles/Layout.styles";
import CustomSelect from "../../components/Common/CustomSelect";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import * as S from "./Search.styles"
import { SearchContent } from "../../types/Content";
import SearchContentList from "../../components/Contents/SearchContentList";
import { Pagination } from "../../types/Page";
import PageNavigator from "../../components/Pagination/PageNavigator";

function TitleCreatorSearch() {

    const [pageData, setPageData] = useState<Pagination<SearchContent> | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [emptyMessage, setEmptyMessage] = useState<string>("검색 결과가 없습니다.")

    let contentType = searchParams.get("contentType") || "all";
    const query = searchParams.get("query") || "";
    const sort = searchParams.get("sort") || "popular";
    const page = parseInt(searchParams.get("page") || "0", 10);

    const sortOptions = [
        { label: "최신 순", value: "latest" },
        { label: "별점 순", value: "rating" },
        { label: "인기 순", value: "popular" }
    ];

    useEffect(() => {
        async function fetchSearchResults() {
            try {
                const response = await api.get(`/${contentType}`, {
                    params: {
                        query: query,
                        sort: sort,
                        page: page,
                    }
                });

                console.log(response.data);
                setPageData(response.data);

            } catch (error: any) {
                const errorCode = error.response.data.errorCode;
                if (errorCode === 'INVALID_SEARCH_QUERY') {
                    setEmptyMessage("검색어를 입력해주세요.");
                }

            }
        }

        fetchSearchResults();
    }, [contentType, query, sort, page])

    const handleContentTypeChange = (newContentType: string) => {
        contentType = newContentType;
    }

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
                <S.ContentTypeListInSearch>
                    <S.ContentTypeItemInSearch>
                        <S.ContentTypeBtnInSearch $active={contentType === "all"} onClick={() => handleContentTypeChange("all")}>
                            전체
                        </S.ContentTypeBtnInSearch>
                    </S.ContentTypeItemInSearch>
                    <S.ContentTypeItemInSearch>
                        <S.ContentTypeBtnInSearch $active={contentType === "webtoons"} onClick={() => handleContentTypeChange("webtoons")}>
                            웹툰
                        </S.ContentTypeBtnInSearch>
                    </S.ContentTypeItemInSearch>
                    <S.ContentTypeItemInSearch>
                        <S.ContentTypeBtnInSearch $active={contentType === "webnovels"} onClick={() => handleContentTypeChange("webnovels")}>
                            웹소설
                        </S.ContentTypeBtnInSearch>
                    </S.ContentTypeItemInSearch>
                </S.ContentTypeListInSearch>
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
                        emptyMessage={emptyMessage}
                    />
                )}

                {pageData && pageData.totalPages > 0 && (
                    <PageNavigator pageData={pageData} handlePageChange={handlePageChange} />
                )}
            </NoSidebarMain>
        </MainContainer>
    )
}

export default TitleCreatorSearch;