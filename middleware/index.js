var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'You must be logged in to do that.');
  res.redirect('/login');
};

middlewareObj.checkCampgroundOwnsership = function(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash('error', 'Campground not found');
        res.redirect('back');
      } else {
        //does user own campground?
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', 'Permission Denied');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You must be logged in to do that.');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        req.flash('error', 'Comment not found');
        res.redirect('back');
      } else {
        //does user own comment?
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash('error', 'Permission Denied');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You must be logged in to do that.');
    res.redirect('back');
  }
};

module.exports = middlewareObj;
