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
  var view = new keystone.View(req, res);
  var Gallery = keystone.list('Gallery');
  var locals = res.locals;

  generateGalleryNav(view, locals, req);

  view.on('init', function(next) {
    var q = Gallery.model.findOne({
      slug: req.params.gallery
    }).populate('images');

    q.exec(function(err, gallery) {
      if (gallery) {
        // Is gallery private?
        if (gallery.private) {
          if (req.user && (req.user.isAdmin || gallery.client.equals(req.user._id))) {
            // You can enter
          } else {
            // Redirect to home with an error message
            req.flash('error', 'This is a private gallery, please sign in.');
            return res.redirect('/');
          }
        }

        locals.title = gallery.name;
        locals.section = gallery.slug;
        locals.gallery = gallery;
        next(err);
      } else {
        // Redirect to home with an error message
        req.flash('error', 'This gallery doesn\'t exist.');
        return res.redirect('/');
      }
    });
  });

  view.render('gallery');
};
