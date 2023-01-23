'use strict';

module.exports = function(Event) {

    Event.CreateOne = function(event, callback) {
        Event.create(event, (err, newEvent) => {
            if(err) return callback(err);
            
            newEvent.UpsertResources(event.resources, (err, resources) => {
                if(err) return callback(err);
                
                newEvent.resources = resources;
                Event.app.models.ParcialProduct.UpdateEvent(event.parcialProjectId, newEvent.id, (err, saved) => {
                    if(err) return callback(err);

                    return callback(null, newEvent);
                });
            });
        });
    }

    Event.prototype.UpsertResources = function(resources, callback) {
        let files = [];
        if(!resources) return callback(null, files);
        let cont = 0, limit = resources.length;
        if(!limit) return callback(null, files);
        resources.forEach(resource => {
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
        });
    }

};
