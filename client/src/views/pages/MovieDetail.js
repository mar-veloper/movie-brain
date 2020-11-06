import React, { useContext, useEffect } from 'react';
import MovieContext from '../../context/movies';
import Axios from 'axios';

import { apiUrl } from '../../config.json';

const MovieDetailPage = ({ match, history }) => {
  const { specificMovie, setSpecificMovie } = useContext(MovieContext);
  const { title, id } = match.params;

  const fetchMovie = async () => {
    if (id === specificMovie._id) return;
    try {
      const { data } = await Axios.get(`${apiUrl}/movies/${title}/?id=${id}`);
      setSpecificMovie(data);
    } catch (error) {
      history.push('/not-found');
    }
  };

  useEffect(() => fetchMovie(), [id]);

  const {
    title: pageTitle,
    plot,
    image,
    actors,
    language,
    ratings,
    director,
    genre,
    type,
  } = specificMovie;

  console.log(specificMovie);

  return (
    <div className="container">
      <h1 className="my-4">{pageTitle}</h1>

      <div className="row">
        <div className="col-md-4">
          <img
            className="img-fluid"
            src={image === 'N/A' ? 'http://placehold.it/750x500' : image}
            alt=""
          />
        </div>

        <div className="col-md-8">
          <h5 className="mb-3">Plot</h5>
          <p>{plot}</p>
          <h6 className="my-3">Actors</h6>
          {actors.map((actor, index) => (
            <span key={`${index}-${actor}`}>{actor}, </span>
          ))}
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
