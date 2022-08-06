import HeaderNav from "@/components/template/header";
import Sidenav from "@/components/template/sidenav";
import {useRecoilValue} from "recoil";
import {sidebarState} from "@/app/template";
import {Sidebar} from "semantic-ui-react";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export default function Template({children}: Props) {
    const isOpen = useRecoilValue(sidebarState);
    return (
        <>
            <HeaderNav/>
            <Sidenav visible={isOpen.visible}/>
            <Sidebar.Pusher>
                {children}
            </Sidebar.Pusher>
        </>
    )
}