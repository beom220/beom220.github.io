import {QueryOptionType} from "@/types/queryString";

type Money = string | number;

/**
 * 숫자에 콤마 찍기
 * @param value:Money
 */
export function encodeNumber(value:Money){
    const pattern = /\B(?=(\d{3})+(?!\d))/g;
    return String(value).replace(pattern, ",");
}

/**
 * 콤마 제거
 * @param value
 */
export function decodeNumber(value:Money){
    const pattern = /,/g;
    return Number(String(value).replace(pattern, ""));
}

/**
 * 연락처에 포맷 [xx,xxx]-[xxx,xxxx]-[xxxx]
 * @param value
 */
export function encodeCall(value:string){
    return value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/**
 * 날짜 한글로 변환
 * @param date:Date
 */
export function dateConverter(date:Date){
    const _date = new Date(date);
    const yy = _date.getFullYear().toString();

    const mm = _date.getMonth() + 1 < 10 ?
        '0' + (_date.getMonth() + 1) :
        (_date.getMonth() + 1).toString();

    const dd = _date.getDate() < 10 ?
        '0' + _date.getDate() :
        _date.getDate().toString();

    const hh = _date.getHours() < 10 ?
        '0' + _date.getHours() :
        _date.getHours().toString();

    const min = _date.getMinutes() < 10 ?
        '0' + _date.getMinutes() :
        _date.getMinutes().toString();

    const yearMonthDate = yy + '/' + mm + '/' + dd;
    const hourAndTime = hh + ':' + min;
    const fullDateMonth = yearMonthDate + " T " + hourAndTime;

    return { fullDateMonth, yearMonthDate, hourAndTime, yy, mm, dd, hh, min }
}

/**
 * queryOption 문자열로 변환
 * @param query
 */
export function queryParse(query:QueryOptionType){
    return Object.entries(query).map(v => v.join('=')).join('&')
}