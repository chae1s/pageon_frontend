import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import * as H from "../Styles/Header.styles"
import logo from '../../assets/admin_logo.png'
import axios from "axios";
import { useNotification } from "../../context/NotificationContext";
import NotificationBubble from "./NotificationBubble";

const CreatorHeaderSpace = styled.div`
    width: 260px;
    margin-right: 8px;
    display: flex;
    align-items: flex-start;
    height: 40px;
`

function AdminHeader() {
    const { isAuthenticated, logout } = useAuth();
    const { unreadCount, latestMessage, latestLink, clearNotifications, clearLatestMessage, showLatest } = useNotification();
    const hasNew = unreadCount > 0;

    // 알림 디버깅용 로그
    useEffect(() => {
        console.log("🔔 [AdminHeader] Notification Status:", { unreadCount, latestMessage, hasNew });
    }, [unreadCount, latestMessage, hasNew]);

    const navigate = useNavigate();
    const location = useLocation();


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
                    <H.HeaderLogo to={"/creators/contents/dashboard"}>
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
                        >
                            작품 관리
                        </H.HeaderNavLink>
                        <H.HeaderNavLink
                            $first={false}
                            to={"/creators/contents/episodes/dashboard"}
                        >
                            에피소드 관리
                        </H.HeaderNavLink>
                        <H.HeaderNavLink
                            $first={false}
                            to={"/admin/settlements"}
                        >
                            정산 관리
                        </H.HeaderNavLink>
                    </H.HeaderLinkList>
                    <H.HeaderEtcLinkList>
                        <H.HeaderEtcLink 
                            to={"#"} 
                            onClick={(e) => {
                                e.preventDefault();
                                clearNotifications();
                                showLatest();
                            }}
                        >
                            <H.HeaderEtcLinkText>알림</H.HeaderEtcLinkText>
                            {hasNew && <H.NotificationDot />}
                            {latestMessage && (
                                <NotificationBubble 
                                    message={latestMessage} 
                                    link={latestLink}
                                    onClose={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        clearLatestMessage();
                                    }} 
                                />
                            )}
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

export default AdminHeader;