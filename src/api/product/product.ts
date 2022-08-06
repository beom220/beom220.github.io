import clientAPI from "@/api/configAPI";
import {useQuery} from "@tanstack/react-query";

const getProductsAPI = () => {
    return clientAPI.get('/product');
};

export const useGetProducts = () => useQuery(['products'], getProductsAPI)

