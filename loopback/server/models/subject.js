'use strict';

module.exports = function(Subject) {

    Subject.CreateOneWithoutRepeat = function(subject, callback) {
        let filter= {
            where: {}
        };
        if(subject.id) filter.where['id'] = subject.id;
        else filter.where['name'] = {like: `%${subject.name}%`};
        Subject.findOrCreate(filter, subject, (err,instance)=>{
            if(err) return callback(err);
            return callback(null,instance);
        });
    }

    Subject.GetAll = function(callback) {
        Subject.find((err, subjects) => {
            if(err) return callback(err);

            return callback(null, subjects);
        });
    }

};
