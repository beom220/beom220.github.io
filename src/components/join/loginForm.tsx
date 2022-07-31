import {Grid, Segment} from "semantic-ui-react";
import FormLayer from "@/components/join/formLayer";

export default function LoginForm() {
    return (
        <Grid style={{marginTop: "20px"}}>
            <Grid.Row centered columns={2}>
                <Grid.Column centered="true">
                    <Segment>
                        <FormLayer/>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}