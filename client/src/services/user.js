import services from '.';

const getUserList = () => {
  const localMovies = services.locals.getFromLocal('userMovieList');
  return localMovies || {};
};

const setUserListToLocal = item =>
  services.locals.setToLocal('userMovieList', item);

export default {
  getUserList,
  setUserListToLocal,
};
