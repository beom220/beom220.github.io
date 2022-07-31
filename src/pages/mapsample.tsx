import {Map, MapMarker, useInjectKakaoMapApi} from "react-kakao-maps-sdk";
import {Grid, Placeholder, Segment} from "semantic-ui-react";
import Helper from "@/pages/helper";

export default function MapSample() {
    const {loading, error} = useInjectKakaoMapApi({
        appkey: process.env.REACT_APP_KAKAOMAP_API_KEY.toString()
    })

    const coordinate = {
        lat: 37.53702976188573, lng: 127.00923267432718
    }
    return (
        <Grid style={{marginTop: "20px"}}>
            <Grid.Row centered columns={2}>
                <Grid.Column centered="true">
                    <Segment>
                        {loading ?
                            <Placeholder style={{width: "100%", height: 200, maxWidth: "unset"}}>
                                <Placeholder.Image/>
                            </Placeholder> :
                            <Map
                                center={coordinate}
                                level={3}
                                draggable={true}
                                zoomable={true}
                                style={{width: "100%", height: "200px"}}
                            >
                                <MapMarker position={coordinate}>
                                    <div style={{color: "#000", textAlign: "center"}}>집</div>
                                </MapMarker>
                            </Map>
                        }

                    </Segment>
                    <Helper/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}