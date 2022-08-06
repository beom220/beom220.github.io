import {Routes, Route} from "react-router";
import {Navigate} from "react-router-dom";
import {ErrorPage} from "@/pages/error";
import MapSample from "@/pages/mapsample";
import Helper from "@/pages/helper";
import Login from "@/pages/member/login";
import {memberState} from "@/app/member";
import {useRecoilValue} from "recoil";

export default function Router(){
    const member = useRecoilValue(memberState);
    return (
        <Routes>
            <Route path="/login"
                   element={!member ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/test" element={<MapSample/>}/>

            <Route path="/" element={<Helper/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}