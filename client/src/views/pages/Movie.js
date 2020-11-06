import React, { useContext, useEffect, useRef } from 'react';
import MovieContext from '../../context/movies';
import Axios from 'axios';
import { apiUrl } from '../../config.json';
import services from '../../services';
import Button from '../../components/common/Button';
import Input from '../../components/common/Form/Input';
import Card from '../../components/common/Card';

const { getFromLocal, setToLocal } = services.locals;

const MoviePage = ({ match, history }) => {
  const {
    movieData,
    setMovieData,
    userList,
    searchValue,
    onChange,
    setLastSearched,
    setIsLoading,
    handleRecommend,
    handleToWatch,
  } = useContext(MovieContext);

  const { title } = match.params;

  const getMovies = async () => {
    if (title === getFromLocal('lastSearched')) return setIsLoading(false);
    try {
      setIsLoading(true);
      const { data } = await Axios.get(`${apiUrl}/movies/${title}`);
      setMovieData(data);
      setToLocal('lastSearched', title);
      setIsLoading(false);
    } catch (err) {
      history.push(`/not-found}`);
    }
  };

  useEffect(() => getMovies(), [title]);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (!searchValue) {
      return (searchInput.current.className = 'form-control is-invalid');
    }

    searchInput.current.className = 'form-control is-valid';
    setLastSearched(searchValue.toLowerCase());
    setIsLoading(true);
    history.push(`/movies/${searchValue.toLowerCase()}`);
  };

  const movies = movieData && movieData.movies.sort((a, b) => b.year - a.year);
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
          className="dark btn-lg btn-block"
          label="Search"
          type="submit"
          onClick={e => handleOnSubmit(e)}
        />
      </form>
      {movieData && (
        <div className="mt-5 d-flex flex-wrap">
          {movies.map(item => {
            const { _id, title: cardTitle, image, type, year } = item;
            return (
              <Card
                key={`${year}-${cardTitle}-${_id}`}
                id={_id}
                image={image}
                title={cardTitle}
                year={year}
                type={type}
                toWatch={userList[_id]?.toWatch}
                isRecommended={userList[_id]?.isRecommended}
                onToWatch={() => handleToWatch(item)}
                onRecommend={() => handleRecommend(item)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MoviePage;
