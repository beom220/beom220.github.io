import {Container, Segment, Sidebar} from "semantic-ui-react";
import {useRecoilValue} from "recoil";
import {sidebarState} from "@/app/template";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export default function Contents({children}: Props) {
    const isOpen = useRecoilValue(sidebarState);

    return (
        <Sidebar.Pushable>
            <Sidebar.Pusher dimmed={isOpen.dimmed}>
                <Segment style={{
                    paddingTop: '96px',
                    width: '100%',
                    paddingLeft: '46px',
                    paddingRight: '46px',
                    paddingBottom: '126px',
                    transition: 'all ease .5s',
                    minHeight: '100vh',
                    // paddingLeft: isOpen.visible ? '200px' : '46px',
                    // border: '1px solid #eee'
                }}>
                    {children}
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}