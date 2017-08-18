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

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  generateGalleryNav(view, locals, req);

  view.render('index');
};
