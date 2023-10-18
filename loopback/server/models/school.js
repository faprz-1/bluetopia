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

    School.Update = function(school, callback) {
        if(!school) return callback(null, {});

        School.upsert(school, (err, school) => {
            if(err) return callback(err);

            return callback(null, school);
        });
    }

    School.prototype.UpdateData = function(school, callback) {
        if(!school) return callback(null, false);
        school.school.name = school.name
        School.upsert(school.school, (err, schoolupdated) => {
            if(err) return callback(err);
            School.app.models.UserData.Update(school.data, (err, updated) => {
        if(err) return callback(err);
       let usuarioData = {
        id : school.data.userId,
            name : school.name,
            email : school.email
        }
        School.app.models.Usuario.upsert(usuarioData, (err, updated) => {
            if(err) return callback(err);

    return callback(null, school);
});
});
});
    }

};
