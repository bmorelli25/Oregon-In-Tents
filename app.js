var express = require('express');
var app = express();

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

app.set('view engine', 'ejs'); //Prevents us from having to specify '.ejs' elsewhere

app.get('/', function(req,res){
  res.render('landing');
});

app.get('/campgrounds', function(req,res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, function(){
  console.log('Oregon listening on PORT 3000');
});
