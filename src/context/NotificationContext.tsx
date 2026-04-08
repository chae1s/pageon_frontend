import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from "react";
import { useAuth } from "./AuthContext";
import { Notification } from "../types/Notifications";
import api from "../api/axiosInstance";

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    latestMessage: string | null;
    latestLink: string | null;
    markAsRead: (id: string) => void;
    clearNotifications: () => void;
    clearLatestMessage: () => void;
    showLatest: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, accessToken } = useAuth();
    const eventSourceRef = useRef<EventSource | null>(null);
    const isConnecting = useRef(false); // 💡 중복 연결 방지 플래그

    const [notifications, setNotifications] = useState<Notification[]>(() => {
        try {
            const saved = localStorage.getItem("notifications");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [latestMessage, setLatestMessage] = useState<string | null>(null);
    const [latestLink, setLatestLink] = useState<string | null>(null);
    const unreadCount = notifications.filter(n => !n.read).length;

    // 알림 저장용 로컬스토리지 동기화
    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    const clearLatestMessage = useCallback(() => {
        setLatestMessage(null);
        setLatestLink(null);
    }, []);

    const showLatest = useCallback(() => {
        if (notifications.length > 0) {
            const latest = notifications[0];
            setLatestMessage(latest.message);
            setLatestLink(latest.link || null);

            setTimeout(() => {
                setLatestMessage(null);
                setLatestLink(null);
            }, 5000);
        }
    }, [notifications]);

    const connectSSE = useCallback(async () => {
        // 💡 인증되지 않았거나 이미 연결 중이면 실행하지 않음
        if (!isAuthenticated || !accessToken || isConnecting.current) return;

        isConnecting.current = true;

        try {
            console.log("🔍 [Notification] SSE 연결 전 인증 확인 중...");
            // 인터셉터가 401을 처리할 수 있도록 api 호출
            await api.get("/notifications/check-auth").catch(() => { });

            const freshToken = localStorage.getItem("accessToken") || accessToken;
            const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
            const subscribeUrl = `${baseUrl}/api/notifications/subscribe?token=${freshToken}`;

            // 💡 기존 연결이 있다면 확실히 닫기
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }

            console.log("🚀 [Notification] SSE 연결 시도...");
            const eventSource = new EventSource(subscribeUrl);
            eventSourceRef.current = eventSource;

            eventSource.onopen = () => {
                console.log("✅ [Notification] SSE 연결 성공!");
                isConnecting.current = false; // 연결 성공 시 플래그 해제
            };

            eventSource.onerror = (error) => {
                console.error("❌ [Notification] SSE 에러 발생, 5초 후 재연결 시도...");
                eventSource.close();
                eventSourceRef.current = null;
                isConnecting.current = false;

                // 💡 즉시 재연결하지 않고 5초 대기 (무한 루프 방지)
                setTimeout(() => {
                    if (isAuthenticated) connectSSE();
                }, 5000);
            };

            // 💡 서버에서 보낸 'pageon' 이벤트 리스너
            eventSource.addEventListener("pageon", (event: any) => {
                const dataString = event.data;
                console.log("📩 [Notification] 'pageon' 이벤트 수신:", dataString);

                if (dataString === "connected" || dataString === "EventStream Created") return;

                try {
                    const parsedData = JSON.parse(dataString);
                    const msg = parsedData.message || parsedData.content || dataString;
                    const link = parsedData.redirectUrl || parsedData.url || "";

                    const newNotification: Notification = {
                        id: Date.now().toString(),
                        message: msg,
                        link: link,
                        timestamp: new Date().toISOString(),
                        read: false
                    };

                    setNotifications(prev => [newNotification, ...prev]);
                    setLatestMessage(newNotification.message);
                    setLatestLink(newNotification.link || null);

                    setTimeout(() => {
                        setLatestMessage(null);
                        setLatestLink(null);
                    }, 5000);
                } catch (e) {
                    // JSON이 아닌 일반 문자열 처리
                    const fallbackNotification: Notification = {
                        id: Date.now().toString(),
                        message: dataString,
                        timestamp: new Date().toISOString(),
                        read: false
                    };
                    setNotifications(prev => [fallbackNotification, ...prev]);
                    setLatestMessage(dataString);
                    setTimeout(() => setLatestMessage(null), 5000);
                }
            });

            // 💡 서버에서 보낸 'heartbeat' 이벤트 리스너 (UI 무시)
            eventSource.addEventListener("heartbeat", () => {
                console.log("💓 [Notification] Heartbeat 수신 (연결 유지)");
            });

        } catch (err) {
            console.error("❌ [Notification] SSE 초기화 중 치명적 에러:", err);
            isConnecting.current = false;
        }
    }, [isAuthenticated, accessToken]);

    useEffect(() => {
        if (!isAuthenticated) {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
            setNotifications([]);
            setLatestMessage(null);
            localStorage.removeItem("notifications");
            return;
        }

        connectSSE();

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, [isAuthenticated, connectSSE]); // 💡 connectSSE를 의존성에 추가

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearNotifications = () => {
        setNotifications([]);
        localStorage.removeItem("notifications");
    };

    return (
        <NotificationContext.Provider value={{
            notifications, unreadCount, latestMessage, latestLink,
            markAsRead, clearNotifications, clearLatestMessage, showLatest
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotification must be used within a NotificationProvider");
    return context;
};