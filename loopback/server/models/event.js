'use strict';

module.exports = function(Event) {

    Event.CreateOne = function(event, callback) {
        let resources = event.resources;
        if(!event) return callback(null, null);
        if(event.hasOwnProperty('id')) delete event.id;
        if(event.hasOwnProperty('resources')) delete event.resources;
        Event.create(event, (err, newEvent) => {
            if(err) return callback(err);
            
            newEvent.UpsertResources(resources, (err, resources) => {
                if(err) return callback(err);
                
                newEvent.resources = resources;
                Event.app.models.ParcialProduct.UpdateEvent(event.parcialProduct.id, newEvent.id, (err, saved) => {
                    if(err) return callback(err);

                    return callback(null, newEvent);
                });
            });
        });
    }

    Event.Update = function(ctx, event, callback) {
        Event.upsert(event, (err, updated) => {
            if(err) return callback(err);

            return callback(null, updated);
        });
    }

    Event.Delete = function(eventId, callback) {
        Event.findById(eventId, {include: 'parcialProduct'}, (err, event) => {
            if(err) return callback(err);

            if(!event) return callback(null, true);
            if(!!event.parcialProduct()) {
                event.parcialProduct().eventId = null;
                event.parcialProduct().save((err, saved) => {
                    if(err) return callback(err);
                    event.destroy((err, destroyed) => {
                        if(err) return callback(err);
                        
                        return callback(null, destroyed);
                    });
                });
            }
            else {
                event.destroy((err, destroyed) => {
                    if(err) return callback(err);
                    return callback(null, destroyed);
                });
            }
        });
    }

    Event.prototype.UpsertResources = function(resources, callback) {
        let files = [];
        if(!resources) return callback(null, files);
        let cont = 0, limit = resources.length;
        if(!limit) return callback(null, files);
        resources.forEach(resource => {
            if(!!resource.id) {
                const eventFile = {
                    eventId: this.id,
                    fileId: resource.id
                }
                Event.app.models.EventFile.create(eventFile, (err, newEventFile) => {
                    if(err) return callback(err);

                    files.push(resource);
                    if(++cont == limit) return callback(null, files);
                });
            }
            else {
                Event.app.models.Upload.newBase64File(resource, (err, newFile) => {
                    if(err) return callback(err);

                    const eventFile = {
                        eventId: this.id,
                        fileId: newFile.id
                    }
                    Event.app.models.EventFile.create(eventFile, (err, newEventFile) => {
                        if(err) return callback(err);
    
                        files.push(newFile);
                        if(++cont == limit) return callback(null, files);
                    });
                });
            }
        });
    }

    Event.GetAllOfStrategy = function(strategyId, callback) {
        Event.find({
            where: {
                strategyId
            },
            include: ['type', {'parcialProduct': 'type'}]
        }, (err, events) => {
            if(err) return callback(err);

            return callback(null, events);
        });
    }

};
