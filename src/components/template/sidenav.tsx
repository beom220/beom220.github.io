import { Menu, Sidebar} from "semantic-ui-react";
import {useRecoilState} from "recoil";
import {sidebarState} from "@/app/template";
import {useCallback} from "react";
import {menuList} from "@/constants/menuList";
import {Link} from "react-router-dom";

export default function Sidenav() {
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    const sidebarClose = useCallback((): void => {
        setIsOpen({
            visible: false,
            dimmed: false
        })
    }, [setIsOpen]);

    const MenuList = menuList.map((v) => {
        return <Menu.Item as={Link} to={`/${v}`} style={{textAlign:'left'}}>{v}</Menu.Item>
    })

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
            style={{top: '53px', width:'80%', maxWidth:'200px'}}
        >
            {MenuList}
        </Sidebar>
    );
}