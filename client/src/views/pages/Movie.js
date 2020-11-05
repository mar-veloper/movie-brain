import React, { useContext, useEffect } from 'react';
import MovieContext from '../../context/movies';
import Axios from 'axios';
import { apiUrl } from '../../config.json';
import services from '../../services';

const { getFromLocal, setToLocal } = services.locals;

const MoviePage = ({ match }) => {
  const { movies, setMovies } = useContext(MovieContext);

  const { title } = match.params;

  const getMovies = async () => {
    if (title === getFromLocal('movieTitle')) return;
    const { data } = await Axios.get(`${apiUrl}/movies/${title}`);
    console.log('Fetched');
    setMovies(data);
    setToLocal('movieTitle', title);
  };

  useEffect(() => getMovies(), [title]);

  console.log({ movies });

  return <h1>This is the Movie Page</h1>;
};

export default MoviePage;
