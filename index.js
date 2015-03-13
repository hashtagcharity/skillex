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

app.listen(config.server.port);

console.log('Listening on ' + config.server.port);

app.get('/healthcheck', function(req, res) {
    res.send('yo');
});

app.post('/api/skills', function(req, res) {
    var skills = req.body.skills;
    console.log(skills);

    skills.forEach(function(skillName) {
        process.nextTick(function() {
            var skill = new Skill({
                name: skillName
            });
            skill.save(function(err) {
                if (err && err.code === 11000) {
                    console.log('Skill exists: %s', skillName);
                    return;
                }

                if (err) {
                    console.log(err);
                    return;
                }

                console.log('Skill added: %s', skillName);
            });
        });
    });

    res.end();
});
