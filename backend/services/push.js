const apn = require('node-apn');
const path = require('path');
const fs = require('fs');

const pushNotification = (deviceToken, title, body) => {
    const pathToKey = path.join(__dirname, '../resources/AuthKey_Y82Y8NQ7T6.p8');

    const options = {
        token: {
            key: fs.readFileSync(pathToKey),
            keyId: "Y82Y8NQ7T6",
            teamId: "69Z6V85N79"
        },
        production: true
    };

    const apnProvider = new apn.Provider(options);

    const notification = new apn.Notification();

    notification.topic = "web.com.safaripushapi";
    notification.badge = 3;
    notification.alert = {
        'title':title,
        'body':body
    };
    notification.urlArgs = ["test"];
    apnProvider.send(notification, deviceToken).then( (result) => {
        console.log(result);
        if(result.failed.length>0) console.log(result.failed[0].response);
        // see documentation for an explanation of result
    });
}

module.exports = pushNotification;
