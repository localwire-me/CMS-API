const Tag = require('../models/tag.model');

// Function for getting a specific tag based on the id of the tag
exports.getTag = function(req, res, next) {
  const id = req.params.tagId;
  Tag.findById(id)
    .exec()
    .then((tag) => {
      res.json({
        success: true,
        message: "Successfully retrieved the tag",
        tag: tag
      })
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "Error in retrieving the tag",
        error: error
      })
    });
};

// Function for retrieving all the tags
exports.getAllTags = function(req, res, next) {
  Tag.find({})
  .exec()
  .then((tags) => {
    res.json({
      success: true,
      message: "Successfully retrieved the tags",
      tags: tags
    });
  })
  .catch((error) => {
    res.json({
      success: false,
      message: "Error in retrieving the tags",
      error: error
    });
  });
};

// Functoin for creating a tag
exports.createTag = function(req, res, next) {
  Tag.findOne({ name: req.body.name }, (err, tag) => {
    if (err) {
      res.json({
        success: false,
        message: "Error in creating tag",
        error: err
      });
    }
    if (tag) {
      res.json({
        success: false,
        message: "Tag already exist"
      });
    } else {
        let tag = new Tag();
        tag.name = req.body.name;
        tag.isArchived = false;
        tag.save()
          .then((doc) => {
            res.json({
              success: true,
              message: "Successfully created tag",
              tag: tag
            });
          })
          .catch((error) => {
            res.json({
              success: false,
              message: "Error in creating tag",
              error: error
            })
          });
      }
  });
};

// Function for deleting a tag
exports.deleteTag = function(req, res, next) {
  const id = req.body.tagId;
  Tag.findByIdAndDelete(id, (err, tag) => {
    if (err) {
      res.json({
        success: false,
        message: "Error in deleting the tag",
        error: err
      });
    }
    if (tag) {
      res.json({
        success: true,
        message: "Successully deleted the tag",
        tag: tag
      });
    } else {
      res.json({
        success: false,
        message: "Error in deleting the tag",
      })
    }
  });
};

exports.updateTag = function(req, res, next) {
  Tag.findOne({ _id: req.params.id }, (err, tag) => {
    if (err) {
      res.json({
        success: false,
        message: "Error in updating the tag"
      });
    } else {
      Tag.updateOne({ _id: req.params.id }, { name: req.body.name, isArchived: req.body.isArchived }, (err, tag) => {
        if (err) {
          
        }
      });
    }
  });
};