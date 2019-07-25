const express = require('express');
const Router = express.Router();
const checkJWT = require('../middlewares/check-jwt');

// Import the author controller
const authorController = require('../controllers/author.controller');

// Create the routes

// Routesfor multiple authors
Router.route('/')
  .get(checkJWT, authorController.getAllAuthors);

// Routes for single author
Router.route('/:id')
  .get(checkJWT, authorController.getAuthor)
  .delete(checkJWT, authorController.deleteAuthor);

Router.route('/')
  .post(checkJWT, authorController.postAuthor);

// Export the route

module.exports = Router;