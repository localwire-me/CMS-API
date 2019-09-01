const mongoose = require('mongoose');
const Author = require('../models/author.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function for retrieving all authors
exports.getAllAuthors = function(req, res, next) {
  Author.find({}, (err, authors) => {
    if (err) {
      res.json({
        success: false,
        message: "Cannot find authors",
      })
    }
    res.json({
      success: true,
      message: "Success",
      authors: authors
    });
  });
};

// Function for retrieving the user with a specific author
exports.getAuthor = function(req, res, next) {
  const id = req.params.id;
  Author.find({_id: id}, (err, author) => {
    if (err) {
      res.json({
        success: true,
        message: "Cannot find author",
      });
    }
    res.json({
      success: true,
      message: "Success",
      author: author
    });
  });
};

// Function for posting a new author
exports.postAuthor = function(req, res, next) {
  let author = new Author();
  author.email = req.body.email;
  author.name = req.body.name;
  author.picture = author.gravatar();

  Author.find({ email: req.body.email })
    .exec()
    .then(authors => {
      if (authors.length >= 1) {
        res.json({
          success: false,
          message: "Author already exists"
        });
      } else {
        author.save();
        res.json({
          success: true,
          message: "Author created successfully"
        });
      }
    });
}

// Function for deleting an author
exports.deleteAuthor = function(req, res, next) {

  Author.find({ _id: req.params.id })
    .exec()
    .then(author => {
      Author.remove({ _id: req.params.id })
      .exec()
      .then(result => {
        res.status(200).json({
          success: true,
          message: "Author deleted successfully"
        })
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: "Error deleting author",
          error: err
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "Error deleting author",
        error: err
      });
    });
}
