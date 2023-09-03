'use strict';

module.exports = function(Evaluation) {

    Evaluation.Update = function(evaluation, callback) {
        Evaluation.findOne({
            where: {
                studentId: evaluation.studentId,
                parcialProductId: evaluation.parcialProductId
            }
        }, (err, evaluationFound) => {
            if(err) return callback(err);

            if(!!evaluationFound) evaluation.id = evaluationFound.id;
            Evaluation.upsert(evaluation, (err, newEvaluation) => {
                if(err) return callback(err);
    
                return callback(null, newEvaluation);
            });
        });
    }

};
