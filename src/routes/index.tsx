import {Routes, Route} from "react-router";
import {Navigate} from "react-router-dom";
import MapSample from "@/pages/mapsample";
import {ErrorPage, } from "@/pages";
import {memberState} from "@/app/member";
import {useRecoilValue} from "recoil";
import Test from "@/pages/test";


export default function Router() {
    const member = useRecoilValue(memberState);
    return (
        <Routes>

            <Route path="/test"
                   element={<Test/>}
            />
            <Route path="/"
                   element={<MapSample/>}
            />
            <Route path="*"
                   element={<ErrorPage/>}
            />
        </Routes>
    )
}