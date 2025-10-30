const routes = require('express').Router();
const lesson1controller = require('../controllers/lesson1');

routes.get('/', lesson1controller.helloworld);
routes.get('/bruce', lesson1controller.hellobruce);
routes.get('/nayelly', lesson1controller.helloNayelly);

module.exports = routes;