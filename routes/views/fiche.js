var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var Fiche = keystone.list('Fiche');
  var locals = res.locals;

  locals.section = 'fiches';

  view.on('init', function(next) {
    var q = Fiche.model.find();

    q.exec(function(err, fiches) {
      if (fiches) {
        locals.fiches = fiches;
      }

      locals.activeFiche = 'introduction';

      if (req.params.fiche) {
        locals.activeFiche = req.params.fiche;
      }

      next(err);
    });
  });

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
