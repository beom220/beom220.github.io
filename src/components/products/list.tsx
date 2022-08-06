import {Card, Divider, Grid, Image, Placeholder} from "semantic-ui-react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {useGetProducts} from "@/api/product/product";
import {useEffect} from "react";


interface Product {
    image: string;
    header: string;
    description: string;
    meta: string;
}

export default function ProductList() {
    const {data, isLoading, isError} = useGetProducts();
    const navigate = useNavigate();
    useEffect(() => {
        console.log('isLoading ::::', isLoading)
        console.log('isError ::::', isError)
    }, [isLoading, isError])

    if (isError) {
        navigate('/error')
    }

    if (data) {
        return (
            <div>
                <h1>Product</h1>
                <Grid>
                    {data.data.map((v: Product, i: number) => (<Product data={v} key={i}/>))}
                </Grid>
            </div>
        )
    }

    return (
        <div>
            <h1>Product</h1>
            <Grid>
                {new Array(15).fill(0).map((v, i) => (
                    <Grid.Column mobile={16} tablet={8} computer={4} style={CardWrap}>
                        <Card style={CardStyle}>
                            <Placeholder style={{width: "100%", height: 220, maxWidth: 'unset'}}>
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
                ))}
            </Grid>


            {/*<Card.Group itemsPerRow={4}>*/}
            {/*    {new Array(15).fill(0).map((v, i) => (*/}
            {/*        <Card key={i}>*/}
            {/*            <Placeholder style={{width: "100%", height: 220,}}>*/}
            {/*                <Placeholder.Image square/>*/}
            {/*            </Placeholder>*/}
            {/*            <Card.Content>*/}
            {/*                <Placeholder>*/}
            {/*                    <Placeholder.Paragraph/>*/}
            {/*                    <Placeholder.Line/>*/}
            {/*                    <Placeholder.Paragraph/>*/}
            {/*                    <Placeholder.Line/>*/}
            {/*                </Placeholder>*/}
            {/*            </Card.Content>*/}
            {/*        </Card>*/}
            {/*    ))}*/}
            {/*</Card.Group>*/}
        </div>
    );
}

export function Product({data}: any){
    const {image, header, description, meta} = data;
    return (
        <Grid.Column mobile={16} tablet={8} computer={4} style={CardWrap}>
            <Card style={CardStyle}>
                <Image src={image} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{header}</Card.Header>
                    <Card.Meta>{meta}</Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

const CardWrap = {display: 'flex'}
const CardStyle = {width: '100%', maxWidth:'450px', margin:'0 auto'}