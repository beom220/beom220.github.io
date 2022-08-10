import clientAPI from "@/api/configAPI";

export const getProductsAPI = () => {
    return clientAPI.get('/products');
};

export const getProductDetailAPI = (id:string) => {
    return clientAPI.get('/product/' + id)
}
