var express = require('express');
var router = express.Router();

// create a link to our drink model
var booksController = require('../controllers/booksController');

// index (http://my-app.com/books)
router.get( '/', booksController.index );

// new (http://my-app.com/books/new)
router.get( '/new', booksController.new );

// show (http://my-app.com/books/12345)
router.get( '/:id', booksController.show );

// edit (http://my-app.com/books/12345/edit)
router.get( '/:id/edit', booksController.edit );

// create (http://my-app.com/books)
router.post( '/', booksController.create );

// update (http://my-app.com/books/12345)
router.post( '/:id', booksController.update );

// delete (http://my-app.com/books/12345/delete)
router.post( '/:id/delete', booksController.delete );

// makes our file public to the application
module.exports = router;
