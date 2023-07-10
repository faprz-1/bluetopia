'use strict';

module.exports = function(ParcialProduct) {

    ParcialProduct.CreateOne = function(ctx, parcialProduct, callback) {
        if(parcialProduct.date) {
            const eventInstance = {
                name: `Entrega: "${parcialProduct.name}"`,
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

    ParcialProduct.Update = function(parcialProduct, callback) {
        ParcialProduct.upsert(parcialProduct, (err, updated) => {
            if(err) return callback(err);

            return callback(null, updated);
        });
    }

    ParcialProduct.prototype.Delete = function(callback) {
        this.destroy((err, destroyed) => {
            if(err) return callback(err);
            return callback(null, destroyed);
        });
    }

};
