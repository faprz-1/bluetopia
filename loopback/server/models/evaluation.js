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

    Evaluation.GetStudentEvaluation = function(studentId, parcialProductId, callback) {
        let evaluation = {
            studentId,
            parcialProductId,
            calification: 0,
        }
        Evaluation.findOrCreate({
            where: {studentId, parcialProductId}
        }, evaluation, (err, studentEvaluation) => {
            if(err) return callback(err);
            
            return callback(null, studentEvaluation);
        });
    }

    Evaluation.UploadStudentFile = function(studentId, parcialProductId, file, callback) {
        Evaluation.GetStudentEvaluation(studentId, parcialProductId, (err, studentEvaluation) => {
            if(err) return callback(err);
            Evaluation.app.models.Upload.newBase64File(file, (err, newFile) => {
                if(err) return callback(err);

                let evaluationFile = {
                    evaluationId: studentEvaluation.id,
                    fileId: newFile.id
                }
                Evaluation.app.models.EvaluationFile.create(evaluationFile, (err, newEvaluationFile) => {
                    if(err) return callback(err);

                    return callback(null, newFile);
                });
            });
        });
    }

};
