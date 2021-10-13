import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            <Form onSubmit={(e) => sendHandler(e)} id="notificationForm">
                <Form.Group>
                    <Form.Label>Title of notification:</Form.Label>
                    <Form.Control type="text" name="notificationTitle"/>
                    <Form.Text className="text-muted">
                        This will appear as the main title of the notification.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body of notification:</Form.Label>
                    <Form.Control type="text" name="notificationBody"/>
                    <Form.Text className="text-muted">
                        This will appear as the description of the notification in a smaller font.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" >Send my notification</Button>
            </Form>
        </div>
    )
}

export default NotificationForm;
