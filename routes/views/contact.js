var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'contact';
  locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.enquirySubmitted = false;

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
      type: 'contact'
    });

    q.exec(function(err, results) {
      if (results) {
        locals.data = results;
      }
      next(err);
    });
  });

  // On POST requests, add the Enquiry item to the database
  view.on('post', {action: 'contact'}, function(next) {
    var newEnquiry = new Enquiry.model();
    var updater = newEnquiry.getUpdateHandler(req);

    updater.process(req.body, {
      // flashErrors: true,
      fields: 'name, email, phone, enquiryType, message',
      // errorMessage: 'There was a problem submitting your enquiry:',
    }, function(err) {
      if (err) {
        locals.validationErrors = err.detail;
        req.flash('error', 'Veuillez remplir tous les champs obligatoires.');
      } else {
        locals.enquirySubmitted = true;
      }
      next();
    });
  });

  view.render('contact');
};
