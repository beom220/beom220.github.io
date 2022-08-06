import {Container, Dropdown, Menu, Image, Icon, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {sidebarState} from "@/app/template";
import {useCallback, useEffect} from "react";
import {memberState} from "@/app/member";
import useSession from "@/hooks/useSession";

export default function HeaderNav() {
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    const [member, setMember] = useRecoilState(memberState);
    const {DeleteSession} = useSession();

    useEffect(()=>{
        console.log(member)
    },[member])

    const sidebarToggle = useCallback(() => {
        setIsOpen({
            visible: !isOpen.visible,
            dimmed: !isOpen.dimmed
        })
    },[isOpen]);

    const onLogOut = useCallback(() => {
        DeleteSession('user');
        setMember(null);
    }, [member])

    return (
        <Menu fixed='top' inverted>
            <Menu.Item icon onClick={sidebarToggle}>
                <Icon name="sidebar"/>
            </Menu.Item>
            <Menu.Item as={Link} to="/" header>
                <Image size='tiny' src='https://img.shields.io/badge/-React-blue?&logo=React&logoColor=white'/>
                {/*Project Name*/}
            </Menu.Item>

            <Dropdown item simple text='Dropdown'>
                <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Header>Header Item</Dropdown.Header>
                    <Dropdown.Item>
                        <i className='dropdown icon'/>
                        <span className='text'>Submenu</span>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {member?
                <Menu.Item as={Button} onClick={onLogOut}>LogOut</Menu.Item> :
                <Menu.Item as={Link} to="login">Join</Menu.Item>
            }
        </Menu>
    )
}