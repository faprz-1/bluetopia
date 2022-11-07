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
                    }).filter(filter => filter)
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
        teachers.forEach(teacher => {
            Teacher.AddTeacher(teacher, (err, newTeacher) => {
                if(err) return callback(err);

                newTeachers.push(newTeacher);
                if(++cont == limit) return callback(null, newTeachers);
            });
        });
    }

};
