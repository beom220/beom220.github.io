import {Menu, Image, Icon, } from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {sidebarState} from "@/app/template";
import {useCallback, useEffect, useState} from "react";
import {memberState} from "@/app/member";
import useSession from "@/hooks/useSession";
import { MessagePortal } from "@/components/common";
import {useNavigate} from "react-router";

export default function HeaderNav() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useRecoilState(sidebarState);
    const [member, setMember] = useRecoilState(memberState);
    const [fadeMessage, setFadeMessage] = useState<boolean>(false);
    const {DeleteSession} = useSession();

    const sidebarToggle = useCallback((): void => {
        setIsOpen({
            visible: !isOpen.visible,
            dimmed: !isOpen.dimmed
        })
    }, [isOpen, setIsOpen]);

    const onLogOut = useCallback((): void => {
        DeleteSession('user');
        setMember(null);
        setFadeMessage(true);
        navigate('/login')
    }, [setMember, DeleteSession, navigate])

    useEffect(() => {
        if (fadeMessage) {
            setTimeout(() => {
                setFadeMessage(false)
            }, 2000)
        }
    }, [fadeMessage])


    return (
        <Menu fixed='top' inverted>
            <Menu.Item icon onClick={sidebarToggle}>
                <Icon name="sidebar"/>
            </Menu.Item>
            <Menu.Item as={Link} to="/" header>
                <Image size='tiny' src='https://img.shields.io/badge/-React-blue?&logo=React&logoColor=white'/>
                {/*Project Name*/}
            </Menu.Item>

            <Menu.Menu position="right">
                {member ?
                    <>
                    <Menu.Item onClick={onLogOut}>
                        My Page
                    </Menu.Item>
                    <Menu.Item onClick={onLogOut} color="black">Sign Out <Icon style={{paddingLeft:".625rem"}} name="sign out alternate"/></Menu.Item>
                    </> :
                    <Menu.Item as={Link} to="/login">
                        Join Us
                    </Menu.Item>
                }

            </Menu.Menu>
            <MessagePortal isOpen={fadeMessage}>
                <p>로그아웃 하셨습니다</p>
            </MessagePortal>
        </Menu>
    );
}