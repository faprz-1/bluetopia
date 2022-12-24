'use strict';

module.exports = function(TemplateType) {

    TemplateType.CreateOne = function(templateType, callback) {
        TemplateType.findOne({
            where: {name: {like: `%${templateType.name}%`}}
        }, (err, templateTypeFound) => {
            if(err) return callback(err);

            if(!!templateTypeFound) return callback(null, templateTypeFound);
            
            TemplateType.create(templateType, (err, newTemplateType) => {
                if(err) return callback(err);

                return callback(null, newTemplateType);
            });
        });
    }

};
