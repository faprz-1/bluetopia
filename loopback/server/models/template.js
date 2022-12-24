'use strict';

module.exports = function(Template) {

    Template.CreateOne = function(template, callback) {

    }

    Template.GetAll = function(callback) {
        Template.find({}, (err, templates) => {
            if(err) return callback(err);

            return callback(null, templates);
        });
    }

};
