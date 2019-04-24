'use strict';

var disableRelationMethods = require("../helpers/model-methods-helper").disableRelationMethods;
const request = require('request');

module.exports = function(PushTokens) {
    disableRelationMethods(PushTokens)
    
    PushTokens.sendPushNotification = function(pushTokens,
        not = {
            tag: "jarabeDefault",
            title: "default",
            content: "body default",
            icon: "",
            image:"",
            link: "",
            vibrate: true,
            onclick: () => {console.log("default click")}
        }, callback) {
        var desktopKey = "key=AAAACBx3Rhk:APA91bHbX3QnY9HWv8vtnIe2sGU_cU3uxUpV2C7pUhzny4cjuSZNBzRY00pORUBpc4p_AwDptAB3tagOWibz0o1SqYWVYXI51gtxFbp6HqE869m9BAYxqCAUVNQUsv6ezAd-GoNznvtUuT2-dDwad7Pt6gycHhVVkg"
        var mobileKey = "key=AAAAzXAWB2M:APA91bGOdatSPp8zVZ7xw5Y5v8t3qRr3OpeUM4qtGJm_qbqFhUX7tFJJIic4PkUhC8ogovkZvGts1gS5NtSGe-aWt5ukbhDoGmknXExv1FBzLLuF9sHlfisB97eplOHtdG2LerHToCPZ"
        if (pushTokens.length != 0) {

            const fireBaseURI = "https://fcm.googleapis.com/fcm/send"

            // prepare desktop notifications
            var desktop_headers = {
                "Content-Type": "application/json",
                "Authorization": desktopKey
            }
            var notificationOptions =       
            {
                priority: "high",
                content_available: (not.content)?true:false,
                sound: "default",
                vibrate: true,
                body: not.content,
                title: not.title,
                click_action: not.link,
                icon: not.image,
                tag: not.tag,
                onclick: not.onclick
            }
            var desktop_data = {
                notification: notificationOptions,
                registration_ids: []
            }

            // prepare mobile notifications
            var mobile_headers = {
                "Content-Type": "application/json",
                "Authorization": mobileKey
            }
            var mobile_data = {
                notification: notificationOptions,
                registration_ids: []
            }

            pushTokens.forEach(pT => {
                console.log("Pushtocken", pT)
                if (pT.mobile == true)
                    mobile_data.registration_ids.push(pT.id)
                else
                    desktop_data.registration_ids.push(pT.id)
            });
            console.log("count mobile",mobile_data.registration_ids.length)
            console.log("count desktop",desktop_data.registration_ids.length)
            var result = {
                desktop: {},
                mobile: {}
            }
            // send desktop notifications
            request.post(fireBaseURI, {
                body: JSON.stringify(desktop_data),
                headers: desktop_headers
            }, function (err, response, body) {
                if (err) return callback(err);

                if (body) {
                    result.desktop = body;

                    // send mobile notificationsk
                    request.post(fireBaseURI, {
                        body: JSON.stringify(mobile_data),
                        headers: mobile_headers
                    }, function (err, response, body) {
                        if (err) return callback(err);

                        if (body) {
                            result.mobile = body;

                            return callback(null, result);
                        } else {
                            return callback(null, response)
                        }
                    })
                } else {
                    return callback(null, response)
                }
            })
        }
    }
};