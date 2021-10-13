function NotificationForm(props) {
    function sendHandler(e) {
        e.preventDefault();
        const form = document.getElementById("notificationForm");
        const formData = new FormData(form);
        let formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const requestPath = "/notifications/send/" + props.userToken;
        fetch(requestPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        }).catch((err) => console.log(err));

    }

    return (
        <div>
            <form onSubmit={(e) => sendHandler(e)} id="notificationForm">
                <label>Title of notification:</label>
                <input type="text" name="notificationTitle"/>
                <label>Body of notification:</label>
                <input type="text" name="notificationBody"/>
                <input type="submit" value="Send my notification"/>
            </form>
        </div>
    )
}

export default NotificationForm;
