const express = require('express');
const tagController = require('../controllers/tag.controller');
const Router = express.Router();
const checkJwt = require('../middlewares/check-jwt');

// Route to get a specific tag
Router.get('/:id', tagController.getTag);

// Route to get a list of all tags
Router.get('/all-tags', tagController.getAllTags);

// Route to create a new tag
Router.post('/create-tag', checkJwt, tagController.createTag);

// Route to delete a tag
Router.delete('/delete-tag/:id', checkJwt, tagController.deleteTag);

// Route to update a tag
Router.put('/update-tag/:id', checkJwt, tagController.updateTag);

module.exports = Router;