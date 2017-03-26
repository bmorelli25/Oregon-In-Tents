var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true})); //setup body parser so we can use it
app.set('view engine', 'ejs'); //Prevents us from having to specify '.ejs' elsewhere

// Temporary Array prior to adding in a DB
var campgrounds = [
  {
    name: 'campsite 1',
    image: 'http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg'
  },{
    name: 'campsite 2',
    image: 'http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg'
  },{
    name: 'campsite 3',
    image: 'https://i.kinja-img.com/gawker-media/image/upload/s--ELrsBT8h--/c9pd8amxevnsn36ldwd5.jpg'
  }
];

app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function(req,res){
  res.render('new.ejs');
});

app.post('/campgrounds', function(req,res){
  // get data from form and add to campgrounds Array
  var name = req.body.name;
  var image = req.body.image;
  campgrounds.push({ name:name, image:image});
  // redirect back to campground page
  res.redirect('/campgrounds');
});

app.listen(3000, function(){
  console.log('Oregon listening on PORT 3000');
});
