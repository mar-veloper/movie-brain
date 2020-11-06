import React, { useState, useEffect } from 'react';
import MovieContext from '../context/movies';
import services from '../services';
import Header from './Header';

const {
  getMovieState,
  getSpecificMovie,
  setMoviesToLocal,
  setSpecificMovieToLocal,
} = services.movies;
const { getUserList, setUserListToLocal } = services.user;

const Layout = ({ children }) => {
  const [movieData, setMovieData] = useState(getMovieState());
  const [searchValue, setSearchValue] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState(getUserList());
  const [specificMovie, setSpecificMovie] = useState(getSpecificMovie());

  const handleOnChange = e => {
    const { value } = e.currentTarget;

    e.currentTarget.className = value
      ? 'form-control is-valid'
      : 'form-control is-invalid';

    setSearchValue(value);
  };

  const handleRecommend = item => {
    const itemFromlist = userList[item._id];

    if (!itemFromlist) {
      return setUserList({
        ...userList,
        [item._id]: { ...itemFromlist, movie: item, isRecommended: true },
      });
    }

    if (!itemFromlist.toWatch) {
      const res = Object.assign({}, userList);
      delete res[item._id];
      return setUserList(res);
    }

    return setUserList({
      ...userList,
      [item._id]: {
        ...itemFromlist,
        isRecommended: !itemFromlist.isRecommended,
      },
    });
  };

  const handleToWatch = item => {
    const itemFromlist = userList[item._id];

    if (!itemFromlist) {
      return setUserList({
        ...userList,
        [item._id]: { ...itemFromlist, movie: item, toWatch: true },
      });
    }

    if (!itemFromlist.isRecommended) {
      const res = Object.assign({}, userList);
      delete res[item._id];
      return setUserList(res);
    }

    return setUserList({
      ...userList,
      [item._id]: { ...itemFromlist, toWatch: !itemFromlist.toWatch },
    });
  };

  useEffect(() => setMoviesToLocal(movieData), [movieData]);
  useEffect(() => setUserListToLocal(userList), [userList]);
  useEffect(() => setSpecificMovieToLocal(specificMovie), [specificMovie]);

  const value = {
    userList,
    setUserList,
    movieData,
    setMovieData,
    searchValue,
    setSearchValue,
    lastSearched,
    setLastSearched,
    handleRecommend,
    handleToWatch,
    specificMovie,
    setSpecificMovie,
    isLoading,
    setIsLoading,
    onChange: e => handleOnChange(e),
  };

  return (
    <MovieContext.Provider value={value}>
      <Header />
      <section className="container mt-3">{children}</section>
    </MovieContext.Provider>
  );
};

export default Layout;
