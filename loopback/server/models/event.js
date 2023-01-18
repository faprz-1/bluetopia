'use strict';

module.exports = function(Event) {

    Event.CreateOne = function(event, callback) {
        Event.create(event, (err, newEvent) => {
            if(err) return callback(err);

            return callback(null, newEvent);
        });
    }

};
