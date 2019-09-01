const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();
const categoryController = require('../controllers/category.controller');
const checkJWT = require('../middlewares/check-jwt');

// Route for getting the list of categories
Router.get('/all-categories', categoryController.getAllCategories);

// Route for getting a specific category
Router.get('/get-category/:catId', categoryController.getCategory);

// Route for creating a category
Router.post('/create-category', checkJWT, categoryController.createCategory);

// Route for deleting a category
Router.delete('/delete-category/:id', checkJWT, categoryController.deleteCategory);

// Route for updating a category
Router.post('/update-category/:catId', checkJWT, categoryController.updateCategory);

module.exports = Router;