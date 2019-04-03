'use strict';
var disableRelationMethods = require("../model-methods-helper").disableRelationMethods;

module.exports = function(Usuario) {
    var app = require('../../server/server');
    disableRelationMethods(Usuario);
 
    Usuario.testPush = function(callback){ 
        // Enviar push 
        var notificacion = Usuario.app.models.Notification; 
        var res = notificacion.setByRoleNotification("admin",{title:"Test Push", content:"Una notificación de prueba",link:"/","image":"http://placeimg.com/100/100/any"}); 
        callback(null, res); 
      }

    Usuario.findByRole= function(role, includes = null, callback){
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;
        Role.findOne({where:{name: role}}, function(err, DBrole) {
            if (err) return callback(err);
            
            RoleMapping.find({where:{roleId: DBrole.id}}, function(err, roles){
                if (err) return callback(err);

                var query = { include:  [],where:{or:[]}}
                if(includes.hasOwnProperty("length") && includes.length > 0){
                    includes.forEach(i =>{
                        query.include.push({
                            relation: i
                        })
                    })
                }
                roles.forEach(r =>{
                    query.where.or.push({
                        id: r.principalId
                    })
                });
                Usuario.find(query, function(err, DBusers){
                    if (err) return callback(err);

                     callback(null, DBusers)
                })
            })
        })
    }

    Usuario.newUseWithRole = function(user, role, callback) {
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;

        Usuario.create(user, function(err, newU){
            if (err) return callback(err);

            Role.findOne({
                where:{
                  name: role
                }
              }, function(err, role) {
                if (err) return callback(err);
                
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: newU.id
                  }, function(err, principal) {
                    if (err) callback(err);

                    callback(null, newU)
                })
              })
        })
    }
    
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
        Usuario.create(newUser,function(err, user){
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

                  if(!newUser.profileImage)
                   return callback(null,user)

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




      /**
     * registers a new user with a profile picture
     * @param {object} newUser new User object to be stored
     * @param {Function(Error, object)} callback
     */

    Usuario.registerAdminis = function(newUser, callback) {
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        newUser.emailVerified=1;
        Usuario.create(newUser,function(err, user){
            if (err) return callback(err);
            Role.find({
                where:{
                  name: "Admin"
                }
              }, function(err, res) {
                if (err) return callback(err);
                var role = res[0];
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: user.id
                }, function(err, principal) {
                  if (err) throw err;

                  if(!newUser.profileImage)
                   return callback(null,user)

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


    /**
     * changes the user's prifile image for a new one
     * @param {object} newImage new image in base 64
     * @param {Function(Error, object)} callback
     */

    Usuario.prototype.changeProfileImage = function(newImage, callback) {
        var Upload = app.models.Upload
        var actual = this;
        // TODO
        var newProfileImage = {
            encodedFileContainer: "profileImages",
            base64File: newImage.profileImage.base64ProfileImage,
            fileExtention: newImage.profileImage.base64ProfileImageExtention
        }
        Upload.replaceFileBase64File(actual.profileImageId, newProfileImage, function(err, res){
            if (err) return callback(err);

            actual.profileImage(res);
            Usuario.upsert(actual, function(err, updatedUser){
                if (err) return callback(err);
                  Usuario.findOne({
                    where:{
                        id: updatedUser.id
                    }
                  }, function(err, userWR){
                    if (err) return callback(err);
                    callback(null, userWR);
                  });
              })
        })
    };


    /**
     * updates a user's push token
     * @param {object} body token to be saved
     * @param {Function(Error)} callback
     */

    Usuario.prototype.updatePushToken = function(body, callback) {
        var PushTokens = Usuario.app.models.PushTokens;
        var actual = this;
        // TODO
        PushTokens.findById(body.token.id, function(err, res){
            if (err) return callback(err);

            if(!res){
                var newToken = {
                    id: body.token.id,
                    usuarioId: actual.id,
                    isMobile: body.token.isMobile
                }
                PushTokens.create(newToken, function(err, res){
                    if (err) return callback(err);
        
                    callback(null, true);
                })
            }
            else{
                callback(null, false)
            }
        })
    }; 

    /**
     * updates a user's push token
     * @param {object} body token to be saved
     * @param {Function(Error)} callback
     */

    Usuario.prototype.deletePushToken = function(body, callback) {
        var PushTokens = Usuario.app.models.PushTokens;
        var actual = this;
        // TODO
        actual.PushTokens.findById(body.token, function(err, res){
            if (err) return callback(err);
            if(res){
                PushTokens.destroyById(body.token, function(err, res){
                    if (err) return callback(err);
            
                    callback(null);
                })
            }
        })
    }; 

    /**
     * Deletes push tokens before logout
     * @param {object} body token to be saved
     * @param {Function(Error)} callback
     */
    Usuario.beforeRemote('logout', function(context, callback) {
        Usuario.find({where: {id : context.req.accessToken.userId}}, function(err, usuario) {
            if(err) return callback(err)

            context.req.body.tokens.forEach(token => {
                let body = { token : token }
                console.log("BODY", body)

                usuario.deletePushToken(body, null)
            });
        })
    });
};
