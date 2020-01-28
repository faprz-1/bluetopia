'use strict';

module.exports = function(Ordershistory) {

    /**
     *
     * @param {Function(Error, object)} callback
     */

    Ordershistory.getOrdHist = function(callback) {
        Ordershistory.find({include: 'usuario'}, (err, list) => {
            if(err) return callback(err);

            return callback(null, list);
        })
    };
};
