import {authAPI} from "@/api/configAPI";

export {postLoginAPI} from "@/api/member/login";
export {getProductsAPI, getProductDetailAPI} from "@/api/product/product"

// 제휴사 리스트
export const getAllianceListAPI = async (query:object) => {
    const {data} = await authAPI.get('/shop?' + Object.entries(query).map(v => v.join('=')).join('&'))
    return data;
}

// 제휴사 리스트 상세
export const getAllianceInfoAPI = async (id:string) => {
    const {data} = await authAPI.get('/shop/' + id)
    return data;
}

// 제휴사 리스트 메뉴
export const getAllianceServiceAPI = async (id:string) => {
    const {data} = await authAPI.get('service/shop/' + id)
    return data;
}

// 제휴사 리스트 메뉴 상세
export const getAllianceServiceMenuAPI = async (id:string) => {
    const {data} = await authAPI.get('service/' + id)
    return data;
}

// 제휴사 리스트 옵션 목록
export const getAllianceOptionAPI = async (id:string) => {
    const {data} = await authAPI.get('/designer/lists/' + id)
    return data;
}