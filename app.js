var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    seedDB = require('./seeds');
var app = express();

seedDB();
var Campground = require('./models/campground');

mongoose.connect('mongodb://localhost/oregon_in_tents'); //create local DB
app.use(bodyParser.urlencoded({extended:true})); //setup body parser so we can use it
app.set('view engine', 'ejs'); //Prevents us from having to specify '.ejs' elsewhere



app.get('/', function(req,res){
  res.render('landing');
});

// INDEX ROUTE - SHOW ALL CAMPGROUNDS
app.get('/campgrounds', function(req,res){
  //Get all campgrounds from the database
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('index', {campgrounds: allCampgrounds});
    }
  });
});

// NEW ROUTE - SHOW FORM TO CREATE NEW CAMPGROUND
app.get('/campgrounds/new', function(req,res){
  res.render('new');
});

// CREATE ROUTE - ADD NEW CAMPGROUND TO DB
app.post('/campgrounds', function(req,res){
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
app.get('/campgrounds/:id', function(req,res){
  //find campground with provided ID and render show route for that campground
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, function(){
  console.log('Oregon listening on PORT 3000');
});
