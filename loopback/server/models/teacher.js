'use strict';

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
                
                Teacher.create(teacher, (err, newTeacher) => {
                    if(err) return callback(err);

                    let cont = 0, limit = subjects.length;
                    if(!limit) return callback(null, newTeacher);
                    subjects.forEach(subject => {
                        newTeacher.subjects.add(subject.id, (err) => {
                            if(err) return callback(err);
                            if(++cont == limit) return callback(null, newTeacher);
                        });
                    });
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
                        
                        const gradeId = grades.find(g => g.name == teacher.grade) ? grades.find(g => g.name == teacher.grade).id : null;
                        const groupId = groups.find(g => g.name == teacher.group) ? groups.find(g => g.name == teacher.group).id : null;
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
                        })
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
            include: 'subjects'
        }, (err, schoolTeachers) => {
            if(err) return callback(err);

            return callback(null, schoolTeachers);
        });
    }

    Teacher.prototype.Activate = function(callback) {
        Teacher.app.models.Usuario.findOne({
            where: {email: this.email}
        }, (err, userFound) => {
            if(err) return callback(err);
            
            if(!!userFound) return callback(null, this);
            const user = {
                active: true,
                username: this.name,
                email: this.email,
                password: Math.random().toString(36).slice(-8),
                schoolUserId: this.schoolUserId
            }
            Teacher.app.models.Usuario.RegisterUser(user, null, 'Teacher', (err, newTeacherUser) => {
                if(err) return callback(err);
                
                this.active = true;
                this.userId = newTeacherUser.id;
                this.save((err, teacherSaved) => {
                    if(err) return callback(err);

                    return callback(null, teacherSaved);
                });
            });
        });
    }

    Teacher.GetSubjects = function(userOrTeacherId, callback) {
        Teacher.findOne({
            where: {
                or: [
                    {userId: userOrTeacherId},
                    {id: userOrTeacherId}
                ]
            },
            include: 'subjects'
        }, (err, teacher) => {
            if(err) return callback(err);

            return callback(null, teacher.subjects());
        });
    }

};
