var mongoose = require('mongoose');
var Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [
  {
    name: 'Rocky River',
    image: 'https://i.kinja-img.com/gawker-media/image/upload/s--ELrsBT8h--/c9pd8amxevnsn36ldwd5.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },{
    name: 'Warm Ocean',
    image: 'http://travelchannel.sndimg.com/content/dam/images/travel/fullrights/2016/01/14/national-park-camping/camping-glacier-national-park-camping.jpg.rend.tccom.1280.960.jpeg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },{
    name: 'Cold Stream',
    image: 'https://i.kinja-img.com/gawker-media/image/upload/s--ELrsBT8h--/c9pd8amxevnsn36ldwd5.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

function seedDB(){
  //Remove All Campgrounds
  Campground.remove({}, function(err){
    // if(!err){
    //   console.log('Removed Everything');
    //   //Add Campgrounds
    //   data.forEach(function(seed){
    //     Campground.create(seed, function(err,campground){
    //       if(!err){
    //         console.log('Created New Campground');
    //         //Add Comments
    //         Comment.create({
    //           text: 'This place is great. No internet',
    //           author: 'Homer'
    //         }, function(err,comment){
    //           if(!err){
    //             campground.comments.push(comment);
    //             campground.save();
    //             console.log('Created New Comment');
    //           } else {
    //             console.log(err);
    //           }
    //         });
    //       } else {
    //         console.log(err);
    //       }
    //     });
    //   });
    // } else {
    //   console.log(err);
    // }
  });
}

module.exports = seedDB;
