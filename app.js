var express       = require('express');
var handlebars    = require('express-handlebars');
var fs            = require('fs');
var session       = require('express-session');
var flash         = require('connect-flash');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');


var app = express();

app.use(flash());

app.use(session({
  secret: 'octocat',
  saveUninitialized: false, // does not save uninitialized session.
  resave: false             // does not save session if not modified.
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

// This does the setup for static file serving. It uses express'
// static middleware to look for files in /public if no other route
// matches. We use the __dirname special variable which indicates the
// directory this server is running in and append it to '/public'.
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var user = req.session.user;	
  var message = req.flash('home');
  res.render('home', {
  	current_user: user,
  	message: message
  });
});

app.get('/foodcode', function (req, res) {
  	var user = req.session.user;	
  	res.render('foodcode', {
  		current_user: user
  	});
});

app.get('/create', function (req, res) {
    var user = req.session.user;  
    res.render('create', {
      current_user: user
    });
});

app.use('/violations', require('./routes/violation_routes'));
app.use('/inspections', require('./routes/inspection_routes'));
app.use('/users', require('./routes/user_routes'));
app.use('/establishments', require('./routes/food_establishment_routes'));

// Starts the express application up on the port specified by the
// application variable 'port' (which was set above). The second
// parameter is a function that gets invoked after the application is
// up and running.
app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' +
              app.get('port') + '; press Ctrl-C to terminate');
});
