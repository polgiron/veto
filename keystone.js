// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

keystone.init({
  'name': 'UC VET',
  'brand': 'UC VET',

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

  'wysiwyg additional options': { 'external_plugins': { 'uploadimage': '/js/uploadimage/plugin.min.js' } },
  // 'wysiwyg additional plugins': 'uploadimage',
  // 'wysiwyg menubar': true,
  'wysiwyg override toolbar': true,
  // 'wysiwyg additional buttons': 'styleselect, uploadimage',
  'wysiwyg additional buttons': 'styleselect, bold italic, alignleft aligncenter alignright alignjustify, bullist numlist outdent indent, link uploadimage, removeformat',

  'admin path': 'cliniqueadmin',
  'signin logo': ['/images/logo.svg', 200, 200],
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
  pages: 'pages',
  fiches: ['fiches', 'fiche-categories'],
  members: 'members',
  enquiries: 'enquiries',
  users: 'users',
});

keystone.start();
