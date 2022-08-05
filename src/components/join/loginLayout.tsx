import {Grid, Header, Segment, Message, Image, Divider} from "semantic-ui-react";
import LoginForm from "@/components/join/loginForm";
// import loginBg from "@/assets/images/bg.jpg"
// import styled from "@emotion/styled";
export default function LoginLayout() {
    return (
        <div>
            {/*<Background/>*/}
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Segment>
                        <Header as='h2' color='black' textAlign='left'>
                            Join Us
                        </Header>
                        <Divider hidden/>
                        <LoginForm/>
                    </Segment>
                    <Message>
                        New to us? <a href='#'>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
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