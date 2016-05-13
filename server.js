// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var Bear = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // go to next routes without stopping
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ---------------------------------------------

router.route('/bears')

	// create a bear (accessed at POST http://localhost:808/api/bears)
	.post(function(req, res) {

		var bear = new Bear();      
		bear.name = req.body.name; // sets the bear's name from request

		// save the bear and check for errors
		bear.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message : 'Bear created!' });
		});
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err) {
                res.send(err);
			}
            res.json(bears);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
