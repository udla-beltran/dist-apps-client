// Import required node modules
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// Creates app
const app = express();

// Configures app
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.engine(
	'.hbs',
	engine({
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		defaultLayout: 'main',
		extname: '.hbs',
	})
);
app.set('view engine', '.hbs');

// Configures middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configures app routes
app.use('/', require(path.join(__dirname, './routes/index.routes')));

// Configures app public
app.use(express.static(path.join(__dirname, 'public')));

// Listen app at port
app.listen(app.get('port'), () => {
	console.log('app running at port', app.get('port'));
});
