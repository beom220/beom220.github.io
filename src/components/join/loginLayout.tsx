import {Grid} from "semantic-ui-react";
import {ReactNode} from "react";
// import loginBg from "@/assets/images/bg.jpg"
// import styled from "@emotion/styled";

interface Props {
    children?: ReactNode
}

export default function LoginLayout({children}: Props) {
    return (
        <>
            {/*<Background/>*/}
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450, position:'fixed'}}>
                    {children}
                </Grid.Column>
            </Grid>
        </>
    );
}

// const Background = styled.span`
//     height:100vh;
//     width: 100%;
//     position: fixed !important;
//     zIndex: -1;
//     background-image:url(${loginBg});
//     background-size:cover;
//     background-repeat:no-repeat;
//     background-position:center right;
// `