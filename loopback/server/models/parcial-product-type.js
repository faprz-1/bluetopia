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
    
    ParcialProductType.CreateOneCustom = function(parcialProductType, callback) {
        if(!parcialProductType.userId) return callback('custom product typehas to be of one user: userId not found');
        parcialProductType.type = 'Mis tipos de producto';
        ParcialProductType.findOrCreate({
            where: {
                name: {like: `%${parcialProductType.name}%`},
                userId: parcialProductType.userId
            }
        }, parcialProductType, (err, parcialProductType) => {
            if(err) return callback(err);
            
            return callback(null, parcialProductType);
        });
    }
    
    ParcialProductType.GetAll = function(ctx, callback) {
        const userId = ctx.accessToken.userId;
        ParcialProductType.find({
            where: {
                or: [{userId: null}, {userId}]
            },
            order: 'name ASC'
        }, (err, parcialProductTypes) => {
            if(err) return callback(err);

            return callback(null, parcialProductTypes);
        });
    }

};
