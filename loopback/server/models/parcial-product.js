'use strict';

module.exports = function(ParcialProduct) {

    ParcialProduct.CreateOne = function(ctx, parcialProduct, callback) {
        if(!!parcialProduct.evaluationType) parcialProduct.evaluationTypeId = parcialProduct.evaluationType.id;
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
                    
                    newParcialProduct.UpdateResources(ctx, parcialProduct.resources, (err, updated) => {
                        if(err) return callback(err);

                        return callback(null, newParcialProduct);
                    });
                });
            });
        }
        else {
            ParcialProduct.create(parcialProduct, (err, newParcialProduct) => {
                if(err) return callback(err);
                
                newParcialProduct.UpdateResources(ctx, parcialProduct.resources, (err, updated) => {
                    if(err) return callback(err);

                    return callback(null, newParcialProduct);
                });
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

    ParcialProduct.prototype.Update = function(ctx, parcialProduct, callback) {
        let eventInstance = {
            name: `Entrega: "${parcialProduct.name}"`,
            date: parcialProduct.date,
            strategyId: parcialProduct.strategyId,
        };
        if(!!this.eventId) eventInstance.id = this.eventId;
        ParcialProduct.app.models.Event.Update(eventInstance, (err, updated) => {
            if(err) return callback(err);

            parcialProduct.eventId = updated.id;
            ParcialProduct.upsert(parcialProduct, (err, updated) => {
                if(err) return callback(err);
                
                updated.UpdateResources(ctx, parcialProduct.resources, (err, updated) => {
                    if(err) return callback(err);

                    return callback(null, updated);
                });
            });
        });
    }

    ParcialProduct.prototype.Delete = function(callback) {
        this.destroy((err, destroyed) => {
            if(err) return callback(err);
            return callback(null, destroyed);
        });
    }

    ParcialProduct.prototype.UpdateResources = function(ctx, resources, callback) {
        let files = [];
        const userId = ctx.accessToken.userId;
        if(!resources) return callback(null, files);
        let cont = 0, limit = resources.length;
        if(!limit) return callback(null, files);
        let where = {
            parcialProductId: this.id,
            fileId: {
                nin: resources.filter(resource => !!resource.id).map(resource => resource.id)
            }
        };
        ParcialProduct.app.models.ParcialProductFile.destroyAll(where, (err, destroyed) => {
            if(err) return callback(err);

            resources.forEach(resource => {
                if(!!resource.id) {
                    const parcialProductFile = {
                        parcialProductId: this.id,
                        fileId: resource.id
                    }
                    ParcialProduct.app.models.ParcialProductFile.findOrCreate({where: {...parcialProductFile}}, parcialProductFile, (err, newParcialProductFile) => {
                        if(err) return callback(err);
    
                        files.push(resource);
                        if(++cont == limit) return callback(null, files);
                    });
                }
                else {
                    resource.userId = userId;
                    ParcialProduct.app.models.Upload.newBase64File(resource, (err, newFile) => {
                        if(err) return callback(err);
    
                        const parcialProductFile = {
                            parcialProductId: this.id,
                            fileId: newFile.id
                        }
                        ParcialProduct.app.models.ParcialProductFile.create(parcialProductFile, (err, newParcialProductFile) => {
                            if(err) return callback(err);
        
                            files.push(newFile);
                            if(++cont == limit) return callback(null, files);
                        });
                    });
                }
            });
        });
    }

};
