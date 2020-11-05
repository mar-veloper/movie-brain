import services from '.';

const getMovieState = () => {
  const localMovies = services.locals.getFromLocal('movies');
  return localMovies || [];
};

const setMoviesToLocal = item => services.locals.setToLocal('movies', item);

export default {
  getMovieState,
  setMoviesToLocal,
};
