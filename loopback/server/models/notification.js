'use strict';
var pubsub = require('../helpers/pubsub.js');
var hostURL = require("../helpers/constants").hostURL;

module.exports = function (Notification) {

    Notification.setSeen = function ( notificationId, callback) {

        Notification.upsert( { id : notificationId, seen: new Date() }, (err, res) => {
            if (err) return callback(err, 'Error al marcar como visto');
            return callback(null, res);
        });

    }

    Notification.setCero = function (num) {
        return num < 10 ? "0" + num : num;
    }

    Notification.getById = function (ctx, limit, lastId, callback) {
        var user_id = ctx.accessToken.userId;
        let filter = {
            limit: limit,
            order: "id DESC",
            where: {
                usuarioId: user_id,
            }
        }
        if (lastId) {
            filter.where.id = {
                lt: lastId
            }
        }
        Notification.find(filter, function (err, notifications) {
            if (err) return callback(err);

            return callback(null, notifications);
        })
    };

    Notification.setSingleNotification = function (userId, notification, callback) {
        let Usuario = Notification.app.models.Usuario;
        let PushTokens = Notification.app.models.PushTokens;

        notification.usuarioId = userId;
        // notification.link = hostURL + notification.link;

        Notification.create(notification, function (err, notification) {
            if (err) return callback(err);
            let filter = {
                where: { id: userId },
                fields : { id : true },
                include: 'pushTokens'
            }
            Usuario.findOne(filter, (err, user) => {
                if (err) return callback(err);
                user = JSON.parse(JSON.stringify(user))
                PushTokens.sendMobilePushNotification(user.pushTokens, notification, function (err, res) {
                    if (err) return callback(err);

                })
            })

        })
    };

    Notification.setByRoleNotification = function (Role, notification) {
        var Usuario = Notification.app.models.Usuario;

        Usuario.findByRole(Role, ["pushTokens"], function (err, users) {
            if (err) return err;

            users.forEach(user => {
                Notification.setSingleNotification(user.id, notification);
            });

            return users;
        })

    }
};