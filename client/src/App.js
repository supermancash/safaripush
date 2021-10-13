import './App.css';
import NotificationForm from './components/NotificationForm';
import {useEffect, useState} from "react";

function App() {
    const [permissionData, setPermissionData] = useState({});
    const [permission, setPermission] = useState("default");

    useEffect(() => {
        if ('safari' in window && 'pushNotification' in window.safari) {
            setPermissionData(window.safari.pushNotification.permission('web.com.safaripushapi'));
            checkRemotePermission(permissionData, true);
        } else {
            document.getElementById("mainDiv").innerHTML = "Please use safari to access this app"
        }
    });

    function checkRemotePermission(permissionData, onLoad) {
        if (permissionData.permission === 'default' && !onLoad) {
            window.safari.pushNotification.requestPermission(
                'https://safaripushapi.herokuapp.com',
                'web.com.safaripushapi',
                {},
                checkRemotePermission
            ).catch((err) => console.log(err));
        } else if (permissionData.permission === 'denied') {
            setPermission("denied");
            document.getElementById("subscribeParagraph").innerHTML = "Please press accept on the notification prompt. ";
        } else if (permissionData.permission === 'granted') {
            setPermission("granted");
            document.getElementById("subscribeButtonDiv").innerHTML = "";
            console.log(permissionData);
        }
    }

    function subscribeHandler() {
        if ('safari' in window && 'pushNotification' in window.safari) {
            checkRemotePermission(permissionData, false);
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

    return (
        <div id="mainDiv" className="App">
            <div id="subscribeButtonDiv">
                <button className="subscribeButton" onClick={subscribeHandler}>Subscribe</button>
                <p id="subscribeParagraph"/>
            </div>
            {permission==="granted" ? <NotificationForm userToken={permissionData.deviceToken}/> : <div/>}
        </div>
    );
}

export default App;
