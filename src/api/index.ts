import {authAPI} from "@/api/configAPI";
import {CreateAllianceType} from "@/types/alliance";
import {queryParse} from "@/util/converter";
import {QueryOptionType} from "@/types/queryString";
import {CouponConfirmType} from "@/types/coupon";
export {postLoginAPI} from "@/api/member/login";


/**** 제휴사 ****/
// 제휴사 아이디 중복체크
export const postEmailCheck = async (id :{admin_id: string}) => {
    const { data } = await authAPI.post('/shop/confirm', id);
    return data
}

// 학교 리스트
export const getSchoolsAPI = async (query:QueryOptionType) => {
    const {data} = await authAPI.get('/school?' + queryParse(query))
    return data
}

// 제휴사 생성
export const postCreateAllianceAPI = async (allianceData:CreateAllianceType) => {
    const {data} = await authAPI.post('/shop', allianceData);
    return data;
}

// 제휴사 리스트
export const getAllianceListAPI = async (query:QueryOptionType) => {
    const {data} = await authAPI.get('/shop?' + queryParse(query))
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

/**** 예약 ****/
// 예약 리스트
export const getReservationListAPI = async (query:QueryOptionType) => {
    const { data } = await authAPI.get('/purchase/services?' + queryParse(query))
    return data;
}
// 예약 리스트 상세(개별건)
export const getReservationAPI = async (id:string) => {
    const { data } = await authAPI.get('/purchase/service/' + id)
    return data;
}

/**** 쿠폰 ****/
// 쿠폰 리스트
export const getCouponListAPI = async (query:QueryOptionType) => {
    const { data } = await authAPI.get('/coupon/list/group?' + queryParse(query))
    return data;
}
// 쿠폰 그룹
export const getCouponGroupAPI = async (id:string) => {
    const { data } = await authAPI.get('/coupon/group/' + id)
    return data;
}
// 쿠폰 그룹의 목록 ( 몇건 발행, 개별 쿠폰들 )
export const getCouponGroupItemAPI = async (id:string, query:QueryOptionType) => {
    const { data } = await authAPI.get(`/coupon/list/${id}?${queryParse(query)}`);
    return data;
}
// 쿠폰 그룹 발급 승인
export const patchCouponConfirmAPI = async (form:CouponConfirmType) => {
    const { data } = await authAPI.patch('/coupon/confirm', form)
    return data;
}

