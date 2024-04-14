import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { movies } from "./api/api";

function App() {
  const [isHover, setisHover] = useState(false);
  const [movieData, setMovieData] = useState(movies);

  return (
    <>
      <div onMouseOver={() => setisHover(true)}>hi</div>
      {movieData ? console.log(movieData) : ""}
    </>
  );
}

export default App;
