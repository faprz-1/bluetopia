'use strict';

module.exports = function(Group) {

    Group.CreateOne = function(group, callback) {
        group.name = group.name.toLowerCase();
        Group.findOrCreate({
            where: {
                name: {like: `%${group.name}%`}
            }
        }, group, (err, newGroup) => {
            return callback(err, newGroup);
        });
    }

    Group.CreateBasedOnStudentsInCSV = function(students, callback) {
        let groups = [], newGroups = [];
        students.forEach(student => {
            if(!groups.includes(student.group)) groups.push(student.group);
        });

        let cont = 0, limit = groups.length;
        if(!limit) return callback(null, newGroups);
        groups.forEach(group => {
            const newGroup = {
                name: group
            }

            Group.CreateOne(newGroup, (err, newGroup) => {
                if(err) return callback(err);

                newGroups.push(newGroup);
                if(++cont == limit) return callback(null, newGroups);
            });
        });
    }

    Group.GetAll = function(callback) {
        Group.find({}, (err, groups) => {
            return callback(err, groups);
        });
    }

};
