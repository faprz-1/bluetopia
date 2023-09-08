'use strict';
const { randomUUID } = require('crypto');

module.exports = function(StudentGroup) {

    StudentGroup.CreateOne = function(studentGroup, callback) {
        if(!studentGroup.schoolId) return callback('schoolId not valid');
        StudentGroup.find({
            where: {
                schoolId: studentGroup.schoolId,
                gradeId: studentGroup.gradeId,
                groupId: studentGroup.groupId,
            },
            limit: 1
        }, (err, studentGroups) => {
            if(err) return callback(err);
            if(!!studentGroups.length) studentGroup.registerUid = studentGroups[0].registerUid;
            StudentGroup.create(studentGroup, (err, newStudentGroup) => {
                return callback(err, newStudentGroup);
            });
        });
    }

    StudentGroup.GenerateRegisterUid = function(schoolId, gradeId, groupId, callback) {
        let uid = randomUUID();
        StudentGroup.updateAll({schoolId, gradeId, groupId}, {registerUid: uid}, (err, studentsgroups) => {
            if(err) return callback(err);

            return callback(null, uid);
        });
    }

    StudentGroup.GetByRegisterUid = function(registerUid, callback) {
        StudentGroup.find({
            where: {registerUid},
            include: 'student'
        }, (err, studentGroups) => {
            if(err) return callback(err);
            if(!studentGroups.length) return callback('registerUid not valid!!');
            return callback(null, studentGroups);
        });
    }

};
