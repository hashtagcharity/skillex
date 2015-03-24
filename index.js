var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('config'),
    Skill = require('./Skill');

var mongoose = mongoose.connect('mongodb://' + config.db.store.host + ':' + config.db.store.port + '/' + config.db.name);
mongoose.connection.on('error', function(error) {
    console.log(error);
});

console.log('Mongo services at ' + config.db.store.host + ':' + config.db.store.port + '/' + config.db.name);

var app = express()
    .use(bodyParser.json());

console.log('Running in ' + process.env.NODE_ENV);
console.log('Listening on ' + config.server.port);

var v1Router = require('./api/v1Router');
app.use('/api/v1', v1Router);

app.get('/healthcheck', function(req, res) {
    res.send('yo');
});
app.listen(config.server.port);
