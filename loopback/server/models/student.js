'use strict';

module.exports = function(Student) {

    Student.AddStudent = function(student, callback) {
        Student.findOne({
            where: {
                email: student.email
            }
        }, (err, studentFound) => {
            if(err) return callback(err);
            
            if(!!studentFound) return callback(null, studentFound);

            Student.create(student, (err, newStudent) => {
                if(err) return callback(err);

                return callback(null, newStudent);
            });
        });
    }

    Student.AddStudents = function(students, callback) {
        if(!students) return callback(null, []);
        let cont = 0, limit = students.length, newStudents = [];
        if(!limit) return callback(null, newStudents);
        students.forEach(student => {
            Student.AddStudent(student, (err, newStudent) => {
                if(err) return callback(err);

                newStudents.push(newStudent);
                if(++cont == limit) return callback(null, newStudents);
            });
        });
    }

};
