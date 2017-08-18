var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

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

  // Set locals
  locals.section = 'contact';
  locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.enquirySubmitted = false;

  // On POST requests, add the Enquiry item to the database
  view.on('post', { action: 'contact' }, function (next) {
    var newEnquiry = new Enquiry.model();
    var updater = newEnquiry.getUpdateHandler(req);

    updater.process(req.body, {
      flashErrors: true,
      fields: 'name, email, phone, enquiryType, message',
      errorMessage: 'There was a problem submitting your enquiry:',
    }, function (err) {
      if (err) {
        locals.validationErrors = err.errors;
      } else {
        locals.enquirySubmitted = true;
      }
      next();
    });
  });

  view.render('contact');
};
