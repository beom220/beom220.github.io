import {ReactNode} from "react";
import HeaderNav from "@/components/template/header";
import Sidenav from "@/components/template/sidenav";
import Contents from "@/components/template/contents";


interface Props {
    children: ReactNode;
}

export default function Template({children}: Props) {
    return (
        <>
            <HeaderNav/>
            <Sidenav/>
            <Contents children={children}/>
        </>
    )
}
