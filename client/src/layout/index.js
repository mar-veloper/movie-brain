import React, { useState, useEffect } from 'react';
import MovieContext from '../context/movies';
import services from '../services';

const Layout = ({ children }) => {
  const [movies, setMovies] = useState(services.movies.getMovieState());
  const [searchValue, setSearchValue] = useState('');
  const [movieTitle, setMovieTitle] = useState('');

  const handleOnChange = e => {
    const { value } = e.currentTarget;

    e.currentTarget.className = value
      ? 'form-control is-valid'
      : 'form-control is-invalid';

    setSearchValue(value);
  };

  useEffect(() => services.movies.setMoviesToLocal(movies), [movies]);

  const value = {
    movies,
    setMovies,
    searchValue,
    setSearchValue,
    movieTitle,
    setMovieTitle,
    onChange: e => handleOnChange(e),
  };

  return (
    <MovieContext.Provider value={value}>
      <section className="container mt-3">{children}</section>
    </MovieContext.Provider>
  );
};

export default Layout;
