'use strict';

module.exports = function(Usuario) {
    var app = require('../../server/server');
    
    /**
     * Gets an user with his credentials
     * @param {object} ctx Current Context
     * @param {Function(Error, object)} callback
     */

    Usuario.userWithCredentials = function(ctx,callback) {
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

    /**
     * registers a new user with a profile picture
     * @param {object} newUser new User object to be stored
     * @param {Function(Error, object)} callback
     */

    Usuario.register = function(newUser, callback) {
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        Usuario.create(newUser.user,function(err, user){
            if (err) return callback(err);
            Role.find({
                where:{
                  name: "User"
                }
              }, function(err, res) {
                if (err) return callback(err);
                var role = res[0];
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: user.id
                }, function(err, principal) {
                  if (err) throw err;
                  var profileImage = {
                        encodedFileContainer: "profileImages",
                        base64File: newUser.profileImage.base64ProfileImage,
                        fileExtention: newUser.profileImage.base64ProfileImageExtention
                    }
                    app.models.Upload.newBase64File(profileImage, function(err, img){
                        if (err) return callback(err);
                        user.profileImage(img);
                        Usuario.upsert( user, function(err, updatedUser){
                          if (err) return callback(err);
                            Usuario.find({
                              where:{
                                  id: updatedUser.id
                              }
                            }, function(err, userWR){
                              if (err) return callback(err);
                              callback(null, userWR);
                            });
                        })
                    });
                });
            });
        })
    };
};
