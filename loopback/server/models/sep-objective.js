'use strict';

module.exports = function(SepObjective) {

    SepObjective.CreateOne = function(sepObjective, callback) {
        sepObjective.name = `${sepObjective.name.split('')[0].toUpperCase()}${sepObjective.name.substring(1).toLowerCase()}`;
        SepObjective.findOne({
            where: {
                name: {like: `%${sepObjective.name}%`}
            }
        }, (err, sepObjectiveFound) => {
            if(err) return callback(err);

            if(!!sepObjectiveFound) return callback(null, sepObjectiveFound);
            
            SepObjective.create(sepObjective, (err, newSepObjective) => {
                if(err) return callback(err);

                return callback(null, newSepObjective);
            });
        });
    }

    SepObjective.GetAll = function(callback) {
        SepObjective.find((err, sepObjectives) => {
            if(err) return callback(err);

            return callback(null, sepObjectives);
        });
    }

};
