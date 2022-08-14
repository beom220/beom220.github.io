import clientAPI from "@/api/configAPI";

export const getProductsAPI = async (queryString:string) => {
    const { data } = await clientAPI.get('/products?category=' + queryString);
    return data;
};

export const getProductDetailAPI = async (id:string) => {
    const { data } = await clientAPI.get('/product/' + id)
    return data;
}
