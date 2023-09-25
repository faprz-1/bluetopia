'use strict';

module.exports = function(StrategyGroup) {

    StrategyGroup.UpdateStrategyGroup = function(strategyId, schoolId, gradeId, groupId, callback) {
        if(!strategyId && !gradeId && !groupId) return callback(null, {});
        let instance = {
            strategyId,
            gradeId,
            groupId,
            schoolId
        }
        StrategyGroup.findOrCreate({where: {strategyId}}, instance, (err, relation) => {
            if(err) return callback(err);
            StrategyGroup.updateAll({strategyId}, {gradeId, groupId, schoolId}, (err, updated) => {
                if(err) return callback(err);

                return callback(null, updated);
            });
        });
    }

};
