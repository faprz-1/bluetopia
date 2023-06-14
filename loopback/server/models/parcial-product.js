'use strict';

module.exports = function(ParcialProduct) {

    ParcialProduct.CreateOne = function(ctx, parcialProduct, callback) {
        ParcialProduct.app.models.ParcialProductType.GetOrCreateOne(parcialProduct.parcialProductTypeId, {
            name: parcialProduct.customParcialProductTypeName,
            type: 'Mis tipos de producto',
            userId: ctx.accessToken.userId
        }, (err, parcialProductType) => {
            if(err) return callback(err);
            
            if(!parcialProduct.parcialProductTypeId) parcialProduct.parcialProductTypeId = parcialProductType.id;
            if(parcialProduct.date) {
                const eventInstance = {
                    name: `Evento: ${parcialProduct.name}`,
                    date: parcialProduct.date,
                    strategyId: parcialProduct.strategyId,
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
        });
    }

    ParcialProduct.UpdateEvent = function(parcialProductId, eventId, callback) {
        if(!parcialProductId) return callback(null, {});
        ParcialProduct.findById(parcialProductId, {}, (err, parcialProduct) => {
            parcialProduct.eventId = eventId;
            parcialProduct.save((err, saved) => {
                if(err) return callback(err);

                return callback(null, saved);
            });
        });
    }

};
