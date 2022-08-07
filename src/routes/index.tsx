import {Routes, Route} from "react-router";
import {Navigate} from "react-router-dom";
import {ErrorPage} from "@/pages/error";
import MapSample from "@/pages/mapsample";
import {Login, ProductList, ProductDetail, ProductCreate} from "@/pages";
import {memberState} from "@/app/member";
import {useRecoilValue} from "recoil";


export default function Router(){
    const member = useRecoilValue(memberState);
    return (
        <Routes>
            <Route path="/product/:id"
                   element={<ProductDetail/>}
            />
            <Route path="/product/create"
                   element={!member ? <ProductCreate/> : <Navigate to="/"/>}
            />
            <Route path="/product"
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