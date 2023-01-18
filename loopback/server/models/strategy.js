'use strict';

module.exports = function(Strategy) {

    Strategy.CreateOne = function(strategy, callback) {
        Strategy.create(strategy, (err, newStrategy) => {
            if(err) return callback(err);

            return callback(null, newStrategy);
        });
    }

    Strategy.prototype.Update = function(strategy, callback) {
        Strategy.upsert(strategy, (err, strategyUpdated) => {
            if(err) return callback(err);
            
            return callback(null, strategyUpdated);
        });
    }
    
    Strategy.prototype.GetData = function(callback) {
        Strategy.findById(this.id, {
            include: ['template', 'user']
        }, (err, strategy) => {
            if(err) return callback(err);

            return callback(null, strategy);
        });
    }

};
