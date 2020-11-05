import React, { useState, useEffect } from 'react';
import MovieContext from '../context/movies';
import services from '../services';

const { getMovieState, setMoviesToLocal } = services.movies;
const { getUserList, setUserListToLocal } = services.user;

const Layout = ({ children }) => {
  const [movieData, setMovieData] = useState(getMovieState());
  const [searchValue, setSearchValue] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState(getUserList());

  const handleOnChange = e => {
    const { value } = e.currentTarget;

    e.currentTarget.className = value
      ? 'form-control is-valid'
      : 'form-control is-invalid';

    setSearchValue(value);
  };

  useEffect(() => setMoviesToLocal(movieData), [movieData]);
  useEffect(() => setUserListToLocal(userList), [userList]);

  const value = {
    userList,
    setUserList,
    movieData,
    setMovieData,
    searchValue,
    setSearchValue,
    movieTitle,
    setMovieTitle,
    isLoading,
    setIsLoading,
    onChange: e => handleOnChange(e),
  };

  return (
    <MovieContext.Provider value={value}>
      <section className="container mt-3">{children}</section>
    </MovieContext.Provider>
  );
};

export default Layout;
