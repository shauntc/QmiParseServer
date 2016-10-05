/**
 * Created by Sam on 2016-03-28.
 */
'use strict';

Parse.Cloud.define('hello', (request, response) => {
    response.success('Hi');
});

Parse.Cloud.define("sendPushNotification", function (request, response) {

    // Create the push data
    const data = {
        alert: request.params.AlertText
    };

    // Create a query for all installations
    const installationQuery = new Parse.Query(Parse.Installation);

    // Send the push notification to all installations
    sendPushNotification(installationQuery, data)
        .then(() => response.success())
        .catch(error => response.error(error));
});

Parse.Cloud.define("sendSilentNotification", function (request, response) {
                   
                   // Create the push data
                   const data = {
                   alert: request.params.channel
//                   content-available:1
                   };
                   
                   
                   
                   // Create a query for all installations
                   const installationQuery = new Parse.Query(Parse.Installation);
                   installationQuery.equalTo("channels",request.params.channel);
                   
                   // Send the push notification to all installations
                   sendPushNotification(installationQuery, data)
                   .then(() => response.success())
                   .catch(error => response.error(error));
                   });

function sendPushNotification(installationQuery, data) {
    return new Promise((resolve, reject) => {
                       Parse.Push.send({
                                       where: installationQuery,
                                       data: data
                                       }, {useMasterKey: true})
                       .then(result => {
                             // Push was successful
                             console.log(`sendPushNotification success ${result}`);
                             resolve(result);
                             })
                       .catch(error => {
                              console.log(`sendPushNotification error ${error.message}`);
                              reject(error);
                              });
                       });
};
