import {Grid, Header, Segment, Message} from "semantic-ui-react";
import LoginForm from "@/components/join/loginForm";

export default function LoginLayout() {
    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='black' textAlign='center'>
                    {/*자늑 더 베이크*/}
                    <span style={{fontSize:'2.25rem', paddingRight:'.375rem'}}>JANEK</span>
                     the bake
                </Header>
                <Segment stacked>
                    <LoginForm/>
                </Segment>
                <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}