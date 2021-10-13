import './App.css';

function App() {
    let userToken = null;

    function subscribeHandler() {
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
                console.log(responseBody);
            })
        });
        fetch('/v1/devices/showdevices', {
            method: 'GET'
        }).then(response => {
            responseData = response.json();
            responseData.then(body => {
                responseBody = body;
                console.log(responseBody);
            })
        })
        fetch('/v1/devices/showrequests', {
            method: 'GET'
        }).then(response => {
            responseData = response.json();
            responseData.then(body => {
                responseBody = body;
                console.log(responseBody);
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
            userToken = permissionData.deviceToken;
        }
    }

    function sendHandler(e) {
        e.preventDefault();
        if(userToken!=null){
            const form = document.getElementById("notificationForm");
            const formData = new FormData(form);
            let formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            const requestPath = "/notifications/send/" + userToken;
            fetch(requestPath, {
                method: 'POST',
                body: JSON.stringify(formObject)
            }).catch((err) => console.log(err));
        }
    }


    return (
        <div className="App">
            <button className="subscribeButton" onClick={subscribeHandler}>Subscribe</button>
            <form onSubmit={(e) => sendHandler(e)} id="notificationForm">
                <label>Title of notification:</label>
                <input type="text" name="notificationTitle"/>
                <label>Body of notification:</label>
                <input type="text" name="notificationBody"/>
                <input type="submit" value="Send my notification"/>
            </form>
        </div>
    );
}

export default App;
