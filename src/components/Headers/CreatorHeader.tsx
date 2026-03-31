import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import * as H from "../Styles/Header.styles"
import logo from '../../assets/creator_logo.png'
import axios from "axios";

const CreatorHeaderSpace = styled.div`
    width: 260px;
    margin-right: 8px;
    display: flex;
    align-items: flex-start;
    height: 40px;
`

function CreatorHeader() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 작품 관리 활성화 조건: /creators/contents로 시작하지만 /episodes는 포함하지 않음
    const isContentActive = location.pathname.startsWith('/creators/contents') && !location.pathname.includes('/episodes');

    // 에피소드 관리 활성화 조건: 경로에 '/episodes'가 포함된 모든 경우 (등록 및 관리 페이지)
    const isEpisodeActive = location.pathname.includes('/episodes');

    // 수익 관리 활성화 조건: /creators/revenue로 시작하지만 /payout-account는 포함하지 않음
    const isRevenueActive = location.pathname.startsWith('/creators/revenue');

    const handleLogoutClick = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();

        if (!window.confirm("로그아웃 하시겠습니까?")) return;

        try {
            const response = await axios.get("/api/users/logout", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                withCredentials: true
            })

            if (response.status === 200) {
                logout();
                navigate("/", { replace: true });
            } else {
                alert("로그아웃에 실패했습니다.");
            }
        } catch (err) {
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };


    return (
        <H.HeaderContainer>
            <H.Header>
                <H.HeaderLogoSearchUser>
                    <H.HeaderLogo to={"/creators/dashboard"}>
                        <img src={logo} />
                    </H.HeaderLogo>
                    <CreatorHeaderSpace>
                    </CreatorHeaderSpace>
                    <H.AuthLinkContainer>
                        <H.AuthLinkList>
                            <H.AuthLinkItem $last={false}>

                            </H.AuthLinkItem>
                            <H.AuthLinkItem $last={true}>

                            </H.AuthLinkItem>
                        </H.AuthLinkList>
                    </H.AuthLinkContainer>
                </H.HeaderLogoSearchUser>
                <H.HeaderContentsEtc>
                    <H.HeaderLinkList>
                        <H.HeaderNavLink
                            $first={true}
                            to={"/creators/contents/dashboard"}
                            $active={isContentActive}
                        >
                            작품 관리
                        </H.HeaderNavLink>
                        <H.HeaderNavLink
                            $first={false}
                            to={"/creators/contents/episodes/dashboard"}
                            $active={isEpisodeActive}
                        >
                            에피소드 관리
                        </H.HeaderNavLink>
                        <H.HeaderNavLink
                            $first={false}
                            to={"/creators/revenue/dashboard"}
                            $active={isRevenueActive}
                        >
                            수익 관리
                        </H.HeaderNavLink>
                    </H.HeaderLinkList>
                    <H.HeaderEtcLinkList>
                        <H.HeaderEtcLink to={"/"}>
                            <H.HeaderEtcLinkText>알림</H.HeaderEtcLinkText>
                        </H.HeaderEtcLink>
                        <H.HeaderEtcLink to={"/"}>
                            <H.HeaderEtcLinkText>내 프로필</H.HeaderEtcLinkText>
                        </H.HeaderEtcLink>
                        <H.HeaderEtcLink to={"#logout"} onClick={handleLogoutClick}>
                            <H.HeaderEtcLinkText>로그아웃</H.HeaderEtcLinkText>
                        </H.HeaderEtcLink>
                    </H.HeaderEtcLinkList>
                </H.HeaderContentsEtc>
            </H.Header>
        </H.HeaderContainer>
    )

}

export default CreatorHeader;