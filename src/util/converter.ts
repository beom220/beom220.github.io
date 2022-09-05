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