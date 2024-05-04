import { useLocation } from "react-router-dom";
import Header from "./Header";

export default function HeaderWithRouting() {
  const location = useLocation();

  // 영화 상세 페이지가 아니면 헤더를 렌더링합니다.
  if (!location.pathname.startsWith("/movie/")) {
    return <Header />;
  }

  return null; // 영화 상세 페이지에서는 헤더 렌더링 X
}
