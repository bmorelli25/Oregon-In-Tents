var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

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
router.get('/new', middleware.isLoggedIn, function(req,res){
  res.render('campgrounds/new');
});

// CREATE ROUTE - ADD NEW CAMPGROUND TO DB
router.post('/', middleware.isLoggedIn, function(req,res){
  // get data from form and add to campgrounds Array
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: author
  };
  //Create a new Campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      req.flash('success', 'Successfully added Campground');
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

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnsership, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      res.redirect('/campgrounds');
    } else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnsership, function(req,res){
  var campground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  };
  Campground.findByIdAndUpdate(req.params.id, campground, function(err, updatedCampground){
    if(err){
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnsership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
