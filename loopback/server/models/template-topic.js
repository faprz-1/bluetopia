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
    
    TemplateTopic.GetAll = function(callback) {
        TemplateTopic.find({}, (err, templateTopics) => {
            if(err) return callback(err);
            
            return callback(null, templateTopics);
        });
    }

};
