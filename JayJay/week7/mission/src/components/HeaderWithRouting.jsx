import { useLocation, matchPath } from "react-router-dom";
import Header from "./Header";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeaderWithRouting() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  // 영화 상세 페이지에서는 헤더와 배너를 렌더링하지 않음
  if (location.pathname.startsWith("/movie/")) {
    return null;
  }

  const routes = [
    "/",
    "/login",
    "/popular",
    "/now-playing",
    "/top-rated",
    "/upcoming",
    "/signup",
  ];
  const match = routes.some((route) =>
    matchPath({ path: route, end: route === "/" }, location.pathname)
  );

  // 현재 경로가 위 정의된 라우트 중 하나와 일치하지 않으면 NotFound로 간주
  if (!match) {
    return null; // NotFound 페이지에서는 헤더를 렌더링하지 않음
  }

  // 그 외의 경우(정의된 경로에서 동작하는 페이지) 헤더 렌더링
  return (
    <>
      <Header user={user} loading={loading} onLogout={handleLogout} />
      {location.pathname === "/" && <Banner user={user} loading={loading} />}
    </>
  );
}
