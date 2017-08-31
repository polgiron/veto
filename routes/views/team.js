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

  view.render('team');
};
