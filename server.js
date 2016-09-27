var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');
var app = new express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/dist')));

// console.log(`@@@ we are in NODE_ENV: ${process.env.NODE_ENV} @@@`);
// if (process.env.NODE_ENV !== 'production') {
//   var webpack = require('webpack');
//   var webpackDevMiddleware = require('webpack-dev-middleware');
//   var webpackHotMiddleware = require('webpack-hot-middleware');
//   var config = require('./webpack.dev.config');
  
//   var compiler = webpack(config);
//   app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//   app.use(webpackHotMiddleware(compiler));
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var mongo_username = process.env.mongo_username;
var mongo_password = process.env.mongo_password;
var mongoURL = 'mongodb://' + mongo_username + ':' + mongo_password + '@ds011775.mlab.com:11775/heroku_4ftg2lgr';
var db, col; // declare database and collection variables
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
  res.sendFile(path.join(__dirname + '/index.html'));
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