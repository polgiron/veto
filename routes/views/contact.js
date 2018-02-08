var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var sgTransport = require('nodemailer-sendgrid-transport');
var nodemailer = require('nodemailer');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

  // Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	var Page = keystone.list('Page');

	view.on('init', function (next) {
		var q = Page.model.findOne({
			type: 'home',
		});

		q.exec(function (err, results) {
			if (results) {
				locals.phone = results.phone;
				locals.email = results.email;
			}
			next(err);
		});
	});

	view.on('init', function (next) {
		var q = Page.model.findOne({
			type: 'contact',
		});

		q.exec(function (err, results) {
			if (results) {
				locals.data = results;
			}
			next(err);
		});
	});

  // On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {
		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);
		updater.process(req.body, {
      // flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
      // errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.detail;
				req.flash('error', 'Veuillez remplir tous les champs obligatoires.');
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
		var options = {
			auth: {
				api_user: 'qmalguy',
				api_key: 'Telescope91',
			},
		};
		var smtpTransport = nodemailer.createTransport(sgTransport(options));
		var mailOptions = {
			to: 'contact@ucvet.fr',
			from: 'ucvet-contact-site@ucvet.com',
			subject: 'Un client viens de vous contacter',
			text: 'Vous venez de recevoir un message de la part de : \'' + req.body.name + '\'.\n'
        + 'email: ' + req.body.email + '\'.\n'
      + 'Teléphone: \'' + req.body.phone + '\'.\n '
      + 'Message: \'' + req.body.message + '\'',
		};

		smtpTransport.sendMail(mailOptions, function (err) {
			if (err) throw err;
		});

	});

	view.render('contact');
};
