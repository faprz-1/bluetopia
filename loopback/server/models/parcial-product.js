'use strict';

module.exports = function(ParcialProduct) {

    ParcialProduct.CreateOne = function(parcialProduct, callback) {
        ParcialProduct.create(parcialProduct, (err, newParcialProduct) => {
            if(err) return callback(err);

            return callback(null, newParcialProduct);
        });
    }

};
