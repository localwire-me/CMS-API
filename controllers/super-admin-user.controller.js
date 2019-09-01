let User = require('../models/super-admin-user.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

// Controller for signup
exports.signup = function(req, res) {
  User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: 'Mail already exists'
          }); 
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                username: req.body.username
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  var token = jwt.sign({
                    user: user
                  }, config.secret, {
                    expiresIn: '24h'
                  });
                  res.status(201).json({
                    success: true,
                    token: token,
                    message: "Welcome to LocalWire"
                  })
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          })
        }
      });
};

// Controller for login
exports.login = function(req, res) {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed"
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            config.secret,
            {
              expiresIn: "24h"
            }
          );
          return res.status(200).json({
            success: true,
            message: "Authentication successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Authentication failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

// Controller for deleting user
exports.delete = function(req, res, next) {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: err
      })
    })
};
