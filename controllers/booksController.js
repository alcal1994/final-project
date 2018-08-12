var book = require( '../models/book' );

/* VIEWS */
// Index
exports.index = function( req, res, next ) {
  // create our locals parameter
  let locals = {
    title: 'books List'
  };

  book.find()
  .then( function ( books ) {
    // add the books to our locals
    locals.books = books;

    // render our view
    res.render( 'books/index', locals )
  })
  .catch( function ( err ) {
    next( err )
  });
};

// Show
exports.show = function ( req, res, next ) {
  // locals
  let locals = {
    title: 'book'
  };

  book.findById({
    _id: req.params.id
  })
  .then( function ( book ) {
    // add the books to our locals
    locals.book = book;

    // render our view
    res.render( 'books/show', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// New
exports.new = function ( req, res ) {
  // locals
  let locals = {
    title: 'New book'
  };

  res.render( 'books/new', locals )
};

// Edit
exports.edit = function ( req, res, next ) {
  // locals
  let locals = {
    title: 'Edit book'
  };

  book.findById({
    _id: req.params.id
  })
  .then( function ( book ) {
    // add the books to our locals
    locals.book = book;

    // render our view
    res.render( 'books/edit', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

/* ACTIONS */
// Create
exports.create = function ( req, res, next ) {
  // image
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }

  // additionals
  let additionals = null
  if (req.body['additional[bookType]'] && req.body['additional[genre]']) {
    // assign our fields results to variables
    let addit_bookTypes = req.body['additional[bookType]']
    let addit_genres = req.body['additional[genre]']

    // assign an empty array to additionals
    additionals =[]

    // populate if an array
    if ( addit_bookTypes && Array.isArray( addit_bookTypes ) ) {
      for (let i = 0; i < addit_bookTypes.length; i++) {
        additionals.push( { bookType: addit_bookTypes[i], genre: addit_genres[i] } )
      }
    } else {
      // populate if a string
      additionals.push( { bookType: addit_bookTypes, genre: addit_genres } )
    }
  }

  book.create({
    name: req.body.name,
    author:req.body.author,
    description: req.body.description,
    price: req.body.price,
    image: imageName,
    additionals: additionals
  })
  .then( function () {
    res.redirect( '/books' )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// Update
exports.update = function ( req, res, next ) {
  // images
  // image
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }

  // additionals
  let additionals = null
  if (req.body['additional[bookType]'] && req.body['additional[genre]']) {
    // assign our fields results to variables
    let addit_bookTypes = req.body['additional[bookType]']
    let addit_genres = req.body['additional[genre]']

    // assign an empty array to additfications
    additionals =[]

    // populate if an array
    if ( addit_bookTypes && Array.isArray( addit_bookTypes ) ) {
      for (let i = 0; i < addit_bookTypes.length; i++) {
        additionals.push( { bookType: addit_bookTypes[i], genre: addit_genres[i] } )
      }
    } else {
      // populate if a string
      additionals.push( { bookType: addit_bookTypes, genre: addit_genres } )
    }
  }

  book.findById( req.params.id )
  .then(function ( book ) {
    book.name = req.body.name
    book.author = req.body.author
    book.description = req.body.description
    book.price = req.body.price
    book.image = imageName
    book.additionals = additionals

    book.save()
    .then(  function () {
      res.redirect( '/books' )
    })
    .catch( function ( err ) {
      next( err )
    })
  })
  .catch(function ( err ) {
    next( err )
  })
};

// Delete
exports.delete = function ( req, res ) {
  book.remove({
    _id: req.body.id
  })
  .then( function () {
    res.redirect( '/books' )
  })
  .catch( function ( err ) {
    next( err )
  })
};
