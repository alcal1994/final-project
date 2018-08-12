const mongoose = require( 'mongoose' );

// all model classes will inherit from
// the mongoose.Schema class
const additionalSchema = new mongoose.Schema({
  bookType: {
    type: String,
    required: 'Hard Cover or Soft Cover'
  },
  genre: {
    type: String,
    required: 'You must have a genre'
  }
});

const bookschema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter a book name.'
  },
  author: {
    type: String,
    required: 'Please enter an author name.'
  },
  description: {
    type: String,
    required: 'Please enter a book description.'
  },
  price: {
    type: String,
    required: 'Please enter a price.'
  },
  additionals: [additionalSchema],
  image: {
    type: String
  }
});

// make this class public
module.exports = mongoose.model( 'book', bookschema );
