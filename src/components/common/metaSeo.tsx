import {Helmet} from "react-helmet-async";
import logo from "@assets/images/logo.png"
type MetaSeoProps = {
    title : string;
}
export default function MetaSeo({ title }:MetaSeoProps){
    return (
        <Helmet>
            <title>{title}</title>
            <link
                rel="icon"
                // href="/favicon.ico"
                href={logo}
            />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Helmet>
    )
}