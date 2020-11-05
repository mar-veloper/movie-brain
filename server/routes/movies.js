const router = require('express').Router();
const controller = require('../controller');

router.route('/:title').get(controller.movies);

module.exports = router;
