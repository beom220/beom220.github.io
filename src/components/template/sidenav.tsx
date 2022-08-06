import {Icon, Menu, Sidebar} from "semantic-ui-react";

interface SideOptions {
    visible: boolean;
}

export default function Sidenav({visible}: SideOptions) {
    return (
        <Sidebar
            as={Menu}
            animation="overlay"
            direction="left"
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
            style={{
                top: '53px',
            }}
        >
            <Menu.Item as='a'>
                <Icon name='home'/>
                Home
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='gamepad'/>
                Games
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera'/>
                Channels
            </Menu.Item>
        </Sidebar>
    );
}