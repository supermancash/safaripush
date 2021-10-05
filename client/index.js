function buttonHandler () {
    if ('safari' in window && 'pushNotification' in window.safari) {
        let permissionData = window.safari.pushNotification.permission('web.app.netlify.webpush');
        checkRemotePermission(permissionData);
        console.log("safari");
    }
}

function checkRemotePermission(permissionData) {
    if (permissionData.permission === 'default') {
        window.safari.pushNotification.requestPermission(
            'https://safaripushapi.herokuapp.com',
            'web.app.netlify.webpush',
            {},
            checkRemotePermission
        );
    } else if (permissionData.permission === 'denied') {
        console.log("You didn't accept")
    } else if (permissionData.permission === 'granted') {
        console.log(permissionData);
    }
}
