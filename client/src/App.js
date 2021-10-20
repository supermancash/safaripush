import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import NotificationForm from './components/NotificationForm';
import './index.css';

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
        } else if (permissionData.permission === 'granted') {
            setPermission("granted");
            console.log(permissionData);
        }
    }

    function subscribeHandler() {
        if ('safari' in window && 'pushNotification' in window.safari) {
            setPermissionData(window.safari.pushNotification.permission('web.com.safaripushapi'));
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
            {permission === "default" || permission === "denied" ?
                <div id="subscribeButtonDiv">
                    <Card border="primary" bg="light">
                        <Card.Body>
                            <Button className="subscribeButton" onClick={subscribeHandler}>Subscribe to safari push
                                notifications</Button>
                            <Card.Text>Please press accept on the prompt after pressing the button</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                :
                <div>
                    <Card border="primary" bg="light">
                        <Card.Body>
                            <NotificationForm userToken={permissionData.deviceToken}/>
                        </Card.Body>
                    </Card>

                </div>
            }
        </div>
    );
}

export default App;
