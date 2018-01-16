var _ = require('lodash');
var keystone = require('keystone');

/**
  Initialises the standard view locals
*/
exports.initLocals = function (req, res, next) {
  res.locals.navLinks = [
    { label: 'Accueil', key: 'home', href: '/' },
    { label: 'La clinique', key: 'clinique', href: '/clinique' },
    { label: 'Service itinérant', key: 'service', href: '/service' },
    { label: 'L\'équipe', key: 'team', href: '/team' },
    { label: 'Fiches pratiques', key: 'fiches', href: '/fiches' },
    { label: 'Contact', key: 'contact', href: '/contact' },
  ];
  res.locals.user = req.user;
  next();
};


/**
  Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error'),
  };
  res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
  next();
};


/**
  Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
};
