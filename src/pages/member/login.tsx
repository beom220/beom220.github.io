import LoginLayout from "@/components/join/loginLayout";
import LoginForm from "@/components/join/loginForm";
import {Divider, Header, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

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
                New to us? <Link to="/">Sign Up</Link>
            </Message>
        </LoginLayout>
    )
}