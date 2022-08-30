import clientAPI from "@/api/configAPI";

export {postLoginAPI} from "@/api/member/login";
export {getProductsAPI, getProductDetailAPI} from "@/api/product/product"


export const getAllianceListAPI = async (query:object) => {
    const {data} = await clientAPI.get('/alliance?' + Object.entries(query).map(v => v.join('=')).join('&'))
    return data;
}

export const getAllianceInfoAPI = async (id:string) => {
    const {data} = await clientAPI.get('/alliance/info/' + id)
    return data;
}

export const getAllianceServiceAPI = async (id:string) => {
    const {data} = await clientAPI.get('/alliance/service/' + id)
    return data;
}