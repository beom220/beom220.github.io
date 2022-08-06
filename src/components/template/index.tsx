import HeaderNav from "@/components/template/header";
import Sidenav from "@/components/template/sidenav";
import {useRecoilValue} from "recoil";
import {sidebarState} from "@/app/template";
import {Sidebar} from "semantic-ui-react";
import {ReactNode, useEffect} from "react";

interface Props {
    children: ReactNode;
}

export default function Template({children}: Props) {
    const isOpen = useRecoilValue(sidebarState);

    // isOpen.visible ?

    return (
        <>
            <HeaderNav/>
            <Sidenav visible={isOpen.visible}/>
            <Sidebar.Pusher>
                <div style={{
                    marginTop: '96px',
                    width: '100%',
                    transition: 'all ease .5s',
                    paddingLeft: isOpen.visible? '200px' : '46px',
                    paddingRight: '46px',
                    border: '1px solid #eee'
                }}>
                    {children}
                </div>
            </Sidebar.Pusher>
        </>
    )
}
