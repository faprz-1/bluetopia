'use strict';

module.exports = function(Grade) {

    Grade.CreateOne = function(grade, callback) {
        grade.name = grade.name.toLowerCase();
        Grade.findOrCreate({
            where: {
                name: {like: `%${grade.name}%`}
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
        Grade.find({}, (err, Grades) => {
            return callback(err, Grades);
        });
    }

};
