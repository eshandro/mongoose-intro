var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user.js')

mongoose.connect('mongodb://localhost/wingzingly');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/signup', function(req, res) {
	var user = new User ({
		email: req.body.email,
	});
	// This saves the new user document to the User collection
	// The _id is auto created during this save
	// 'user' vs. User - this is single instance
	user.save();
	res.render('confirm', {
		email: req.body.email,
		_id: user._id
	})
});

app.post('/changeEmail', function(req, res) {
	var oldemailId = req.body.oldemailId;
	User.findOneAndUpdate({_id: oldemailId}, {$set: {email: req.body.email} }, 
		function(error, user) {
			if(error) {
				res.send('There was an error changing your email address')
			}
			else {
				res.send('Your changed email is: ' + req.body.email)
			}
		});

});

app.get('/viewusers', function(req, res) {
	// First, access the database. callback is a 
	// 'nodeback' with 2 args: error and results, which
	// in this case is the users(array of objects)
	User.find({}, function(error, users) {

		if(error) {
			res.send(500, 'Error accessing users');
		}
		else {
			res.render('viewusers', {
				users: users 
			});
		}
	});
});

var server = app.listen(7482, function() {
	console.log('Express server listening on port ' + server.address().port);
});
