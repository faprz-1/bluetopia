'use strict';

module.exports = function(Subject) {

    Subject.CreateOneWithoutRepeat = function(subject, callback) {
        Subject.findOne({
            where: {name: {like: `%${subject.name}%`}}
        }, (err, subjectFound) => {
            if(err) return callback(err);

            if(subjectFound) return callback(null, subjectFound);
            
            Subject.create(subject, (err, newSubject) => {
                if(err) return callback(err);

                return callback(null, newSubject);
            });
        });
    }

    Subject.GetAll = function(callback) {
        Subject.find((err, subjects) => {
            if(err) return callback(err);

            return callback(null, subjects);
        });
    }

};
