import {Grid, Segment} from "semantic-ui-react";
import FormLayer from "@/components/join/formLayer";
import Helper from "@/pages/helper";

export default function LoginForm() {
    return (
        <Grid style={{marginTop: "20px"}}>
            <Grid.Row centered columns={2}>
                <Grid.Column centered="true">
                    <Segment>
                        <FormLayer/>
                    </Segment>
                    <Helper/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}