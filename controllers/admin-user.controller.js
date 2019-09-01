let AdminUser = require('../models/admin-user.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Controller for signup
exports.signup = function(req, res) {
  AdminUser.find({ email: req.body.email })
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
              const user = new AdminUser({
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
exports.login = function(req, res, next) {
  AdminUser.find({ email: req.body.email })
    .exec()
    .then(user => {
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
          });
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
          user[0].loginTrack
          return res.status(200).json({
            success: true,
            message: "Authentication successful",
            token: token
          });
        }
        res.status(401).json({
          success: false,
          message: "Authentication failed"
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: err
      });
    });
}

// Controller for deleting user
exports.delete = function(req, res, next) {
  AdminUser.remove({ _id: req.params.userId })
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
        message: "Error deleting the user",
        error: err
      });
    });
}

exports.test = function(req,res){
  res.send("This is test route!");
};

exports.getAllAdminUsers = function(req, res, next) {
  AdminUser.find({}, (err, users) => {
    if (err) {
      res.json({
        success: false,
        message: "Error while retrieving users"
      });
    }
    res.json({
      success: true,
      message: "Users retrieved successfully",
      users: users
    });
  });
};
