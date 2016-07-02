var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var app = new express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 3000;

var db, col;
var mongoURL = 'mongodb://localhost/ngu';
mongo.connect(mongoURL, function(err, database) {   
  if (err) throw err;
  
  db = database;
  col = db.collection('data');
  
  app.listen(port, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', function(req, res) {
  col.find({}).toArray(function(err, data) {
    if (err) throw err;
    var thing = data[0];
    res.json(thing);
  });
});

app.post('/data', function(req, res) {
  col.findOneAndUpdate({}, req.body);
  res.end();
});