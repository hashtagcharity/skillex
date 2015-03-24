module.exports = function() {

    var express = require('express'),
        Skill = require('../Skill'),
        apiRouter = express.Router();

    apiRouter.post('/skills', function(req, res) {
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

    return apiRouter;
}();
