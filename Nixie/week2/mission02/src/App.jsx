import React, { useState } from 'react';
import Movie from "./components/Movie";
import { dummy } from "./movieDummy";

function App() {
  const [movies, setMovies] = useState(dummy.results);
  const updateVoteAverage = (id, newVoteAverage) => {
    setMovies(prevMovies => (
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, vote_average: newVoteAverage } : movie
      )
    ));
  };

  return (
    <div>
      <div className="app-container">
        {movies.map((item) => (
          <Movie
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            overview={item.overview}
            updateVoteAverage={updateVoteAverage}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
