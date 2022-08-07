import LoginLayout from "@/components/join/loginLayout";
import LoginForm from "@/components/join/loginForm";
import {Divider, Header, Message, Segment} from "semantic-ui-react";

export default function Login(){
    return (
        <LoginLayout>
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
        </LoginLayout>
    )
}