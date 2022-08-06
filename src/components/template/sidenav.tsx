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
            <Menu.Item as='a'>Home</Menu.Item>
            <Menu.Item as='a'>Games</Menu.Item>
            <Menu.Item as='a'>Channels</Menu.Item>
        </Sidebar>
    );
}