import { Menu, Sidebar} from "semantic-ui-react";
import {useRecoilState} from "recoil";
import {sidebarState} from "@/app/template";
import {useCallback} from "react";

export default function Sidenav() {
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    const sidebarClose = useCallback((): void => {
        setIsOpen({
            visible: false,
            dimmed: false
        })
    }, [setIsOpen]);


    return (
        <Sidebar
            as={Menu}
            animation="push"
            direction="left"
            icon='labeled'
            inverted
            vertical
            visible={isOpen.visible}
            onHide={sidebarClose}
            width='thin'
            style={{top: '53px'}}
        >

            <Menu.Item as='a'>Home</Menu.Item>
            <Menu.Item as='a'>Games</Menu.Item>
            <Menu.Item as='a'>Channels</Menu.Item>
        </Sidebar>
    );
}