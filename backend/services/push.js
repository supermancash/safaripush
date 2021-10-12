const apn = require('node-apn');
const path = require('path');
const fs = require('fs');

const pathToKey = path.resolve('../resources/AuthKey_Y82Y8NQ7T6.p8');

const options = {
    token: {
        key: fs.readFileSync(pathToKey),
        keyId: "Y82Y8NQ7T6",
        teamId: "69Z6V85N79"
    },
    production: false
};

const apnProvider = new apn.Provider(options);

const deviceToken = "8D253E9EC48D645D000646F2E2573B6B3AC3E13305FAC31F2760AEF10810EF9B";

const notification = new apn.Notification();

notification.topic = "web.com.safaripushapi";
notification.badge = 3;
notification.alert = "You have a new message";
notification.payload = {'messageFrom': 'John Appleseed'};

apnProvider.send(notification, deviceToken).then( (result) => {
    console.log(result);
    console.log(result.failed[0].response);
    // see documentation for an explanation of result
});
