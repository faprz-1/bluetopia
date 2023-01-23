'use strict';

module.exports = function(Event) {

    Event.CreateOne = function(event, callback) {
        Event.create(event, (err, newEvent) => {
            if(err) return callback(err);

            return callback(null, newEvent);
        });
    }

    Event.prototype.UpsertResources = function(resources, callback) {
        let cont = 0, limit = resources.length;
        if(!limit) return resources;
        resources.forEach(resource => {
            Event.app.models.Upload.newBase64File(resource, (err, newFile) => {
                if(err) return callback(err);
            });
        });
    }

};
