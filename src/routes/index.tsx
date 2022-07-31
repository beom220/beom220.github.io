import {Routes, Route} from "react-router";
import {ErrorPage} from "@/pages/error";
import {Login} from "@/pages/member";

export default function Router(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}