import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { movies } from "./api/api";
import MovieCard from "./components/MovieCard";
import Description from "./components/Description";

function App() {
  const [movieData, setMovieData] = useState(movies);

  return (
    <>
      <div className="movie-grid">
        {movieData.results.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default App;
