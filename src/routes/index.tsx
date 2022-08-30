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
    AllianceInfo
} from "@/pages";
import {memberState} from "@/app/member";
import {useRecoilValue} from "recoil";


export default function Router() {
    const member = useRecoilValue(memberState);
    return (
        <Routes>
            <Route path="/alliance/service/:id"
                   element={<AllianceService/>}
            />
            <Route path="/alliance/info/:id"
                   element={<AllianceInfo/>}
            />
            <Route path="/alliance"
                   element={<AllianceList/>}
            />
            <Route path="/product/:id"
                   element={<ProductDetail/>}
            />
            <Route path="/product/create"
                   element={member ? <ProductCreate/> : <Navigate to="/"/>}
            />
            <Route path="/products"
                   element={<ProductList/>}
            />

            <Route path="/login"
                   element={!member ? <Login/> : <Navigate to="/"/>}
            />

            <Route path="/test"
                   element={<MapSample/>}
            />
            <Route path="/"
                   element={<ProductList/>}
            />
            <Route path="*"
                   element={<ErrorPage/>}
            />
        </Routes>
    )
}