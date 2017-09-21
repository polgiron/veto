var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'team';

  var Member = keystone.list('Member');
  view.on('init', function(next) {
    var q = Member.model.find({
      state: 'published'
    }).sort('sortOrder');

    q.exec(function(err, results) {
      if (results) {
        locals.members = results;
      }
      next(err);
    });
  });

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

  view.on('init', function(next) {
    var q = Page.model.findOne({
      type: 'equipe'
    });

    q.exec(function(err, results) {
      if (results) {
        locals.data = results;
      }
      next(err);
    });
  });

  view.render('team');
};
