'use strict';
var disableRelationMethods = require("../model-methods-helper").disableRelationMethods;

module.exports = function(Usuario) {
    var app = require('../../server/server');
    disableRelationMethods(Usuario);
 
    Usuario.testPush = function (callback) {
        // Enviar push 
        var notificacion = Usuario.app.models.Notification;
        var res = notificacion.setByRoleNotification("admin", {
            onclick:()=>{console.log("clickeado"); alert("hello")},
            title: "titulo de prueba",
            tag: "tag1",
            content: "un push de prueba se ha enviado para revisar que todo este bien",
            link: notificacion.baseURL + "/inicio",
            "image": "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/50728512_2110076052393262_3123088630382329856_o.png?_nc_cat=103&_nc_ht=scontent.fgdl4-1.fna&oh=045b806a600cd3dc959b54ae1e739d73&oe=5D2B7633"
        });
        var res = notificacion.setByRoleNotification("admin", {
            onclick:()=>{console.log("clickeado"); alert("hello")},
            title: "titulo de prueba 2",
            tag: "tag2",
            content: "un push de prueba se ha enviado para revisar que todo este bien",
            link: notificacion.baseURL + "/inicio",
            "image": "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/50728512_2110076052393262_3123088630382329856_o.png?_nc_cat=103&_nc_ht=scontent.fgdl4-1.fna&oh=045b806a600cd3dc959b54ae1e739d73&oe=5D2B7633"
        });
        //    var res = notificacion.setByRoleNotification("admin",{title:"Push prueba3", content:"Animo!!",link:"http://localhost:4200/#/inicio/administrador/tickets/1","image":"http://elvwdetuvida.com.mx/img/decada/highlights/d70s/icon-historias-volkswagen-aniversario-h-16.svg"});
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
        if(!newUser.type) newUser.type = "User"

        Usuario.findOne({
            where:{
                email: newUser.email
            }
          }, function(err, userWR){
            if (err) return callback(err);

            if(userWR){
              return callback('El correo ya existe')
            } 
            console.log('No Registrado')
            
            Usuario.create(newUser,function(err, user){
              if (err) return callback(err);
              Role.find({
                  where:{
                    name: newUser.type
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
        });
    };




    /**
     * registers a new user with a profile picture
     * @param {object} newUser new User object to be stored
     * @param {Function(Error, object)} callback
     */

    Usuario.registerAdminis = function(newUser, callback) {
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
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
                    mobile:true
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

    Usuario.prototype.updatePushTokenMobile = function (body, callback) {
        var PushTokens = Usuario.app.models.PushTokens;
        var actual = this;
        // TODO 
        PushTokens.findById(body.token, function (err, res) {
            if (err) return callback(err);

            if (!res) {
                var newToken = {
                    id: body.token,
                    usuarioId: actual.id,
                    mobile:true
                }
                PushTokens.create(newToken, function (err, res) {
                    if (err) return callback(err);

                    callback(null, "Registro exitoso");
                })
            } else {
                PushTokens.upsert({id:res.id,mobile:true},(err,updated)=>{
                    if(err) return callback(err)
                    
                    return callback(null, "token ya registrado");
                })
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
    // Usuario.beforeRemote('logout', function(context, callback) {
    //     Usuario.find({where: {id : context.req.accessToken.userId}}, function(err, usuario) {
    //         if(err) return callback(err)

    //         if(context.req.body.tokens){
    //           context.req.body.tokens.forEach(token => {
    //               let body = { token : token }
    //               console.log("BODY", body)

    //               usuario.deletePushToken(body, null)
    //           });
    //         }
    //     })
    // });

    
    /**
     * gives all the roles
     * 
     */

    Usuario.getRoles = function(callback) {
        var Role = app.models.Role;

        Role.find({
            where:{
                name:{neq:"SuperUser"}
            }
        }, function(err, res) {
            if(err) return callback(null)

            return callback(null,res)
          });
    };

    Usuario.loginBySocialMedia = function (email, callback) {

      Usuario.findOne({
          where: {email: email}

      }, function (err, user) {
          if (err) {
              return callback(err, null);
          } else {
              if (user) {
                  user.createAccessToken(tokenTimeToLive, function (error, token) {
                      return cb(error, token);
                  });
              } else {
                  return callback(new Error("No User found"), null);
              }
          }
      });
    };


};
