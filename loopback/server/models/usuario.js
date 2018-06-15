'use strict';

module.exports = function(Usuario) {
    var app = require('../../server/server');
    
    /**
     * Gets an user with his credentials
     * @param {object} ctx Current Context
     * @param {Function(Error, object)} callback
     */

    Usuario.prototype.userWithCredentials = function(ctx,callback) {
        var userWithCredentials;
        var id = ctx.accessToken.userId;
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;
        Usuario.find({
            where: {
                id: id
            }
        }, function(error, user){
            if (error)
                callback(error, "Error On User")

            RoleMapping.find({
                where: {
                    principalType: "USER",
                    principalId: id
                }
            }, function(error, roleM){
                if (error)
                    callback(error)

                Role.find({
                    where: {
                        id: roleM[0].roleId
                    }
                }, function(error, role){
                    if (error)
                        callback(error)
                        
                    user[0].role = role[0];
                    userWithCredentials = user[0];
                    // TODO
                    callback(null, userWithCredentials);
                })
            })
        })
    };
};
