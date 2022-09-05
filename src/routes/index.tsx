import {Routes, Route} from "react-router";
import {Navigate} from "react-router-dom";
import MapSample from "@/pages/mapsample";
import {
    Login,
    ErrorPage,
    ProductList,
    ProductDetail,
    ProductCreate,
    AllianceList,
    AllianceService,
    AllianceInfo, AllianceOption, AllianceEditService
} from "@/pages";
import {memberState} from "@/app/member";
import {useRecoilValue} from "recoil";

// element={member ? <ProductCreate/> : <Navigate to="/"/>}
export default function Router() {
    const member = useRecoilValue(memberState);
    return (
        <Routes>
            <Route path="/alliance/option/:id"
                   element={<AllianceOption/>}
            />
            <Route path="/alliance/service/edit/:id"
                   element={<AllianceEditService/>}
            />
            <Route path="/alliance/service/:id"
                   element={<AllianceService/>}
            />
            <Route path="/alliance/info/:id"
                   element={<AllianceInfo/>}
            />
            <Route path="/alliance"
                   element={<AllianceList/>}
            />

            <Route path="/login"
                   element={!member ? <Login/> : <Navigate to="/"/>}
            />
            <Route path="/"
                   element={!member ? <Login/> : <AllianceList/>}
            />
            <Route path="*"
                   element={<ErrorPage/>}
            />
        </Routes>
    )
}