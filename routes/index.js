var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
  // Views
  app.get('/', routes.views.index);
  app.all('/contact', routes.views.contact);
  app.all('/signin', routes.views.session.signin);
  app.get('/signout', routes.views.session.signout);
  app.get('/gallery/:gallery', routes.views.gallery);
};
