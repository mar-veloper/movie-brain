const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

app.use(bodyParser());
app.use(morgan('tiny'));

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use('/api/movies', routes.movies);

app.get('/api/movies/:title', async (req, res) => {
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

  if (error) return res.json({ message: error });

  const pages = Math.ceil(data.totalResults / maxItems);
  const prev = currentPage < 2 ? null : currentPage - 1;
  const next = currentPage >= pages ? null : currentPage + 1;
  const movies =
    !id &&
    moviesSearched.map(({ Title, Year, imdbID, Type, Poster }) => ({
      _id: imdbID,
      title: Title,
      year: Year,
      type: Type,
      image: Poster,
    }));

  const {
    Title,
    Year,
    imdbID,
    Type,
    Poster,
    Released,
    Ratings,
    Actors,
    Plot,
    Genre,
    Language,
    Director,
  } = data;

  const movie = {
    _id: imdbID,
    title: Title,
    year: Year,
    type: Type,
    image: Poster,
    released: Released,
    ratings: Ratings,
    actors: Actors.split(', '),
    genre: Genre.split(', '),
    director: Director.split(', '),
    plot: Plot,
    language: Language,
  };

  const moviesData = id ? movie : { movies, pages, currentPage, prev, next };

  return res.status(200).json(moviesData);
});

module.exports = app;
