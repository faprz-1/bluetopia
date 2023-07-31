'use strict';

var moment = require('moment-timezone');
var constants = require('./../helpers/constants');

module.exports = function(Strategy) {

    Strategy.observe('before save', (ctx, next) => {
        let instanceThatTriggered = !!ctx.instance ? ctx.instance : ctx.data;
        if(!!instanceThatTriggered) instanceThatTriggered.lastModified = moment().tz(constants.momentTimeZone).toISOString();
        next();
    });

    Strategy.CreateOne = function(strategy, callback) {
        Strategy.app.models.Grade.findOne({
            where: {
                name: {like: `%${strategy.grade}%`}
            }
        }, (err, grade) => {
            if(err) return callback(err);

            Strategy.app.models.Group.findOne({
                where: {
                    name: {like: `%${strategy.group}%`}
                }
            }, (err, group) => {
                if(err) return callback(err);

                Strategy.create(strategy, (err, newStrategy) => {
                    if(err) return callback(err);

                    if(!!grade && !!group) {
                        Strategy.app.models.StrategyGroup.create({
                            strategyId: newStrategy.id,
                            gradeId: grade.id,
                            groupId: group.id,
                        }, (err, newStrategyGroup) => {
                            if(err) return callback(err);
    
                            return callback(null, newStrategy);
                        });
                    }
                    else return callback(null, newStrategy);
                });
            });
        });
    }

    Strategy.prototype.Update = function(ctx, strategy, callback) {
        if(!!strategy.dates && strategy.dates.length == 2) {
            strategy.endDate = strategy.dates.pop();
            strategy.startDate = strategy.dates.pop();
            delete strategy.dates;
        }
        Strategy.app.models.StrategyGroup.UpdateStrategyGroup(strategy.id, typeof strategy.grade == 'object' && !!strategy.grade ? strategy.grade.id : strategy.grade, typeof strategy.group == 'object' && !!strategy.group ? strategy.group.id : strategy.group, (err, saved) => {
            if(err) return callback(err);

            Strategy.upsert(strategy, (err, strategyUpdated) => {
                if(err) return callback(err);

                Strategy.GetData(this.id, (err, strategy) => {
                    if(err) return callback(err);

                    return callback(null, strategy);
                });
            });
        });
    }
    
    Strategy.GetData = function(strategyId, callback) {
        Strategy.findById(strategyId, {
            include: [{'parcialProducts': ['type', 'event', 'evaluationType', {'resources': 'file'}]}, 'template', 'user', 'events', {'strategyGroup': ['grade', 'group']}, {'teams': {'teamStudents': ['student', 'role']}}]
        }, (err, strategy) => {
            if(err) return callback(err);

            return callback(null, strategy);
        });
    }

    Strategy.prototype.GetActivities = function(callback) {
        Strategy.app.models.ParcialProduct.find({
            where: {
                strategyId: this.id,
                eventId: null
            }
        }, (err, parcialProjects) => {
            if(err) return callback(err);

            return callback(null, parcialProjects);
        });
    }

    Strategy.GetAllOfSchool = function(userId, callback) {
        Strategy.app.models.Usuario.find({
            where: {schoolUserId: userId}
        }, (err, schoolTeachers) => {
            if(err) return callback(err);

            Strategy.find({
                where: {
                    userId: {inq: [userId, ...schoolTeachers.map(user => user.id)]},
                    isDeleted: false
                },
                include: ['template', 'teams', {'strategyGroup': ['grade', 'group']}]
            }, (err, strategies) => {
                if(err) return callback(err);
    
                return callback(null, strategies);
            });
        });
    }

    Strategy.GetAllOfTeacher = function(userId, callback) {
        Strategy.app.models.Usuario.findById(userId, (err, teacherUser) => {
            if(err) return callback(err);

            Strategy.find({
                where: {
                    userId: {inq: [userId, teacherUser.schoolUserId]},
                    isDeleted: false
                },
                include: ['template', 'teams', {'strategyGroup': ['grade', 'group']}]
            }, (err, strategies) => {
                if(err) return callback(err);
    
                return callback(null, strategies);
            });
        });
    }

    Strategy.GetStudents = function (ctx, strategyId, callback) {
        const userId = ctx.accessToken.userId;
        Strategy.GetData(strategyId, (err, strategy) => {
            if (err) return callback(err);

            Strategy.app.models.RoleMapping.findOne({
                where: {
                    principalId: userId
                },
                include: 'role'
            }, (err, roleMapping) => {
                if (err) return callback(err);
    
                if (roleMapping.role().name == 'School') {
                    Strategy.app.models.Student.GetAllOfSchool(userId, (err, schoolStudents) => {
                        if(err) return callback(err);
                        let strategyStudents = schoolStudents.filter(student => {
                            return strategy.strategyGroup().gradeId == student.studentGroup().gradeId && strategy.strategyGroup().groupId == student.studentGroup().groupId;
                        });
                        return callback(null, strategyStudents);
                    });
                } else {
                    Strategy.app.models.Student.GetAllOfTeacher(userId, (err, teacherStudents) => {
                        if(err) return callback(err);
                        let strategyStudents = teacherStudents.filter(student => {
                            return strategy.strategyGroup().gradeId == student.studentGroup().gradeId && strategy.strategyGroup().groupId == student.studentGroup().groupId;
                        });
                        return callback(null, strategyStudents);
                    });
                }
            });
        });
    }

    Strategy.prototype.Delete = function(callback) {
        this.isDeleted = true;
        this.save((err, deleted) => {
            return callback(err, deleted);
        });
    }

};
