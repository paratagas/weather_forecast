/**
 * Main server logic
 * 
 * @author Yauheni Svirydzenka <partagas@mail.ru>
 * @version 0.0.1
 * @copyright Yauheni Svirydzenka 2017
 */

// common modules:
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require("path");
const requestify = require('requestify'); 
const app = express();

// custom modules:
const cityIds = require('./lib/cityId');

const port = 4488;

// use to parse json data
app.use(bodyParser.json());

// use to create cross-domain requests (CORS)
app.use(cors());

// create path aliases to use them in index.html file
// otherwise the assets in it will not work and icons will not be shown
// scheme:
// app.use('/my_path_alias', express.static(path.join(__dirname, '/path_to_where/my_assets_are')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use('/skins', express.static(path.join(__dirname, '/codebase/skins')));
app.use('/bundle', express.static(path.join(__dirname, '/')));
app.use('/codebase', express.static(path.join(__dirname, '/codebase')));
app.use('/i18n', express.static(path.join(__dirname, '/codebase/i18n')));
app.use('/fonts', express.static(path.join(__dirname, '/codebase/fonts')));
app.use('/images', express.static(path.join(__dirname, '/images')));

/**
 * Get index page
 *
 * @param {string} URL
 * @param {function} Callback
 */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

/**
 * Send POST request to get data from Yahoo server
 *
 * @param {string} URL
 * @param {function} Callback
 */
app.post('/data', (req, res) => {
	var cityName = req.body.cityName ? req.body.cityName : "minsk";
	var cityWoeid = cityIds[cityName].woeid ? cityIds[cityName].woeid : 834463;
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(" + cityWoeid + ")%20and%20u%3D'c'&format=json&u=\'c\'&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    
    // use requestify in internal node.js requests
    requestify.get(url).then(function(response) {
	    res.end(response.body);
	});
});

/**
 * Listen to server with specified port
 *
 * @param {string} Port
 * @param {function} Callback
 */
app.listen(port, () => {
	// open browser on http://localhost:4488
	console.log('Server is running on http://localhost:' + port);
});
