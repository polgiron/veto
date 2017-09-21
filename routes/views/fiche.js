var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var Fiche = keystone.list('Fiche');
  var locals = res.locals;

  locals.section = 'fiches';

  var Page = keystone.list('Page');
  view.on('init', function(next) {
    var q = Page.model.findOne({
      type: 'fiche'
    });

    q.exec(function(err, results) {
      if (results) {
        locals.data = results;
      }
      next(err);
    });
  });

  // Fiches for the menu
  view.on('init', function(next) {
    var q = Fiche.model.find({
      state: 'published'
    }).sort('sortOrder');

    q.exec(function(err, fiches) {
      if (fiches) {
        locals.fiches = fiches;
      }

      locals.activeFiche = 'introduction';

      if (req.params.fiche) {
        locals.activeFiche = req.params.fiche;
      } else {
        // locals.fiche = locals.fiches[0];
        // locals.activeFiche = locals.fiches[0].slug;
        return res.redirect('/fiches/' + locals.fiches[0].slug);
      }

      next(err);
    });
  });

  // Fiche
  if (req.params.fiche) {
    view.on('init', function(next) {
      var q = Fiche.model.findOne({
        slug: req.params.fiche
      }).populate('categories');

      q.exec(function(err, fiche) {
        if (fiche) {
          locals.fiche = fiche;
        } else {
          req.flash('error', 'Cette fiche n\'existe pas.');
          return res.redirect('/fiches');
        }
        next(err);
      });
    });
  }

  view.render('fiche');
};
