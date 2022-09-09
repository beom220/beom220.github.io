import {authAPI} from "@/api/configAPI";
import {CreateAllianceType} from "@/types/alliance";

export {postLoginAPI} from "@/api/member/login";
export {getProductsAPI, getProductDetailAPI} from "@/api/product/product"


// 제휴사 생성
// 제휴사 아이디 중복체크
export const postEmailCheck = async (id :{admin_id: string}) => {
    const { data } = await authAPI.post('/shop/confirm', id);
    return data
}

// 학교 리스트
export const getSchoolsAPI = async (query:object) => {
    const {data} = await authAPI.get('/school?' + Object.entries(query).map(v => v.join('=')).join('&'))
    return data;
}

// 제휴사 생성
export const postCreateAllianceAPI = async (allianceData:CreateAllianceType) => {
    const {data} = await authAPI.post('/shop', allianceData);
    return data;
}



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

/**
 * 제휴사 리스트 메뉴 삭제
 * @param id 메뉴 ObjectID
 */
export const deleteAllianceServiceAPI = async (id:string) => {
    const {data} = await authAPI.delete('service/' + id)
    return data;
}

// 제휴사 리스트 메뉴 태그 상세
export const getAllianceServiceMenuTagAPI = async (id:string) => {
    const {data} = await authAPI.get('shop/service/tag/' + id)
    return data;
}

/**
 * 제휴사 리스트 메뉴 태그 등록
 * @param form
 *  objectId: 제휴사 ObjectId
 *  category: string
 *
 */
export const postAllianceServiceMenuTagAPI = async (form:{objectId:string, category:string}) => {
    const {data} = await authAPI.post('shop/service/tag', form)
    return data;
}

// 제휴사 리스트 메뉴 태그 수정
export const patchAllianceServiceMenuTagAPI = async (
    form:{
        shopId:string,
        categoryList:string[],
        exCategory:string,
        changeCategory:string
    }) => {
    const {data} = await authAPI.patch('shop/service/tag', form)
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

// 제휴사 리스트 옵션 관리 목록
export const getAllianceOptionMangeAPI = async (id:string) => {
    const {data} = await authAPI.get('/designer/' + id)
    return data;
}