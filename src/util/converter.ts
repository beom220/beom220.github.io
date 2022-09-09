type Money = string | number;

/**
 * 숫자에 콤마 찍기
 * @param value
 */
export function encodeMoney(value:Money){
    const pattern = /\B(?=(\d{3})+(?!\d))/g
    return String(value).replace(pattern, ",");
}

/**
 * 콤마 제거
 * @param value
 */
export function decodeMoney(value:Money){
    const pattern = /,/g;
    return Number(String(value).replace(pattern, ""));
}

export const dateConverter = (date:Date) => {
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

    const yearMonthDate = yy + '년 ' + mm + '월 ' + dd + '일 ';
    const hourAndTime = hh + '시 ' + min + '분';
    const fullDateMonth = yearMonthDate + hourAndTime;
    return { fullDateMonth, yearMonthDate, hourAndTime, yy, mm, dd, hh, min };
};