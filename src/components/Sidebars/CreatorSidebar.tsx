import React, { useState, useEffect } from "react";
import * as S from "../Styles/Sidebar.styles";
import { Link, NavLink, useLocation } from "react-router-dom";


function CreatorSidebar() {
    const location = useLocation();
    
    // 작품 수정 페이지 경로 정규식 검사 (ex: /creators/contents/update, /creators/contents/1/update)
    const isUpdateContentActive = location.pathname === "/creators/contents/update" || 
                                  /^\/creators\/contents\/\d+\/update$/.test(location.pathname);

    return (
        <S.SidebarContainser>
            <S.SidebarMainLink to={"/creators/dashboard"}>대시보드</S.SidebarMainLink>
            <aside>
                <S.SidebarNav>
                    <S.SidebarNavSectionUl>
                        <S.SidebarNavSectionLi last={false}>
                            <S.SidebarNavTitle>작품 관리</S.SidebarNavTitle>
                            <S.SidebarNavItemUl>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/creators/contents/list"}>내 작품 목록</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/creators/contents/new"}>작품 등록</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink 
                                        to={"/creators/contents/update"} 
                                        className={isUpdateContentActive ? "active" : ""}
                                    >
                                        작품 수정
                                    </S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/library/my-comments"}>작품 반응</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/library/my-comments"}>작품별 통계</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                            </S.SidebarNavItemUl>
                        </S.SidebarNavSectionLi>
                        <S.SidebarNavSectionLi last={false}>
                            <S.SidebarNavTitle>에피소드 관리</S.SidebarNavTitle>
                            <S.SidebarNavItemUl>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/"} >에피소드 작성</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/"}>에피소드 수정</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/library/my-comments"}>에피소드 관리</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                            </S.SidebarNavItemUl>
                        </S.SidebarNavSectionLi>
                        <S.SidebarNavSectionLi last={false}>
                            <S.SidebarNavTitle>수익 / 정산</S.SidebarNavTitle>
                            <S.SidebarNavItemUl>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/users/edit"}>수익 현황</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/users/withdraw"}>정산 내역</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/library/my-comments"}>계좌 정보 관리</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                            </S.SidebarNavItemUl>
                        </S.SidebarNavSectionLi>
                        <S.SidebarNavSectionLi last={true}>
                            <S.SidebarNavTitle>계정 관리</S.SidebarNavTitle>
                            <S.SidebarNavItemUl>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/library/favorites"}>내 프로필 수정</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                                <S.SidebarNavItemLi>
                                    <S.SidebarNavLink to={"/library/recent-view"}>또 뭐가 있지</S.SidebarNavLink>
                                </S.SidebarNavItemLi>
                            </S.SidebarNavItemUl>
                        </S.SidebarNavSectionLi>
                    </S.SidebarNavSectionUl>
                </S.SidebarNav>
            </aside>
        </S.SidebarContainser>
    )
}

export default CreatorSidebar;