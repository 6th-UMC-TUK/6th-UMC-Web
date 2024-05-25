import { useLocation, matchPath } from "react-router-dom";
import Header from "./Header";

export default function HeaderWithRouting() {
  const location = useLocation();

  // 영화 상세 페이지에서는 헤더를 렌더링하지 않음
  if (location.pathname.startsWith("/movie/")) {
    return null;
  }

  //여기서 좀 헷갈렸네..some이랑 every 차이 알면 좋음
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
  return <Header />;
}
