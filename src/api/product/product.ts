import clientAPI from "@/api/configAPI";

export const getProductsAPI = (queryString:string) => {
    return clientAPI.get('/products?category=' + queryString);
};

export const getProductDetailAPI = (id:string) => {
    return clientAPI.get('/product/' + id)
}
