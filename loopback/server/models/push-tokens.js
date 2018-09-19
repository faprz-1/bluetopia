'use strict';

var disableRelationMethods = require("../helpers/model-methods-helper").disableRelationMethods;
const request = require('request');

module.exports = function(PushTokens) {
    disableRelationMethods(PushTokens)
    
    PushTokens.sendPushNotification = function(pushTokens, not, callback){
        var desktopKey = "key=AAAACBx3Rhk:APA91bHbX3QnY9HWv8vtnIe2sGU_cU3uxUpV2C7pUhzny4cjuSZNBzRY00pORUBpc4p_AwDptAB3tagOWibz0o1SqYWVYXI51gtxFbp6HqE869m9BAYxqCAUVNQUsv6ezAd-GoNznvtUuT2-dDwad7Pt6gycHhVVkg"
        var mobileKey = "key=AAAAzXAWB2M:APA91bGOdatSPp8zVZ7xw5Y5v8t3qRr3OpeUM4qtGJm_qbqFhUX7tFJJIic4PkUhC8ogovkZvGts1gS5NtSGe-aWt5ukbhDoGmknXExv1FBzLLuF9sHlfisB97eplOHtdG2LerHToCPZ"
        if(pushTokens.length!=0){

            const fireBaseURI = "https://fcm.googleapis.com/fcm/send"

            // prepare desktop notifications
            var desktop_headers = {
                "Content-Type": "application/json",
                "Authorization":  desktopKey
            }
            var desktop_data = {
                notification: {
                    priority: "high",
                    content_available: false,
                    sound: "default",
                    body: not.body,
                    title: not.title,
                    click_action: not.link,
                    icon: not.image
                },
                registration_ids: []
            }

            // prepare mobile notifications
            var mobile_headers = {
                "Content-Type": "application/json",
                "Authorization":  mobileKey
            }
            var mobile_data = {
                notification: {
                    priority: "high",
                    content_available: false,
                    sound: "default",
                    body: not.body,
                    title: not.title,
                    icon: not.image
                },
                registration_ids: []
            }

            pushTokens.forEach(pT => {
                if(pT.isMobile)
                    mobile_data.registration_ids.push(pT.id)
                else
                    desktop_data.registration_ids.push(pT.id)
            });
            
            var result ={
                desktop: {},
                mobile: {}
            }
            // send desktop notifications
            request.post(fireBaseURI,{
                body: JSON.stringify(desktop_data),
                headers: desktop_headers
            }, function(err, response, body){
                if (err) return callback(err);

                if(body){
                    result.desktop = JSON.parse(body);

                    // send mobile notificationsk
                    request.post(fireBaseURI,{
                        body: JSON.stringify(mobile_data),
                        headers: mobile_headers
                    }, function(err, response, body){
                        if (err) return callback(err);
        
                        if(body){
                            result.mobile = JSON.parse(body);
        
                            return callback(null, result);
                        }else{
                            return callback(null, response)
                        }
                    })
                }else{
                    return callback(null, response)
                }
            })
        }
    }
};
    