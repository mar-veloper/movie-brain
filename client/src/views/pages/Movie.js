import React, { useContext, useEffect, useRef } from 'react';
import MovieContext from '../../context/movies';
import Axios from 'axios';
import { apiUrl } from '../../config.json';
import services from '../../services';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Form/Input';

const { getFromLocal, setToLocal } = services.locals;

const MoviePage = ({ match, history }) => {
  const {
    movieData,
    setMovieData,
    setUserList,
    userList,
    searchValue,
    onChange,
    setMovieTitle,
    setIsLoading,
  } = useContext(MovieContext);

  const { title } = match.params;

  const getMovies = async () => {
    if (title === getFromLocal('movieTitle')) return setIsLoading(false);
    const { data } = await Axios.get(`${apiUrl}/movies/${title}`);
    console.log('Fetched');
    setMovieData(data);
    setToLocal('movieTitle', title);
    setIsLoading(false);
  };

  useEffect(() => getMovies(), [title]);

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

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!searchValue) {
      return (searchInput.current.className = 'form-control is-invalid');
    }

    searchInput.current.className = 'form-control is-valid';
    setMovieTitle(searchValue.toLowerCase());
    setIsLoading(true);
    history.push(`/movies/${searchValue.toLowerCase()}`);
  };

  const movies = movieData.movies.sort((a, b) => b.year - a.year);
  const searchInput = useRef(null);

  return (
    <>
      <form>
        <Input
          ref={searchInput}
          label="Movie Title"
          value={searchValue}
          name="movieTitle"
          required={true}
          onChange={onChange}
          feedback="Please provide a movie title."
          help="Search a movie that you would like to add into your list."
        />
        <Button
          className="btn btn-primary btn-lg btn-block"
          label="Search"
          type="submit"
          onClick={e => handleOnSubmit(e)}
        />
      </form>
      <div className="mt-5">
        {movies.map(item => {
          const { _id, title: cardTitle, image, type, year } = item;
          return (
            <div
              key={`${_id}-${cardTitle}`}
              className="card mb-3 col-md-*"
              style={{ maxWidth: '540px' }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={
                      image !== 'N/A'
                        ? image
                        : 'https://via.placeholder.com/200/300'
                    }
                    className="card-img"
                    alt={cardTitle}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <Link to={`${title}/${_id}`}>
                      <h5 className="card-title">{cardTitle}</h5>
                    </Link>
                    <p className="card-text">
                      <small className="text-muted">
                        {type.toUpperCase()} ({year})
                      </small>
                    </p>
                    <div className="mt-3">
                      <Button
                        label={
                          userList[_id]?.toWatch
                            ? 'Added To Watch '
                            : 'To Watch'
                        }
                        className={
                          userList[_id]?.toWatch
                            ? 'dark disabled mr-3'
                            : 'dark mr-3'
                        }
                        onClick={() => handleToWatch(item)}
                      />
                      <Button
                        label={
                          userList[_id]?.isRecommended
                            ? 'Recommended'
                            : 'Recommend'
                        }
                        className={
                          userList[_id]?.isRecommended
                            ? 'success disabled'
                            : 'success'
                        }
                        onClick={() => handleRecommend(item)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MoviePage;
