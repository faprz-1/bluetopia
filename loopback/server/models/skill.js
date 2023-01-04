'use strict';

module.exports = function(Skill) {

    Skill.CreateOne = function(skill, callback) {
        Skill.findOne({
            where: {
                name: {like: `%${skill.name}%`}
            }
        }, (err, skillFound) => {
            if(err) return callback(err);

            if(!!skillFound) return callback(null, skillFound);
            
            Skill.create(skill, (err, newSkill) => {
                if(err) return callback(err);

                return callback(null, newSkill);
            });
        });
    }

    Skill.GetAll = function(callback) {
        Skill.find((err, skills) => {
            if(err) return callback(err);

            return callback(null, skills);
        });
    }

};
