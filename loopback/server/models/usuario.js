    'use strict';
var disableRelationMethods = require("../model-methods-helper").disableRelationMethods;
var uuidV4 = require('uuid/v4');
var loopback = require("loopback");
var path = require('path');

module.exports = function(Usuario) {
    var app = require('../../server/server');
    disableRelationMethods(Usuario);

    Usuario.testPush = function(callback) {
        // Enviar push 
        var notificacion = this.app.models.Notification;
        var res = notificacion.setByRoleNotification("SuperUser", {
            title: "titulo de prueba",
            tag: "tag1",
            content: "un push de prueba se ha enviado para revisar que todo este bien",
            link: notificacion.baseURL + "/inicio",
            "image": "https://scontent.fgdl4-1.fna.fbcdn.net/v/t1.0-9/50728512_2110076052393262_3123088630382329856_o.png?_nc_cat=103&_nc_ht=scontent.fgdl4-1.fna&oh=045b806a600cd3dc959b54ae1e739d73&oe=5D2B7633"
        });
        //    var res = notificacion.setByRoleNotification("admin",{title:"Push prueba3", content:"Animo!!",link:"http://localhost:4200/#/inicio/administrador/tickets/1","image":"http://elvwdetuvida.com.mx/img/decada/highlights/d70s/icon-historias-volkswagen-aniversario-h-16.svg"});
        callback(null, res);
    }
    
    Usuario.findByRole = function(role, includes = null, callback) {
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;
        Role.findOne({ where: { name: role } }, function(err, DBrole) {
            if (err) return callback(err);

            RoleMapping.find({ where: { roleId: DBrole.id } }, function(err, roles) {
                if (err) return callback(err);

                var query = { include: [], where: { or: [] } }
                if (includes.hasOwnProperty("length") && includes.length > 0) {
                    includes.forEach(i => {
                        query.include.push({
                            relation: i
                        })
                    })
                }
                roles.forEach(r => {
                    query.where.or.push({
                        id: r.principalId
                    })
                });
                Usuario.find(query, function(err, DBusers) {
                    if (err) return callback(err);

                    callback(null, DBusers)
                })
            })
        })
    }

    Usuario.newUseWithRole = function(user, role, callback) {
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;

        Usuario.create(user, function(err, newU) {
            if (err) return callback(err);

            Role.findOne({
                where: {
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

    Usuario.userWithCredentials = function(ctx, callback) {
        if (!ctx.accessToken) return callback("User not logged in!")

        var userWithCredentials;
        var id = ctx.accessToken.userId;
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;

        Usuario.findOne({
            where: {
                id: id
            }
        }, function(error, user) {
            if (error) return callback(error, "Error On User")

            RoleMapping.find({
                where: {
                    principalType: "USER",
                    principalId: id
                }
            }, function(error, roleM) {
                if (error) return callback(error)

                Role.findOne({
                    where: {
                        id: roleM[0].roleId
                    }
                }, function(error, role) {
                    if (error) return callback(error)

                    user.role = role;
                    userWithCredentials = user;

                    console.log("auth:", role.name)
                    if (role.name == 'SuperUser') {
                        // TODO
                        return callback(null, userWithCredentials);
                    } else {
                        userWithCredentials.loadUserData(function(err, UWC) {
                            if (err) return callback(err)
                            UWC.role = role;
                            callback(err, UWC)
                        })
                    }
                })
            })
        })
    };

    Usuario.CreateNew = function(newUser, callback) {
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        if (!newUser.type) newUser.type = "User";

        Usuario.findOne({
            where: {
                or: [
                    { email: newUser.email },
                    { username: newUser.username },
                ]

            }
        }, function(err, userWR) {
            if (err) return callback(err);

            if (userWR) {
                return callback('Nombre de usuario o correo inválido');
            }

            newUser.verificationToken = uuidV4();
            Usuario.create(newUser, function(err, user) {
                if (err) return callback(err);
                Role.find({
                    where: {
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

                        return callback(null, user)

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

    Usuario.register = function(newUser, callback) {
        
        Usuario.CreateNew(newUser, (error, createdUser) => {
            if (error) return callback(error);

            Usuario.login(createdUser, (err, accessToken) => {
                if (err) return callback(err)

                return callback(null, accessToken)
            })

        });
    };

    /**
     * registers a new user and send verification email
     * @param {object} newUser new User object to be stored
     * @param {Function(Error, object)} callback
     */

    Usuario.RegisterWithEmailVerification = function(newUser, callback) {
        Usuario.app.models.adminMail.CheckDomainAvailability(newUser.email.split('@')[1], (err, domainValid) => {
            if(err) return callback(err);
            if(domainValid){
                
                Usuario.CreateNew(newUser, (error, createdUser) => {
                     var emailData = {};
                     emailData.email = createdUser.email;
                     emailData.username = createdUser.username;
                     emailData.path = require("../helpers/constants").hostURL + 'verificacion/' + createdUser.verificationToken; 
         
                     var renderer = loopback.template(path.resolve(__dirname, '../emails/email-verification.ejs'))
                     var html_body = renderer(emailData);
         
                     Usuario.app.models.adminMail.send({
                         to: createdUser.email,
                         from: 'testmail@jarabesoft.com',
                         subject: 'Confirmación de correo electrónico',
                         html: html_body
                     }, function( err, res ){
                         if (err) return callback(err);
         
                        return callback(null, { email : createdUser.email });
                     })
         
                });

            }else{
                return callback('Dominio no valido');
            }
        })
    };


    /**
     * Verify user email
     * @param {string} Verification code
     * @param {Function(Error, boolean)} callback
     */

    Usuario.VerifyEmail = function(code, callback) {
        let filter = {
            where : {
                verificationToken : code
            }
        }

        let errorMsg = 'Ocurrió un error al verificar correo electrónico';
        Usuario.findOne(filter, (err, userDB)=> {
           if(err){
                console.error(err);
                return callback(errorMsg);
           }

           if(!userDB) return callback(errorMsg);
           
           userDB.updateAttributes({ emailVerified : true }, (err, userVerified)=> {
               if(err){
                    console.error(err);
                    return callback(errorMsg);
               }
               
               return callback(null, true)
           })
       })
    };


    /**
     * registers a new user with a profile picture
     * @param {object} newUser new User object to be stored
     * @param {Function(Error, object)} callback
     */

    Usuario.registerAdmins = function(newUser, callback) {
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        Usuario.create(newUser, function(err, user) {
            if (err) return callback(err);
            Role.find({
                where: {
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

                    if (!newUser.profileImage)
                        return callback(null, user)

                    var profileImage = {
                        encodedFileContainer: "profileImages",
                        base64File: newUser.profileImage.base64ProfileImage,
                        fileExtention: newUser.profileImage.base64ProfileImageExtention
                    }

                    app.models.Upload.newBase64File(profileImage, function(err, img) {
                        if (err) return callback(err);
                        user.profileImage(img);

                        Usuario.upsert(user, function(err, updatedUser) {
                            if (err) return callback(err);
                            Usuario.find({
                                where: {
                                    id: updatedUser.id
                                }
                            }, function(err, userWR) {
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
            name: newImage.name,
            resize: newImage.resize,
            base64File: newImage.base64ProfileImage,
            fileExtention: newImage.base64ProfileImageExtention
        }
        Upload.replaceFileBase64File(actual.profileImageId, newProfileImage, function(err, res) {
            if (err) return callback(err);

            actual.profileImage(res);
            Usuario.upsert(actual, function(err, updatedUser) {
                if (err) return callback(err);
                Usuario.findOne({
                    where: {
                        id: updatedUser.id
                    }
                }, function(err, userWR) {
                    if (err) return callback(err);
                    callback(null, userWR);
                });
            })
        })
    };


    /** 
     * updates a user's push token 
     * @param {object} data token to be saved 
     * @param {Function(Error)} callback 
     */

    Usuario.prototype.updatePushToken = function(data, callback) {
        let PushTokens = Usuario.app.models.PushTokens;
        let actual = this;
        // TODO 
        PushTokens.findById(data.token.id, function(err, existing) {
            if (err) return callback(err);
            if(existing){ return callback(null, true) }
            let newToken = {
                id: data.token.id,
                usuarioId: actual.id,
                mobile: data.token.isMobile
            }
            PushTokens.create(newToken, function(err, res) {
                if (err) return callback(err);

                return callback(null, true);
            })
            
        })
    };

    /**
     * updates a user's push token
     * @param {object} data token to be saved
     * @param {Function(Error)} callback
     */

    Usuario.deletePushToken = function(token, callback) {
        let PushTokens = Usuario.app.models.PushTokens;
       
        PushTokens.findById(token, function(err, res) {
            if (err) return callback(err);

            if (!res) { return callback(null, true ) }
            PushTokens.destroyById(token, function(err, res) {
                if (err) return callback(err);

                return callback(null, true);
            })
            
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
            where: {
                name: { neq: "SuperUser" }
            }
        }, function(err, res) {
            if (err) return callback(null)

            return callback(null, res)
        });
    };

    //=================================================================================================================
    //    LOGIN
    //=================================================================================================================

    /**
     * [Endpoint] Login if user is active
     * @param {object} credentials {email, password}
     * @param {Function(Error)} callback
     */

    Usuario.loginIfActive = function(credentials, callback) {
        Usuario.findOne({ where: { email: credentials.email } }, function(err, mUser) {
            if (err) return callback(err)

            if (!mUser) {
                return callback("Usuario no registrado")
            } else {
                if (mUser.active == null) {
                    mUser.active = true
                    Usuario.upsert(mUser, function(err, res) {
                        if (err) return callback(err)
                    })
                }
                if (mUser.active == false) {
                    return callback("Error con la cuenta. Contacta al administrador")
                }
            }

            Usuario.login(credentials, function(err, accessToken) {
                if (err) return callback(err)

                callback(null, accessToken)
            })
        })
    }

    /**
     * log the user by social media token
     * @param {object} user user to login
     * @param {Function(Error, object)} callback
     */

    Usuario.loginBySocialMedia = function(user, callback) {
        var user;
        let mediaFilter = {}
            // TODO
        switch (user.loginType) {
            case "Facebook":
                mediaFilter = {
                    where: {
                        FBToken: user.token
                    }
                }
                break;
            case "Google":
                mediaFilter = {
                    where: {
                        GToken: user.token
                    }
                }
                break;
            default:
                return callback('Undefined token type', null);
                break;
        }

        Usuario.findOne(mediaFilter, function(err, res) {
            if (err) return callback(err, null);

            if (res) {
                if (res.email == user.email) {

                    // console.log('Found user with that key')
                    res.createAccessToken(5000, function(err, token) {
                        if (err) return callback(err, null);

                        callback(null, token);
                    });
                } else {
                    return callback('Error')
                }

            } else {
                // Si el key no se encuentra entre los usuarios , revisa el correo, 
                Usuario.findOne({
                    where: {
                        email: user.email
                    }
                }, function(err, userWithEmail) {
                    if (err) return callback(err, null);

                    // si el correo ya existe le asigna el key a esa cuenta,
                    // si el correo no existe dentro de usuarios, crea un nuevo usuario y le asigna el key
                    if (userWithEmail) {
                        switch (user.loginType) {
                            case "Facebook":
                                userWithEmail.FBToken = user.token
                                break;
                            case "Google":
                                userWithEmail.GToken = user.token
                                break;
                            default:
                                return callback('Undefined token type', null);
                                break;
                        }

                        Usuario.upsert(userWithEmail, function(err, updatedUser) {
                            if (err) return callback(err);

                            updatedUser.createAccessToken(5000, function(err, token) {
                                if (err) return callback(err, null);

                                callback(null, token);
                            });
                        })
                    } else {
                        user.password = Math.random().toString(36).slice(-8);
                        // console.log('Creating user with that key')
                        switch (user.loginType) {
                            case "Facebook":
                                user.FBToken = user.token
                                break;
                            case "Google":
                                user.GToken = user.token
                                break;
                            default:
                                return callback('Undefined token type', null);
                                break;
                        }

                        Usuario.register(user, function(err, userWR) {
                            if (err) return callback(err);

                            userWR.createAccessToken(5000, function(err, token) {
                                if (err) return callback(err, null);

                                callback(null, token);
                            });

                        });
                    }
                });
            }
        });

    };


    /**
     * [Endpoint] Gets list of users
     * @param {object} ctx Current context
     * @param {Function(Error, object)} callback
     */
    Usuario.getAnyUsers = function(ctx, callback) {
        let filter = {
            where: {
                or: [{ roleId: 2 }, { roleId: 1 }]
            },
        }

        Usuario.app.models.RoleMapping.find(filter, function(err, roles) {
            if (err) return callback(err);

            var query = {
                where: { or: [] },
                include: [
                    'userPermissions'
                ]
            }

            roles.forEach(r => {
                query.where.or.push({
                    id: r.principalId
                })
            });
            Usuario.find(query, function(err, DBusers) {
                if (err) return callback(err);

                return callback(null, DBusers)
            })
        })
    };


    /**
     * Update a user
     * @param {object} ctx context object
     * @param {object} updtUser object of staff to update
     * @param {Function(Error)} callback
     */
    Usuario.prototype.updateAnyUser = function(ctx, updtUser, callback) {
        var _this = this
        Usuario.getAnyUsers(ctx, function(err, users) {
            if (err) return callback(err)

            if (!users.find(elem => elem.id == updtUser.id)) {
                return callback("What are you doing?...")
            }

            _this.changeAttributesAndEraseTokensIfUserIsInactive(updtUser, function(err, erasedTokens) {
                if (err) return callback(err)

                Usuario.app.models.UserPermissionPolicyRelation.updateAnyPermissions(updtUser.permissionNodeIds, updtUser.id, function(err, res) {
                    if (err) return callback(err)

                    if (updtUser.profileImage && updtUser.hasChangedProfileImage) {
                        res.updatedUser.changeMyProfileImage(updtUser.profileImage, function(err, updatedUser) {
                            if (err) return callback(err)

                            Usuario.getAnyUsers(ctx, function(err, users) {
                                if (err) return callback(err)

                                return callback(null, users)
                            })
                        })
                    } else {
                        Usuario.getAnyUsers(ctx, function(err, users) {
                            if (err) return callback(err)

                            return callback(null, users)
                        })
                    }
                })
            })
        })
    }


    Usuario.prototype.changeAttributesAndEraseTokensIfUserIsInactive = function(updtUser, callback) {
        var _this = this

        _this.updateAttributes(updtUser, function(err, updatedUser) {
            if (err) return callback(err)

            if (!updatedUser.active) {
                Usuario.app.models.UsuarioAccessToken.destroyAll({ userId: updatedUser.id }, function(err, info) {
                    if (err) return callback(err)

                    callback(null, info.count)
                })
            } else {
                callback(null, 0)
            }
        })
    }


    /**
     * changes the user's prifile image for a new one
     * @param {object} newImage new image in base 64
     * @param {Function(Error, object)} callback
     */

    Usuario.prototype.changeMyProfileImage = function(profileImage, callback) {
        var Upload = Usuario.app.models.Upload
        var actual = this;
        // TODO
        var newProfileImage = {
            encodedFileContainer: "profileImages",
            name: profileImage.name,
            resize: profileImage.resize,
            base64File: profileImage.base64File,
            fileExtention: profileImage.fileExtention
        }
        Upload.replaceFileBase64File(actual.profileImageId, newProfileImage, function(err, res) {
            if (err) return callback(err);

            actual.profileImage(res);
            Usuario.upsert(actual, function(err, updatedUser) {

                if (err) return callback(err);
                Usuario.findOne({ where: { id: updatedUser.id } }, function(err, userWR) {
                    if (err) return callback(err);
                    callback(null, userWR);
                });
            })
        })
    };


    /**
     * [Endpoint] Update admin password
     * @param {object} ctx context object
     * @param {object} data {userId, newPassword}
     * @param {Function(Error)} callback
     */
    Usuario.changeAnyPassword = function(ctx, data, callback) {
        Usuario.getAnyUsers(ctx, function(err, users) {
            if (err) return callback(err)

            if (!users.find(elem => elem.id == data.userId)) {
                return callback("What are you doing?...")
            }

            Usuario.setPassword(data.userId, data.newPassword, function(err) {
                if (err) return callback(err)

                callback(null, "success")
            })
        })
    }

    Usuario.prototype.loadUserData = function(callback) {
        let userWithCredentials = this
        let permissionsFilter = {}

        userWithCredentials.userPermissions(permissionsFilter, function(err, userPermissions) {
            if (err) return callback(err)

            Usuario.app.models.UserPermissionPolicyNode.preselectNodes(userPermissions, function(err, parsedUserPermissions) {
                if (err) return callback(err)

                userWithCredentials.permissions = parsedUserPermissions
                return callback(null, userWithCredentials)
            })
        })
    }
};