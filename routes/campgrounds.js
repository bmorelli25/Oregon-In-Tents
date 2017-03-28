var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get('/', function(req,res){
  //Get all campgrounds from the database
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// NEW ROUTE - SHOW FORM TO CREATE NEW CAMPGROUND
router.get('/new', function(req,res){
  res.render('campgrounds/new');
});

// CREATE ROUTE - ADD NEW CAMPGROUND TO DB
router.post('/', function(req,res){
  // get data from form and add to campgrounds Array
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  };
  //Create a new Campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect('/campgrounds'); // redirect back to campground page
    }
  });
});

// SHOW ROUTE - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get('/:id', function(req,res){
  //find campground with provided ID and render show route for that campground
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

module.exports = router;
