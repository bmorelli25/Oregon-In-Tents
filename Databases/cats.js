var mongoose = require('mongoose');

//connect to the database. If it doesn't exist, it will be created
mongoose.connect('mongodb://localhost/cat_demo');

//Tells the JS that a cat should be defined as this. Provides structure to our code:
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

//Take the schema(which is a pattern) and compile it into a model and save to variable
//Builds a model with all of the methods we need to use.
//The 'Cat' is always singular. Mongoose will create a collection of the pluralized word.
var Cat = mongoose.model('Cat', catSchema);

//create and add cat to the database
Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Nice"
}, function(err,cat){
  if(err){
    console.log(err);
  } else {
    console.log(cat)
  }
});

//retrieve all cats from the database
Cat.find({}, function(err, cats){
  if(err){
    console.log('Error: ', err);
  } else {
    console.log(cats);
  }
});
