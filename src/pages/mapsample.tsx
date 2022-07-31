import {Map, MapMarker} from "react-kakao-maps-sdk";
import {Button, Grid, Icon, Segment} from "semantic-ui-react";
import {useNavigate} from "react-router";
import Helper from "@/pages/helper";

export default function MapSample() {
    const navigate = useNavigate();
    const whereAt = {
        lat: 37.47943754699013, lng: 126.82406106502174
    }
    return (
        <Grid style={{marginTop: "20px"}}>
            <Grid.Row centered columns={2}>
                <Grid.Column centered="true">
                    <Segment>
                        <Map
                            center={whereAt}
                            level={3}
                            draggable={true}
                            zoomable={true}
                            style={{width: "100%", height: "200px"}}
                        >
                            <MapMarker position={whereAt}>
                                <div style={{color: "#000"}}>집</div>
                            </MapMarker>
                        </Map>
                    </Segment>
                    <Helper/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}