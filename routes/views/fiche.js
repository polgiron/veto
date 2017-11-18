var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var FicheCategory = keystone.list('FicheCategory');
  var Fiche = keystone.list('Fiche');
  var locals = res.locals;

  locals.section = 'fiches';

  var Page = keystone.list('Page');

  view.on('init', function(next) {
    var q = Page.model.findOne({
      type: 'home'
    });

    q.exec(function(err, results) {
      if (results) {
        locals.phone = results.phone;
        locals.email = results.email;
      }
      next(err);
    });
  });

  // Page intro

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
    var q = FicheCategory.model.find().sort('sortOrder');

    q.exec(function(err, results) {
      if (err || !results.length) {
        return next(err);
      }

      locals.data.categories = results;

      next(err);
    });
  });

  view.on('init', function(next) {
    var q = Fiche.model.find({
      state: 'published'
    }).populate('category').sort('sortOrder');

    q.exec(function(err, fiches) {
      if (fiches) {
        locals.data.fiches = fiches;
      }

      locals.activeFiche = 'introduction';

      if (req.params.fiche) {
        locals.activeFiche = req.params.fiche;
      } else {
        return res.redirect('/fiches/' + locals.data.fiches[0].slug);
      }

      next(err);
    });
  });

  // Fiche

  if (req.params.fiche) {
    view.on('init', function(next) {
      var q = Fiche.model.findOne({
        slug: req.params.fiche
      }).populate('category');

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
