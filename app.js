var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/oregon_in_tents'); //create local DB

app.use(bodyParser.urlencoded({extended:true})); //setup body parser so we can use it
app.set('view engine', 'ejs'); //Prevents us from having to specify '.ejs' elsewhere

//Schema and Model setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//   name: 'campsite 3',
//   image: 'https://i.kinja-img.com/gawker-media/image/upload/s--ELrsBT8h--/c9pd8amxevnsn36ldwd5.jpg',
//   description: 'A lovely campground atop a mountain in the Easter Gorge area.'
// }, function(err,campground){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(campground);
//   }
// });

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
