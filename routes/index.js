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
	/*app.get('*', function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			res.redirect('https://www.urgences-et-consultants-veterinaires.com' + req.url);
		} else {
			next();
		}
	});*/
	app.get('/veterinaires-paris', function (req, res) {
		res.redirect('/');
	});
	app.get('/', routes.views.index);
	app.get('/fiches', routes.views.fiche);
	app.get('/fiches/:fiche', routes.views.fiche);
	app.get('/team', routes.views.team);
	app.get('/clinique', routes.views.clinique);
	app.get('/service', routes.views.service);
	app.all('/contact', routes.views.contact);
	app.get('/david.znaty', routes.views.perso);

	app.post(
    '/contact',
    routes.views.contact
  );

  // app.get('/admin', routes.views.index);
};
