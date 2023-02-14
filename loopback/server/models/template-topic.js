'use strict';

module.exports = function(TemplateTopic) {

    TemplateTopic.CreateOne = function(templateTopic, callback) {
        TemplateTopic.findOrCreate({
            where: {
                name: {like: `%${templateTopic.name}%`}
            }
        }, templateTopic, (err, newTemplateTopic) => {
            if(err) return callback(err);
            
            return callback(null, newTemplateTopic);
        });
    }
    
    TemplateTopic.CreateOneOfTeacher = function(topic, userId, callback) {
        const templateTopic = {
            name: topic,
            userId
        }
        TemplateTopic.findOrCreate({
            where: {
                name: {like: `%${templateTopic.name}%`},
                userId
            }
        }, templateTopic, (err, newTemplateTopic) => {
            if(err) return callback(err);
            
            return callback(null, newTemplateTopic);
        });
    }
    
    TemplateTopic.GetAll = function(ctx, callback) {
        const userId = ctx.accessToken.userId;
        TemplateTopic.find({
            where: {
                or: [
                    {userId},
                    {userId: null}
                ]
            },
            order: 'name ASC'
        }, (err, templateTopics) => {
            if(err) return callback(err);
            
            return callback(null, templateTopics);
        });
    }

};
