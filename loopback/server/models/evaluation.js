'use strict';

module.exports = function(Evaluation) {

    Evaluation.Update = function(evaluation, callback) {
        Evaluation.upsert(evaluation, (err, newEvaluation) => {
            if(err) return callback(err);

            return callback(null, newEvaluation);
        });
    }

};
