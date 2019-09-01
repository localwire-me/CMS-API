const mongoose = require('mongoose');
const Category = require('../models/category.model');

// Function for getting the list of all categories
exports.getAllCategories = function(req, res, next) {
  Category.find({})
    .exec()
    .then((categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Error in retrieving categories",
        error: err
      });
    });
};

// Function for getting a specific category
exports.getCategory = function(req, res, next) {
  const id = req.params.catId;
  Category.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          success: true,
          message: "Success",
          category: doc
        });
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "Error in category retrieval"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error in retrieving the category"
      })
    });
};

// Function for creating a specific category
exports.createCategory = function(req, res, next) {
  Category.findOne({ name: req.body.name }, (err, category) => {
    if (err) {
      res.json({
        success: false,
        message: "Error in category creation"
      });
    }
    if (category) {
      res.json({
        success: false,
        message: "Category already exists"
      });
    } else {
      let category = new Category();
      category.name = req.body.name;
      category.save()
        .then((doc) => {
          res.json({
            success: true,
            message: "Successfuly created category",
            category: doc
          });
        })
        .catch((err) => {
          res.json({
            success: false,
            message: "Error in category creation"
          }); 
        });
    }
  });
};

// Function for deleting a specific category
exports.deleteCategory = function(req, res, next) {
  let id = req.params.id;
  Category.findByIdAndDelete(id, (err, category) => {
    if (err) {
      res.json({
        success: false,
        message: "Error in deleting the category"
      });
    }
    if (category)  {
      res.json({
        success: true,
        message: "Category deleted successfully",
        category: category
      });
    } else {
      res.json({
        success: false,
        message: "Category not found"
      });
    }
  });
};

// Function for updating a specific category
exports.updateCategory = function(req, res, next) {
  Category.findById(req.params.catId)
    .exec()
    .then((category) => {
      category.name = req.body.name;
      category.save()
        .then(doc => {
          res.json({
            success: true,
            message: "Category updated successfully",
            updatedCategory: category
          })
        })
        .catch(err => {
          res.json({
            success: false,
            message: "Error in updating the category inner",
            error: err
          })
        });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Error in updating the category outer",
        error: err
      });
    })
};