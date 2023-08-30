'use strict';

module.exports = function(School) {

    School.CreateOne = function(school, callback) {
        if(!school) return callback(null, {});
        School.findOrCreate({
            where: {name: {
                regexp: `${school.name}`,
                options: 'i'
            }}
        }, school, (err, newSchool) => {
            if(err) return callback(err);

            return callback(null, newSchool);
        });
    }

    School.Update = function(data, callback) {
        if(!data) return callback(null, {});

        School.upsert(data, (err, school) => {
            if(err) return callback(err);

            return callback(null, school);
        });
    }

};