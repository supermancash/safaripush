








function buttonHandler () {
    if ('safari' in window && 'pushNotification' in window.safari) {
        let permissionData = window.safari.pushNotification.permission('web.com.safaripushapi');
        checkRemotePermission(permissionData);
        console.log("safari");
    }
    let responseData, responseBody;
    fetch('/v1/log/showthem', {
        method: 'GET'
    }).then(response => {
        responseData = response.json();
        responseData.then(body => {
            responseBody = body;
            document.getElementById("requestLog").innerHTML = "Logs: " + JSON.stringify(responseBody);
        })
    });
    fetch('/v1/devices/showdevices', {
        method: 'GET'
    }).then(response => {
        responseData = response.json();
        responseData.then(body => {
            responseBody = body;
            document.getElementById("devices").innerHTML = "Device tokens: " + JSON.stringify(responseBody);
        })
    })
    fetch('/v1/devices/showrequests', {
        method: 'GET'
    }).then(response => {
        responseData = response.json();
        responseData.then(body => {
            responseBody = body;
            document.getElementById("requestsAPNS").innerHTML = "Requestbodies from apns: " + JSON.stringify(responseBody);
        })
    })
}

function checkRemotePermission(permissionData) {
    if (permissionData.permission === 'default') {
        window.safari.pushNotification.requestPermission(
            'https://safaripushapi.herokuapp.com',
            'web.com.safaripushapi',
            {},
            checkRemotePermission
        );
    } else if (permissionData.permission === 'denied') {
        console.log("You didn't accept")
    } else if (permissionData.permission === 'granted') {
        console.log(permissionData);
    }
}
