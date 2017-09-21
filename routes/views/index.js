var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'home';

  // Page
  var Page = keystone.list('Page');
  view.on('init', function(next) {
    var q = Page.model.findOne({
      type: 'home'
    });

    q.exec(function(err, results) {
      if (results) {
        locals.data = results;
      }
      next(err);
    });
  });

  // Fiches
  var Fiche = keystone.list('Fiche');
  view.on('init', function(next) {
    var q = Fiche.model.find({
      isHighlight: true,
      state: 'published'
    }).populate('categories').sort('sortOrder');

    q.exec(function(err, results) {
      if (results) {
        locals.ficheHighlight = results;

        // locals.ficheHighlight.forEach(function(fiche) {
        //   if (fiche.name.length >= 30) {
        //     fiche.name = fiche.name.substring(0, 30) + '...';
        //   }
        // });
      }
      next(err);
    });
  });

  // Members
  var Member = keystone.list('Member');
  view.on('init', function(next) {
    var q = Member.model.find({
      isHighlight: true,
      state: 'published'
    }).sort('sortOrder');

    q.exec(function(err, results) {
      if (results) {
        locals.memberHighlight = results;
      }
      next(err);
    });
  });

  view.render('index');
};
