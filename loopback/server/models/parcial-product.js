'use strict';

module.exports = function(ParcialProduct) {

    ParcialProduct.CreateOne = function(parcialProduct, callback) {
        if(parcialProduct.date) {
            const eventInstance = {
                name: `Evento: ${parcialProduct.name}`,
                date: parcialProduct.date,
            }
            ParcialProduct.app.models.Event.create(eventInstance, (err, newEvent) => {
                if(err) return callback(err);

                parcialProduct.eventId = newEvent.id;
                ParcialProduct.create(parcialProduct, (err, newParcialProduct) => {
                    if(err) return callback(err);
        
                    return callback(null, newParcialProduct);
                });
            });
        }
        else {
            ParcialProduct.create(parcialProduct, (err, newParcialProduct) => {
                if(err) return callback(err);
    
                return callback(null, newParcialProduct);
            });
        }
    }

};
