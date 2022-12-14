import {Button, Modal, Header, Icon, Divider} from "semantic-ui-react";
import {useNavigate} from "react-router";

export default function ErrorPage(){
    const navigate = useNavigate();
    return(
        <Modal
            basic
            open
            size='small'
        >
            <Header icon>
                <Icon name='ban' color='red'/>
                <Divider/>
                404. That’s an error.
            </Header>
            <Modal.Content>
                <p style={{textAlign: 'center'}}>
                    The requested URL was not found on this server. That’s all we know.
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' type="button" inverted onClick={() => navigate('/')}>
                    <Icon name='checkmark' /> Go Back
                </Button>
            </Modal.Actions>
        </Modal>
    )
}