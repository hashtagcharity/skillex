var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Skill = require('./Skill');

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

if (!config.server.port || !config.db.host || !config.db.port || !config.db.name) {
    console.log('Please set all the required environment variables');
    console.log('Current config %j', config);
    process.exit(0);
}

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
