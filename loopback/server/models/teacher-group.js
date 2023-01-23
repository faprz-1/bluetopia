'use strict';

module.exports = function(TeacherGroup) {

    TeacherGroup.UpdateTeacherGroups = function(teacherId, teacherGroups, callback) {
        let where = {
            teacherId,
            id: {
                nin: teacherGroups.map(teacherGroup => teacherGroup.id).filter(id => id)
            }
        };
        TeacherGroup.destroyAll(where, (err, destroyed) => {
            if(err) return callback(null, err);

            let groupsToAdd = teacherGroups.filter(teacherGroup => !teacherGroup.id);
            let cont = 0, limit = groupsToAdd.length;

            if(!limit) return callback(null, teacherGroups);
            TeacherGroup.app.models.Grade.CreateBasedOnCSV(groupsToAdd, (err, grades) => {
                if(err) return callback(null, err);

                TeacherGroup.app.models.Group.CreateBasedOnCSV(groupsToAdd, (err, groups) => {
                    if(err) return callback(null, err);

                    
                    groupsToAdd.forEach(teacherGroup => {
                        const gradeId = grades.find(g => g.name == teacherGroup.grade) ? grades.find(g => g.name == teacherGroup.grade).id : null;
                        const groupId = groups.find(g => g.name == teacherGroup.group) ? groups.find(g => g.name == teacherGroup.group).id : null;
                        const teacherGroupInstance = {
                            teacherId,
                            gradeId,
                            groupId,
                        }

                        TeacherGroup.findOrCreate({
                            where: {
                                groupId,
                                gradeId,
                                teacherId
                            }
                        }, teacherGroupInstance, (err, newTeacherGroup) => {
                            if(err) return callback(err);

                            if(++cont == limit) return callback(null, teacherGroups);
                        });
                    });
                });
            });
        });
    }

};
