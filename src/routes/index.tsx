import {Routes, Route} from "react-router";
import {ErrorPage} from "@/pages/error";
import {Login} from "@/pages/member";
import MapSample from "@/pages/mapsample";
import Helper from "@/pages/helper";

export default function Router(){
    return (
        <Routes>
            <Route path="/test" element={<MapSample/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Helper/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}