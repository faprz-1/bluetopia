'use strict';

module.exports = function(Group) {

    Group.CreateOne = function(group, callback) {
        Group.create(group, (err, newGroup) => {
            return callback(err, newGroup);
        });
    }

    Group.GetAll = function(callback) {
        Group.find({}, (err, groups) => {
            return callback(null, groups);
        });
    }

};
