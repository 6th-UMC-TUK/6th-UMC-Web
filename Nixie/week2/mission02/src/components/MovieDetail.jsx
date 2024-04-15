import React, { useState } from 'react';

const MovieDetail = ({ overview }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`movie-detail ${isExpanded ? 'expanded' : ''}`} onClick={handleClick}>
            <p>{overview}</p>
        </div>
    );
};

export default MovieDetail;
