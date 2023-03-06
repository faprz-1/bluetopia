'use strict';
var uuidV4 = require('uuid/v4');

module.exports = function(Teacher) {

    Teacher.AddTeacher = function(teacher, callback) {
        Teacher.findOne({
            where: {
                email: teacher.email
            }
        }, (err, teacherFound) => {
            if(err) return callback(err);
            
            if(!!teacherFound) return callback(null, teacherFound);

            Teacher.app.models.Subject.find({
                where: {
                    or: teacher.subjects.map(subject => {
                        if(typeof subject === 'string') return {name: {like: `%${subject.toLowerCase()}%`}}
                        else if(!!subject.id) return {id: subject.id};
                        else if(!!subject.name) return {name: {like: `%${subject.name.toLowerCase()}%`}};
                        else return null;
                    }).filter(filter => filter != null)
                }
            }, (err, subjects) => {
                if(err) return callback(err);

                if(!teacher.active) teacher.activationToken = uuidV4();
                Teacher.create(teacher, (err, newTeacher) => {
                    if(err) return callback(err);

                    let cont = 0, limit = subjects.length;
                    if(!newTeacher.userId) {
                        newTeacher.Activate(null, (err, teacherActive) => {
                            if(err) return callback(err);

                            if(!limit) return callback(null, newTeacher);
                            subjects.forEach(subject => {
                                newTeacher.subjects.add(subject.id, (err) => {
                                    if(err) return callback(err);
                                    if(++cont == limit) return callback(null, newTeacher);
                                });
                            });
                        });
                    } else {
                        if(!limit) return callback(null, newTeacher);
                        subjects.forEach(subject => {
                            newTeacher.subjects.add(subject.id, (err) => {
                                if(err) return callback(err);
                                if(++cont == limit) return callback(null, newTeacher);
                            });
                        });
                    }
                });
            });
        });
    }

    Teacher.AddTeachers = function(teachers, callback) {
        if(!teachers) return callback(null, []);
        let cont = 0, limit = teachers.length, newTeachers = [];
        if(!limit) return callback(null, newTeachers);
        Teacher.app.models.Group.CreateBasedOnCSV(teachers, (err, groups) => {
            if(err) return callback(err);

            Teacher.app.models.Grade.CreateBasedOnCSV(teachers, (err, grades) => {
                if(err) return callback(err);
                
                teachers.forEach(teacher => {
                    Teacher.AddTeacher(teacher, (err, newTeacher) => {
                        if(err) return callback(err);
                        
                        const gradeId = grades.find(g => g.name == teacher.grade.toLowerCase()) ? grades.find(g => g.name == teacher.grade.toLowerCase()).id : null;
                        const groupId = groups.find(g => g.name == teacher.group.toLowerCase()) ? groups.find(g => g.name == teacher.group.toLowerCase()).id : null;
                        const teacherGroupInstance = {
                            teacherId: newTeacher.id,
                            gradeId,
                            groupId,
                        }
                        Teacher.app.models.TeacherGroup.findOrCreate({
                            where: {
                                groupId,
                                gradeId,
                                teacherId: newTeacher.id
                            }
                        }, teacherGroupInstance, (err, newTeacherGroup) => {
                            if(err) return callback(err);

                            if(++cont == limit) return callback(null, newTeachers);
                        });
                    });
                });
            });
        });
    }

    Teacher.GetAllOfSchool = function(schoolUserId, callback) {
        Teacher.find({
            where: {
                schoolUserId
            },
            include: ['subjects', {'teacherGroups': ['grade', 'group']}]
        }, (err, schoolTeachers) => {
            if(err) return callback(err);

            return callback(null, schoolTeachers);
        });
    }

    Teacher.prototype.UpdateData = function(teacher, callback) {
        Teacher.app.models.TeacherGroup.UpdateTeacherGroups(this.id, teacher.teacherGroups, (err, teacherGroupsUpdated) => {
            if(err) return callback(err);
            
            Teacher.app.models.TeacherSubject.UpdateTeacherSubjects(this.id, teacher.subjects, (err, subjects) => {
                if(err) return callback(err);
                
                Teacher.upsert(teacher, (err, teacherUpdated) => {
                    if(err) return callback(err);
                    
                    return callback(null, teacherUpdated);
                });
            });
        });
    }

    Teacher.GetByActivationToken = function(activationToken, callback) {
        Teacher.findOne({
            where: {
                activationToken
            }
        }, (err, teacher) => {
            if(err) return callback(err);

            if(!teacher) return callback('invalid token');

            return callback(null, teacher);
        });
    }

    Teacher.prototype.Activate = function(password, callback) {
        Teacher.app.models.Usuario.findOne({
            where: {email: this.email}
        }, (err, userFound) => {
            if(err) return callback(err);
            
            if(!!userFound) return callback(null, this);
            const user = {
                active: true,
                username: this.name,
                email: this.email,
                password: !!password ? password : '123',
                schoolUserId: this.schoolUserId
            }
            Teacher.app.models.Usuario.RegisterUser(user, null, 'Teacher', (err, newTeacherUser) => {
                if(err) return callback(err);
                
                this.active = true;
                this.activationToken = null;
                this.userId = newTeacherUser.id;
                this.save((err, teacherSaved) => {
                    if(err) return callback(err);

                    return callback(null, teacherSaved);
                });
            });
        });
    }

    Teacher.GetData = function(userOrTeacherId, callback) {
        Teacher.findOne({
            where: {
                or: [
                    {userId: userOrTeacherId},
                    {id: userOrTeacherId}
                ]
            },
            include: ['subjects', {'teacherGroups': ['grade', 'group']}]
        }, (err, teacher) => {
            if(err) return callback(err);

            return callback(null, teacher);
        });
    }

    Teacher.ChangeSchoolUserId = function(teacherId, newSchoolUserId, callback) {
        if(!newSchoolUserId || !teacherId) return callback(null, {});
        Teacher.findOne({
            where: {
                userId: teacherId
            },
            include: 'user'
        }, (err, teacher) => {
            if(err) return callback(err);

            console.log(teacher.user());
            if(!teacher) return callback('teacher not found!!');
            if(!teacher.schoolUserId) {
                teacher.schoolUserId = newSchoolUserId;
                teacher.user().schoolUserId = newSchoolUserId;
            }
            teacher.save((err, saved) => {
                if(err) return callback(err);
                
                Teacher.app.models.Usuario.upsert(teacher.user(), (err, userSaved) => {
                    if(err) return callback(err);

                    return callback(null, saved);
                });
            });
        });
    }

};
