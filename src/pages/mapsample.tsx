export default function MapSample() {
    return (
        <>맵 기다리셈</>
    )
}
// import {Map, MapMarker, useInjectKakaoMapApi} from "react-kakao-maps-sdk";
// import {Grid, Placeholder, Segment} from "semantic-ui-react";
// import Helper from "@/pages/helper";
//
// export default function MapSample() {
//     const {loading, error} = useInjectKakaoMapApi({
//         appkey: process.env.REACT_APP_KAKAOMAP_API_KEY.toString()
//     })
//     const coordinate = {
//         lat: 37.46700010391151, lng: 126.65644969608586
//     }
//     return (
//         <Grid style={{marginTop: "20px"}}>
//             <Grid.Row centered columns={2}>
//                 <Grid.Column centered="true">
//                     <Segment>
//                         {loading ?
//                             <Placeholder style={{width: "100%", height: 200, maxWidth: "unset"}}>
//                                 <Placeholder.Image/>
//                             </Placeholder> :
//                             <Map
//                                 center={coordinate}
//                                 level={3}
//                                 draggable={true}
//                                 zoomable={true}
//                                 style={{width: "100%", height: "200px"}}
//                             >
//                                 <MapMarker position={coordinate}>
//                                     <div style={{color: "#000", textAlign: "center"}}>자늑 더 베이크</div>
//                                 </MapMarker>
//                             </Map>
//                         }
//
//                     </Segment>
//                     <Helper/>
//                 </Grid.Column>
//             </Grid.Row>
//         </Grid>
//     )
// }