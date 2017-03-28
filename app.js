var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

var Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

var app = express();
app.use(bodyParser.urlencoded({extended:true})); //setup body parser so we can use it
app.use(express.static(__dirname + '/public')); //serves the public directory so we can access it
app.set('view engine', 'ejs'); //Prevents us from having to specify '.ejs' elsewhere

// DATABASE CONFIGURATION
mongoose.connect('mongodb://localhost/oregon_in_tents'); //create and/or set local DB
seedDB(); //Seed the DB with test data

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'orygun camping is fun broski',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  //whatver we put in res.locals is avail on every route
  res.locals.currentUser = req.user;
  next();
});

// ROUTES

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
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// NEW ROUTE - SHOW FORM TO CREATE NEW CAMPGROUND
app.get('/campgrounds/new', function(req,res){
  res.render('campgrounds/new');
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
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// =========================
// COMMENTS ROUTES
// =========================

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err,campground){
    if(err){
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err,campground){
    if(err){
      console.log(err);
      res.redirect('/campgrounds')
    } else {
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});


// AUTH ROUTES

app.get('/register', function(req,res){
  res.render('register');
});

app.post('/register', function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req,res,function(){
      res.redirect('/campgrounds');
    });
  });
});

app.get('/login', function(req,res){
  res.render('login');
});

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), function(req,res){
});

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/campgrounds');
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

app.listen(3000, function(){
  console.log('Oregon listening on PORT 3000');
});
