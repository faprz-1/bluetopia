'use strict';

module.exports = function(ParcialProductType) {

    ParcialProductType.CreateOne = function(parcialProductType, callback) {
        ParcialProductType.findOne({
            where: {name: {like: `%${parcialProductType.name}%`}}
        }, (err, parcialProductTypeFound) => {
            if(err) return callback(err);

            if(!!parcialProductTypeFound) return callback(null, parcialProductTypeFound);
            
            ParcialProductType.create(parcialProductType, (err, newParcialProductType) => {
                if(err) return callback(err);

                return callback(null, newParcialProductType);
            });
        });
    }
    
    ParcialProductType.GetAll = function(callback) {
        ParcialProductType.find({}, (err, parcialProductTypes) => {
            if(err) return callback(err);

            return callback(null, parcialProductTypes);
        });
    }

};
