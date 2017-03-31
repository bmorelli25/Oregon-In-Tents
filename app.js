var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    flash = require('connect-flash');

var Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

var app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true})); //setup body parser so we can use it
app.use(express.static(__dirname + '/public')); //serves the public directory so we can access it
app.set('view engine', 'ejs'); //Prevents us from having to specify '.ejs' elsewhere
app.use(flash());

// DATABASE CONFIGURATION
// mongoose.connect('mongodb://localhost/oregon_in_tents'); // LOCAL
// mongoose.connect(mongodb://<dbuser>:<dbpassword>@ds147900.mlab.com:47900/oregon-in-tents'); // REMOTE
mongoose.connect(process.env.DATABASE_URL); // REMOTE
// seedDB(); //Seed the DB with test data

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
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// ROUTES
app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log('Oregon-In-Tents is listening...');
});
