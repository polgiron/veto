var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  var Page = keystone.list('Page');
  view.on('init', function(next) {
    var q = Page.model.findOne({
      type: 'perso'
    });

    q.exec(function(err, results) {
      if (results) {
        locals.data = results;
      }
      next(err);
    });
  });

  view.render('perso');
};
