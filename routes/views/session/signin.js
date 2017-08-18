var keystone = require('keystone');

var generateGalleryNav = function(view, locals, req) {
  // Gallery nav
  var Gallery = keystone.list('Gallery');
  view.on('init', function(next) {
    Gallery.model.find().where('private', false).exec(function(err, result) {
      locals.galleryNavPublic = result;
      next(err);
    });
  });
  view.on('init', function(next) {
    if (req.user) {
      var q;

      if (req.user.isAdmin) {
        q = Gallery.model.find().where('private', true);
      } else {
        q = Gallery.model.find().where('private', true).where('client', req.user);
      }

      q.exec(function(err, result) {
        locals.galleryNavPrivate = result;
        next(err);
      });
    } else {
      next();
    }
  });
}

exports = module.exports = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }

  var view = new keystone.View(req, res);
  var locals = res.locals;

  generateGalleryNav(view, locals, req);

  locals.section = 'signin';



  // Gallery menu
  var Gallery = keystone.list('Gallery');
  view.on('init', function(next) {
    Gallery.model.find().exec(function(err, result) {
      locals.galleryNav = result;
      next(err);
    });
  });



  view.on('post', {action: 'signin'}, function(next) {
    if (!req.body.email || !req.body.password) {
      req.flash('error', 'Please enter your username and password.');
      return next();
    }

    var onSuccess = function() {
      res.redirect('/');
    }

    var onFail = function() {
      req.flash('error', 'Your username or password were incorrect, please try again.');
      return next();
    }

    keystone.session.signin({email: req.body.email, password: req.body.password}, req, res, onSuccess, onFail);
  });

  view.render('signin');
}
