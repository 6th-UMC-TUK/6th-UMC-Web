import propTypes from "prop-types";

const MovieDetail = ({ title, overview }) => {
  return (
    <div className="movie-overview-container">
      <h3 className="description-title">{title}</h3>
      <div className="movie-overview">
        <h3>{overview}</h3>
      </div>
    </div>
  );
};

MovieDetail.propTypes = {
  title: propTypes.string,
  overview: propTypes.string,
};

export default MovieDetail;
