import React, { useState } from 'react';

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const Movie = ({ title, poster_path, vote_average, overview }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="movie-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={IMG_BASE_URL + poster_path} alt="영화포스터" />
            {isHovered && (
                <div className="overlay">
                    <h3>{title}</h3>
                    <div className="movie-detail">
                        <p>{overview}</p>
                    </div>
                </div>
            )}
            <div className="movie-info">
                <h4>{title}</h4>
                <span>{vote_average}</span>
            </div>
        </div>
    );
};

export default Movie;
