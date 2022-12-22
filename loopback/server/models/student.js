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
        Student.app.models.Group.CreateBasedOnCSV(students, (err, groups) => {
            if(err) return callback(err);

            Student.app.models.Grade.CreateBasedOnCSV(students, (err, grades) => {
                if(err) return callback(err);
                
                students.forEach(student => {
                    Student.AddStudent(student, (err, newStudent) => {
                        if(err) return callback(err);
                        
                        const studentGroup = {
                            studentId: newStudent.id,
                            gradeId: grades.find(g => g.name == student.grade) ? grades.find(g => g.name == student.grade).id : null,
                            groupId: groups.find(g => g.name == student.group) ? groups.find(g => g.name == student.group).id : null
                        }
                        Student.app.models.StudentGroup.create(studentGroup, (err, newStudentGroupInstance) => {
                            newStudents.push(newStudent);
                            if(++cont == limit) return callback(null, newStudents);
                        });
                    });
                });
            });
        });
    }

    Student.GetAllOfSchool = function(schoolUserId, grade = null, group = null, callback) {
        Student.find({
            where: {
                schoolUserId
            },
            include: {'studentGroup': ['group', 'grade']}
        }, (err, schoolStudents) => {
            if(err) return callback(err);

            schoolStudents = schoolStudents.filter(student => {
                let match = false;
                if(grade != null) match = student.studentGroup().grade().name == grade.toLowerCase();
                if(group != null) match = student.studentGroup().group().name == group.toLowerCase();
            });
            return callback(null, schoolStudents);
        });
    }

};
