import {Button, Divider, Header, Image, Placeholder, Segment} from "semantic-ui-react";
import {useParams} from "react-router";
import {getProductDetailAPI} from "@/api/product/product";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/types/queryKey";
import {Link} from "react-router-dom";
import {useLayoutEffect} from "react";

export default function Detail() {
    const {productById} = queryKeys;
    const params = useParams();

    const {data, isError} = useQuery(
        productById(String(params.id)),
        () => getProductDetailAPI(String(params.id)),
        {staleTime: 60 * 1000}
    );

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [params])

    return (
        <>
            {!data ?
                <Placeholder>
                    <Placeholder.Line/>
                </Placeholder> :
                <Header as='h1'>
                    {data.data.header}
                    <Button as={Link} primary to="/product/create" floated='right'>Create</Button>
                </Header>
            }
            <Divider/>
            <Segment vertical>
                {!data ?
                    <Placeholder style={{width: "100%", height: 400, maxWidth: 'unset'}}>
                        <Placeholder.Image/>
                    </Placeholder>  :
                    <Image src={data.data.image} fluid bordered/>
                }
                <Divider hidden/>
                {!data ?
                    <Placeholder fluid>
                        <Placeholder.Paragraph/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Paragraph/>
                        <Placeholder.Line/>
                        <Placeholder.Paragraph/>
                        <Placeholder.Line/>
                    </Placeholder> :
                    <p style={{fontSize: '1.25rem', whiteSpace: 'pre-wrap'}}>
                        {data?.data.description}
                    </p>
                }
            </Segment>
            <Divider hidden/>
            <Button as={Link} basic to="/product" floated='right'>Go List</Button>
        </>
    )
}