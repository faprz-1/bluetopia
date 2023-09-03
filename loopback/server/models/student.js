'use strict';

module.exports = function(Student) {

    Student.AddStudent = function(student, callback) {
        Student.app.models.Group.CreateBasedOnCSV([student], (err, groups) => {
            if(err) return callback(err);

            Student.app.models.Grade.CreateBasedOnCSV([student], (err, grades) => {
                if(err) return callback(err);
                
                Student.create(student, (err, newStudent) => {
                    if(err) return callback(err);
                    
                    const studentGroup = {
                        studentId: newStudent.id,
                        gradeId: grades.find(g => g.name == student.grade.toLowerCase()) ? grades.find(g => g.name == student.grade.toLowerCase()).id : null,
                        groupId: groups.find(g => g.name == student.group.toLowerCase()) ? groups.find(g => g.name == student.group.toLowerCase()).id : null
                    }
                    Student.app.models.StudentGroup.create(studentGroup, (err, newStudentGroupInstance) => {
                        if(err) return callback(err);
    
                        const teacherGroup = {
                            gradeId: grades.find(g => g.name == student.grade.toLowerCase()) ? grades.find(g => g.name == student.grade.toLowerCase()).id : null,
                            groupId: groups.find(g => g.name == student.group.toLowerCase()) ? groups.find(g => g.name == student.group.toLowerCase()).id : null,
                            teacherId: student.teacherId
                        }
                        Student.app.models.TeacherGroup.LinkGroupToTeacher(teacherGroup,(err,newGroupTeacher)=>{
                            if(err) return callback(err);

                            return callback(null, newStudent);
                        });
                    });
                });
            });
        });
    }

    Student.AddStudents = function(students, callback) {
        if(!students.length) return callback(null, []);
        let cont = 0, limit = students.length, newStudents = [];
        if(!limit) return callback(null, newStudents);
        Student.app.models.Group.CreateBasedOnCSV(students, (err, groups) => {
            if(err) return callback(err);

            Student.app.models.Grade.CreateBasedOnCSV(students, (err, grades) => {
                if(err) return callback(err);
                
                students.forEach(student => {
                    Student.app.models.Teacher.findOne({where:{userId:student.teacherUserId}}, (err, teacher) => {
                        if(err) console.error(err);
                        student.teacherId = teacher.id ? teacher.id:null;
                    Student.AddStudent(student, (err, newStudent) => {
                        if(err) console.error(err);
                            newStudents.push(newStudent);
                            if(++cont == limit) return callback(null, newStudents);
                    });});
                });
            });
        });
    }

    Student.GetAllOfSchool = function(schoolId, gradeId, groupId, callback) {
        Student.find({
            where: {
                schoolId
            },
            include: {'studentGroup': ['group', 'grade']}
        }, (err, schoolStudents) => {
            if(err) return callback(err);
            
            if(!!gradeId && gradeId != 0) schoolStudents = schoolStudents.filter(student => student.studentGroup().gradeId == gradeId);
            if(!!groupId && groupId != 0) schoolStudents = schoolStudents.filter(student => student.studentGroup().groupId == groupId);
            return callback(null, schoolStudents);
        });
    }
    
    Student.GetAllOfTeacher = function(teacherUserId, gradeId, groupId, callback) {
        Student.app.models.Teacher.findOne({
            where: {
                userId: teacherUserId
            }, 
            include: 'teacherGroups'
        }, (err, teacher) => {
            if(err) return callback(err);
            
            if(!teacher) return callback('Teacher not found!!');
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
                        or: [
                            {and: [
                                {id: {inq: studentGroups.filter(sg => !!sg.student()).map(sg => sg.student().id)}},
                                {schoolId: teacher.schoolId}
                            ]},
                            {teacherUserId}
                        ]
                    },
                    include: {'studentGroup': ['group', 'grade']},
                }, (err, students) => {
                    if(err) return callback(err);

                    if(!!gradeId && gradeId != 0) students = students.filter(student => student.studentGroup().gradeId == gradeId);
                    if(!!groupId && groupId != 0) students = students.filter(student => student.studentGroup().groupId == groupId);
                    return callback(null, students);
                });
            });
        });
    }

    Student.UpdateSchoolId = function(teacherId, schoolId, callback) {
        if(!teacherId || !schoolId) return callback(null, {count: 0});
        Student.updateAll({
            teacherUserId: teacherId
        }, {schoolId, teacherUserId: null}, (err, studentsUpdated) => {
            if(err) return callback(err);

            return callback(null, studentsUpdated);
        });
    }

    Student.prototype.GetData = function(callback) {
        Student.findById(this.id, {
            include: [
                'school',
                'evaluations',
                {'studentGroup': ['group', 'grade']}
            ]
        }, (err, student) => {
            return callback(err, student);
        });
    }

    Student.prototype.GetDataWithEvaluations = function(parcialProductId, callback) {
        Student.findById(this.id, {
            include: [
                'school',
                {'studentGroup': ['group', 'grade']},
                {
                    relation: 'evaluations',
                    scope: {
                        where: parcialProductId ? {
                            parcialProductId
                        } : null
                    }
                },
            ]
        }, (err, student) => {
            return callback(err, student);
        });
    }

    Student.prototype.EvaluateParcialProduct = function(evaluation, callback) {
        evaluation.studentId = this.id;
        Student.app.models.Evaluation.Update(evaluation, (err, evaluationSaved) => {
            if(err) return callback(err);

            return callback(null, evaluationSaved);
        });
    }

};
