import {Button, Card, Divider, Grid, Header, Image, Placeholder} from "semantic-ui-react";
import {useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProductsAPI} from "@/api/product/product";
import {queryKeys} from "@/types/queryKey";
import {Link} from "react-router-dom";
import {useLayoutEffect} from "react";

interface Product {
    id: string;
    image: string;
    header: string;
    description: string;
    meta: string;
}

export default function List() {
    const {data, isError} = useQuery(queryKeys.products, getProductsAPI, { staleTime: 60 * 1000 });
    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [])

    if (isError) {
        navigate('/error')
    }

    // loading
    const placeholder = new Array(15).fill(0).map((v, i) => (<Dummy key={i}/>))

    const content = data ? data.data.map((v: Product, i: number) => (<Product data={v} key={i}/>)) : null;

    return (
        <div>
            <h1>Product</h1>
            <Divider/>
            <Grid centered={true} padded={true}>
                {!data ? placeholder : content}
            </Grid>
        </div>
    );
}

function Product({data}: any) {
    const {image, header, description, meta, id} = data;
    const forwardLink = '/product/' + id;
    return (
        <Grid.Column mobile={16} tablet={8} computer={5} style={CardWrap}>
            <Card style={CardStyle} as={Link} to={forwardLink}>
                <Image src={image} loading={"true"} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{header}</Card.Header>
                    <Card.Meta>{meta}</Card.Meta>
                    <Card.Description>
                        <p style={{
                            width:'100%',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            wordBreak: 'break-word',

                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}>
                            {description}
                        </p>


                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

function Dummy(){
    return(
        <Grid.Column mobile={16} tablet={8} computer={5} style={CardWrap}>
            <Card style={CardStyle}>
                <Placeholder style={{width: "100%", height: 188, maxWidth: 'unset'}}>
                    <Placeholder.Image/>
                </Placeholder>
                <Card.Content>
                    <Placeholder>
                        <Placeholder.Paragraph/>
                        <Placeholder.Line/>
                        <Placeholder.Paragraph/>
                        <Placeholder.Line/>
                    </Placeholder>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

const CardWrap = {display: 'flex'}
const CardStyle = {width: '100%', maxWidth: '450px', margin: '0 auto'}