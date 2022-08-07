import Template from "@/components/template";
import {Container, Header, Image, Segment} from "semantic-ui-react";
import {useParams} from "react-router";
import {getProductDetailAPI} from "@/api/product/product";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/types/queryKey";

export default function ProductDetail() {
    const {productById} = queryKeys;
    const params = useParams();

    const {data, isError} = useQuery(
        productById(String(params.id)),
        () => getProductDetailAPI(String(params.id)),
        {staleTime: 60 * 1000}
    );


    return (
        <Template>
            <Container>
                <Header as='h1'>
                    {data?.data.header}
                </Header>
                <Image src={data?.data.image} fluid bordered/>
                <Segment vertical>
                    <p style={{fontSize: '1.45rem', whiteSpace: 'pre-wrap'}}>
                        {data?.data.description}
                    </p>
                </Segment>
            </Container>
        </Template>
    )
}