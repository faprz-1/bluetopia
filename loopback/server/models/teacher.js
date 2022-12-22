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
                        newTeacher.groups.add(groupId, (err) => {
                            if(err) return callback(err);
                            
                            newTeacher.grades.add(gradeId, (err) => {
                                if(err) return callback(err);
                                if(++cont == limit) return callback(null, newTeachers);
                            });
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
                username: this.name,
                email: this.email,
                password: Math.random().toString(36).slice(-8)
            }
            Teacher.app.models.Usuario.RegisterUser(user, null, '')
            this.active = true;
        });
    }

};
