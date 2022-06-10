/**
 * Rules API.
 * GET /rest/movies
 * GET /rest/movies/:is
 * POST /rest/movies/:id/favorites
 */

const _ = require('lodash');
const movies = require('./movies');

module.exports = function moviesRouter(app) {
  app.get('/rest/movies', (req, res) => {
    console.info('GET /rest/movies');
    return res.status(200).json(movies);
  });

  app.get('/rest/movies/:id', (req, res) => {
    console.info(`GET /rest/movies/${req.params.id}`);

    const paramId = Number(req.params.id);
    const movie = _.find(movies, r => r.id === paramId);

    if (!movie) {
      return res.status(404).send();
    }
    return res.status(200).json(movie);
  });

  app.post('/rest/movies/:id/favorites', (req, res) => {
    console.info(`POST /rest/movies/${req.params.id}/favorites`);
    console.info('  => body: ', req.body);

    const paramId = Number(req.params.id);
    const movie = _.find(movies, r => r.id === paramId);

    if (!movie) {
      return res.status(404).send();
    }

    const body = req.body;

    if (!body || body.isFavorite === undefined) {
      return res.status(400).send();
    }

    movie.favorited = body.isFavorite;

    return res.status(200).json(movie);
  });

};
