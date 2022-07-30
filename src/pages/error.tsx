import {Button, Modal, Header, Icon, Divider} from "semantic-ui-react";

export function ErrorPage(){
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
                <Button color='green' inverted>
                    <Icon name='checkmark' /> Go Back
                </Button>
            </Modal.Actions>
        </Modal>
    )
}