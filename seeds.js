var mongoose = require('mongoose');
var Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [
  {
    name: 'Rocky River',
    image: 'https://i.kinja-img.com/gawker-media/image/upload/s--ELrsBT8h--/c9pd8amxevnsn36ldwd5.jpg',
    description: 'blah blah blah blah blah'
  },{
    name: 'Warm Ocean',
    image: 'http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-glacier-national-park-camping.jpg.rend.tccom.1280.960.jpeg',
    description: 'adf e fjaef jfa efo afe oef '
  },{
    name: 'Cold Stream',
    image: 'https://i.kinja-img.com/gawker-media/image/upload/s--ELrsBT8h--/c9pd8amxevnsn36ldwd5.jpg',
    description: '1234 15 145 245 134 514 5'
  }
];

function seedDB(){
  //Remove All Campgrounds
  Campground.remove({}, function(err){
    if(!err){
      console.log('Removed Everything');
      //Add Campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err,campground){
          if(!err){
            console.log('Created New Campground');
            //Add Comments
            Comment.create({
              text: 'This place is great. No internet',
              author: 'Homer'
            }, function(err,comment){
              if(!err){
                campground.comments.push(comment);
                campground.save();
                console.log('Created New Comment');
              } else {
                console.log(err);
              }
            });
          } else {
            console.log(err);
          }
        });
      });
    } else {
      console.log(err);
    }
  });
};

module.exports = seedDB;
