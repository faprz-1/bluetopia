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

    Student.GetAllOfSchool = function(schoolUserId, callback) {
        Student.find({
            where: {
                schoolUserId
            },
            include: {'studentGroup': ['group', 'grade']}
        }, (err, schoolStudents) => {
            if(err) return callback(err);
            
            return callback(null, schoolStudents);
        });
    }
    
    Student.GetAllOfTeacher = function(teacherUserId, callback) {
        Student.app.models.Teacher.findOne({
            where: {
                userId: teacherUserId
            }, 
            include: 'teacherGroups'
        }, (err, teacher) => {
            if(err) return callback(err);
            
            if(!teacher) return callback('Teacher not found!!');
            if(!teacher.teacherGroups().length) return callback(null, []);
            Student.app.models.StudentGroup.find({
                where: {
                    groupId: {inq: teacher.teacherGroups().map(tg => tg.groupId)},
                    gradeId: {inq: teacher.teacherGroups().map(tg => tg.gradeId)},
                },
                include: 'student',
            }, (err, studentGroups) => {
                if(err) return callback(err);
                
                Student.find({
                    where: {
                        id: {inq: studentGroups.map(sg => sg.student().id)}
                    },
                    include: {'studentGroup': ['group', 'grade']},
                }, (err, students) => {
                    if(err) return callback(err);

                    return callback(null, students);
                });
            });
        });
    }

};
