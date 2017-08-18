// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

keystone.init({
  'name': 'veto',
  'brand': 'veto',

  'sass': 'static',
  'static': 'static',
  'favicon': 'static/favicon.ico',
  'views': 'templates/views',
  'view engine': '.html',
  'custom engine': cons.nunjucks,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',

  'cloudinary secure': true,
  'file limit': '50MB',
});

keystone.import('models');

keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
  enquiries: 'enquiries',
  users: 'users',
  galleries: 'galleries',
  images: 'images',
});

keystone.start();
