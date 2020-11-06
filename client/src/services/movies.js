import services from '.';

const getMovieState = () => {
  const localMovies = services.locals.getFromLocal('movies');
  return localMovies || null;
};

const setMoviesToLocal = item => services.locals.setToLocal('movies', item);

const getSpecificMovie = () => {
  const localMovie = services.locals.getFromLocal('specificMovie');
  return localMovie || { title: '', plot: '', image: '', actors: [] };
};

const setSpecificMovieToLocal = item =>
  services.locals.setToLocal('specificMovie', item);

export default {
  getMovieState,
  setMoviesToLocal,
  getSpecificMovie,
  setSpecificMovieToLocal,
};
