var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    evcheck = require('evcheck'),
    Skill = require('./Skill');

evcheck.checkVars(['PORT', 'DB_HOST', 'DB_PORT', 'DB_NAME'], function(err) {
    if (err) {
        console.log(err.message);
        process.exit(9);
    }
});

var config = {
    server: {
        port: process.env.PORT
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    }
};

var mongoose = mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name);
mongoose.connection.on('error', function(error) {
    console.log(error);
});

console.log('Mongo services at ' + config.db.host + ':' + config.db.port + '/' + config.db.name);

var app = express()
    .use(bodyParser.json());

console.log('Listening on ' + config.server.port);

var v1Router = require('./api/v1Router');
app.use('/api/v1', v1Router);

app.get('/healthcheck', function(req, res) {
    res.send('yo');
});
app.listen(config.server.port);
