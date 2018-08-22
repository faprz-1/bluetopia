'use strict';

var disableRelationMethods = require("../helpers/model-methods-helper").disableRelationMethods;
const request = require('request');

module.exports = function(PushTokens) {
    disableRelationMethods(PushTokens)
    
    PushTokens.sendPushNotification = function(pushTokens, not, callback){
        console.log("mis push",pushTokens);
        if(pushTokens.length!=0){

            var fireBaseURI = "https://fcm.googleapis.com/fcm/send"
            var headers = {
                "Content-Type": "application/json",
                "Authorization": "key=AAAACBx3Rhk:APA91bHbX3QnY9HWv8vtnIe2sGU_cU3uxUpV2C7pUhzny4cjuSZNBzRY00pORUBpc4p_AwDptAB3tagOWibz0o1SqYWVYXI51gtxFbp6HqE869m9BAYxqCAUVNQUsv6ezAd-GoNznvtUuT2-dDwad7Pt6gycHhVVkg"
            }
            var data = {
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
            pushTokens.forEach(pT => {
                data.registration_ids.push(pT.id)
            });
            
            request.post(fireBaseURI,{
                body: JSON.stringify(data),
                headers: headers
            }, function(err, response, body){
                if (err) {
                    console.log(err.stack);
                    
                    return callback(err);
                }
                if(body){
                    return callback(null, JSON.parse(body));
                }else{
                    return callback(null, response)
                }
            })
        }
    }
};
    