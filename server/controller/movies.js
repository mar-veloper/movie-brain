const axios = require('axios');

const getMovie = data => ({
  _id: data.imdbID,
  title: data.Title,
  year: data.Year,
  type: data.Type,
  image: data.Poster,
  released: data.Released,
  ratings: data.Ratings,
  actors: data.Actors?.split(', '),
  genre: data.Genre?.split(', '),
  director: data.Director?.split(', '),
  plot: data.Plot,
  language: data.Language,
});

const getAllMovies = data =>
  data.map(({ Title, Year, imdbID, Type, Poster }) => ({
    _id: imdbID,
    title: Title,
    year: Year,
    type: Type,
    image: Poster,
  }));

module.exports = async (req, res) => {
  const { title } = req.params;
  const { id, page } = req.query;
  const { API_KEY } = process.env;
  const maxItems = 10;

  const currentPage =
    Number.isNaN(Number(page)) || Number(page) <= 1 ? 1 : Number(page);

  const generalEndpoint = `http://www.omdbapi.com/?s=${title}&page=${currentPage}&apikey=${API_KEY}`;
  const specificEndpoint = `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
  const endpoint = id ? specificEndpoint : generalEndpoint;

  const { data } = await axios.get(endpoint);
  const { Error: error, Search: moviesSearched } = data;

  if (error) return res.status(404).json({ message: error });

  const pages = Math.ceil(data.totalResults / maxItems);
  const prev = currentPage < 2 ? null : currentPage - 1;
  const next = currentPage >= pages ? null : currentPage + 1;

  const movies = !id && getAllMovies(moviesSearched);
  const movie = id && getMovie(data);

  const moviesData = id ? movie : { movies, pages, currentPage, prev, next };

  return res.status(200).json(moviesData);
};
