'use strict';

module.exports = function(Grade) {

    Grade.CreateGradeOrGroup = function(body, callback) {
        let grade = {
            name: body.grade
        };
        let group = {
            name: body.group
        };
        Grade.CreateOne(grade, (err, newGrade) => {
            if(err) return callback(err);
            
            Grade.app.models.Group.CreateOne(group, (err, newGroup) => {
                if(err) return callback(err);

                return callback(null, {grade:newGrade, group:newGroup});
            });
        });
    }

    Grade.CreateOne = function(grade, callback) {
        if(!grade || !grade.name || !grade.name.length) return callback(null, null);
        grade.name = grade.name.toLowerCase();
        Grade.findOrCreate({
            where: {
                name: grade.name
            }
        }, grade, (err, newGrade) => {
            return callback(err, newGrade);
        });
    }

    Grade.CreateBasedOnCSV = function(students, callback) {
        let grades = [], newGrades = [];
        students.forEach(student => {
            if(!grades.includes(student.grade)) grades.push(student.grade);
        });

        let cont = 0, limit = grades.length;
        if(!limit) return callback(null, newGrades);
        grades.forEach(grade => {
            const newGrade = {
                name: grade
            }

            Grade.CreateOne(newGrade, (err, newGrade) => {
                if(err) return callback(err);

                newGrades.push(newGrade);
                if(++cont == limit) return callback(null, newGrades);
            });
        });
    }

    Grade.GetAll = function(callback) {
        Grade.find({}, (err, grades) => {
            return callback(err, grades);
        });
    }

};
