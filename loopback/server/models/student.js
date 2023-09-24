'use strict';

module.exports = function(Student) {

    Student.AddStudent = function(student, callback) {
        Student.app.models.Group.CreateBasedOnCSV([student], (err, groups) => {
            if (err) return callback(err);

            Student.app.models.Grade.CreateBasedOnCSV([student], (err, grades) => {
                if (err) return callback(err);

                Student.create(student, (err, newStudent) => {
                    if (err) return callback(err);

                    const studentGroup = {
                        studentId: newStudent.id,
                        schoolId: newStudent.schoolId,
                        gradeId: grades.find(g => g.name == student.grade.toLowerCase()) ? grades.find(g => g.name == student.grade.toLowerCase()).id : null,
                        groupId: groups.find(g => g.name == student.group.toLowerCase()) ? groups.find(g => g.name == student.group.toLowerCase()).id : null
                    }
                    Student.app.models.StudentGroup.CreateOne(studentGroup, (err, newStudentGroupInstance) => {
                        if (err) {
                            newStudent.destroy((err2, destroyed) => {
                                return callback(err);
                            });
                        }

                        const teacherGroup = {
                            gradeId: grades.find(g => g.name == student.grade.toLowerCase()) ? grades.find(g => g.name == student.grade.toLowerCase()).id : null,
                            groupId: groups.find(g => g.name == student.group.toLowerCase()) ? groups.find(g => g.name == student.group.toLowerCase()).id : null,
                            teacherId: student.teacherId
                        }
                        Student.app.models.TeacherGroup.LinkGroupToTeacher(teacherGroup, (err, newGroupTeacher) => {
                            if (err) return callback(err);

                            return callback(null, newStudent);
                        });
                    });
                });
            });
        });
    }

    Student.AddStudents = function(students, callback) {
        if (!students.length) return callback(null, []);
        let cont = 0,
            limit = students.length,
            newStudents = [];
        if (!limit) return callback(null, newStudents);
        Student.app.models.Group.CreateBasedOnCSV(students, (err, groups) => {
            if (err) return callback(err);

            Student.app.models.Grade.CreateBasedOnCSV(students, (err, grades) => {
                if (err) return callback(err);

                students.forEach(student => {
                    Student.AddStudent(student, (err, newStudent) => {
                        if (err) console.error(err);
                        newStudents.push(newStudent);
                        if (++cont == limit) return callback(null, newStudents);
                    });
                });
            });
        });
    }

    Student.GetStudentByUser = function(userId, callback) {
        Student.findOne({
            where: { userId },
            include: { 'studentGroup': ['group', 'grade'] }
        }, (err, student) => {
            if (err) return callback(err);
            return callback(null, student);
        });
    }

    Student.GetAllOfSchool = function(schoolId, gradeId, groupId, callback) {
        Student.find({
            where: { schoolId },
            include: { 'studentGroup': ['group', 'grade'] }
        }, (err, schoolStudents) => {
            if (err) return callback(err);

            if (!!gradeId && gradeId != 0) schoolStudents = schoolStudents.filter(student => student.studentGroup().gradeId == gradeId);
            if (!!groupId && groupId != 0) schoolStudents = schoolStudents.filter(student => student.studentGroup().groupId == groupId);
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
            if (err) return callback(err);

            if (!teacher) return callback('Teacher not found!!');
            Student.app.models.StudentGroup.find({
                where: {
                    gradeId: { inq: teacher.teacherGroups().map(tg => tg.gradeId) },
                    groupId: { inq: teacher.teacherGroups().map(tg => tg.groupId) },
                },
                include: 'student',
            }, (err, studentGroups) => {
                if (err) return callback(err);

                Student.find({
                    where: {
                        id: { inq: studentGroups.map(sg => sg.studentId) },
                        schoolId: teacher.schoolId,
                    },
                    include: { 'studentGroup': ['group', 'grade'] },
                }, (err, students) => {
                    if (err) return callback(err);

                    if (!!gradeId && gradeId != 0) students = students.filter(student => student.studentGroup().gradeId == gradeId);
                    if (!!groupId && groupId != 0) students = students.filter(student => student.studentGroup().groupId == groupId);
                    return callback(null, students);
                });
            });
        });
    }

    Student.UpdateSchoolId = function(teacherId, schoolId, callback) {
        if (!teacherId || !schoolId) return callback(null, { count: 0 });
        Student.updateAll({
            teacherUserId: teacherId
        }, { schoolId, teacherUserId: null }, (err, studentsUpdated) => {
            if (err) return callback(err);

            return callback(null, studentsUpdated);
        });
    }

    Student.prototype.GetData = function(callback) {
        Student.findById(this.id, {
            include: [
                'school',
                'evaluations',
                { 'studentGroup': ['group', 'grade'] }
            ]
        }, (err, student) => {
            return callback(err, student);
        });
    }

    Student.prototype.EditStudent = function(newStudent, callback) {
        Student.findOne({ where: { id: this.id } }, (err, student) => {
            if (err) return callback(err);
            if (!student) return callback(null, null);
            Student.upsert(newStudent, (err, updateStudent) => {
                if (err) return callback(err);
                return callback(null, updateStudent);
            });
        });
    }

    Student.prototype.GetDataWithEvaluations = function(parcialProductId, callback) {
        Student.findById(this.id, {
            include: [
                'school',
                { 'studentGroup': ['group', 'grade'] },
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
            if (err) return callback(err);

            return callback(null, evaluationSaved);
        });
    }

    Student.GetEvents = function(studentUserId, callback) {
        Student.findOne({
            where: { userId: studentUserId },
            include: 'studentGroup'
        }, (err, student) => {
            if (err) return callback(err);

            if (!student) return callback('Student not found!!');
            if (!student.studentGroup()) return callback('Student not in group!!');
            Student.app.models.StrategyGroup.find({
                where: {
                    schoolId: student.studentGroup().schoolId,
                    gradeId: student.studentGroup().gradeId,
                    groupId: student.studentGroup().groupId,
                }
            }, (err, strategyGroups) => {
                if (err) return callback(err);

                Student.app.models.Event.find({
                    where: {
                        strategyId: { inq: strategyGroups.map(strategyGroup => strategyGroup.strategyId) }
                    },
                    include: ['type', 'parcialProduct', 'strategy']
                }, (err, events) => {
                    if (err) return callback(err);

                    return callback(null, events);
                });
            });
        });
    }

};
