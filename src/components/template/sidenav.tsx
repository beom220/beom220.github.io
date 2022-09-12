import { Menu, Sidebar} from "semantic-ui-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {sidebarState} from "@/app/template";
import {MouseEvent, useCallback, useEffect, useState} from "react";
import {publicMenuList, privateMenuList} from "@/constants/menuList";
import {Link} from "react-router-dom";
import {MenuItemProps} from "semantic-ui-react";
import {useLocation} from "react-router";
import {memberState} from "@/app/member";

export default function Sidenav() {
    const member = useRecoilValue(memberState);
    const location = useLocation();
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    const [activeItem, setActiveItem] = useState<string>(
        member.auth_level ?
            publicMenuList(member.shop)[0].href :
            privateMenuList[0].href
    )

    const menuList = member.auth_level ? publicMenuList(member.shop) : privateMenuList;

    useEffect(() =>{
        setActiveItem(location.pathname.split('/')[1])
    },[location])

    const sidebarClose = useCallback((): void => {
        setIsOpen({
            visible: false,
            dimmed: false
        })
    }, [setIsOpen]);

    const onActiveItem = (e:MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => {
        // setActiveItem(data.name as string)
        sidebarClose()
    }
    const MenuList = menuList.map((v) => {
        return <Menu.Item
            key={v.title}
            as={Link}
            to={`${v.href}`}
            style={{
                textAlign:'left',
                fontSize: '14px'
            }}
            name={v.title}
            active={v.href.includes(activeItem)}
            onClick={onActiveItem}
        />
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
            style={{top: '53px', width:'80%', maxWidth:'240px'}}
        >
            <Menu.Item style={{textAlign:'left'}}>
                <Menu.Header>제휴사</Menu.Header>
                <Menu.Menu>
                    {MenuList}
                </Menu.Menu>
            </Menu.Item>

        </Sidebar>
    );
}