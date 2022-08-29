import {Button, Card, Grid, Image, Menu,  Placeholder, Segment} from "semantic-ui-react";
import {useLocation, useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProductsAPI} from "@/api";
import {queryKeys} from "@/types/queryKey";
import {Link} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {memberState} from "@/app/member";
import {MouseEvent} from "react";
import {MenuItemProps} from "semantic-ui-react";

const categories = [
    "전체",
    "서울",
    "과천",
    "덕수궁",
    "청주",
    "어린이미술관",
] as const;

interface Product {
    id: string;
    image: string;
    header: string;
    description: string;
    meta: string;
}

export default function List() {
    const location = useLocation();
    const queryData = location.search;
    const params = new URLSearchParams(queryData).get('cate');
    const member = useRecoilValue(memberState);
    const [activeTab, setActiveTab] = useState<string | null | undefined>(categories[0]);

    const handleActiveClick = (e: MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => {
        setActiveTab(data.name);
        navigate('/products?cate=' + data.name)
    }

    useEffect(() => {
        if (!!params) {
            return setActiveTab(params);
        }
        if (!params) {
            return setActiveTab(categories[0]);
        }
    }, [params])


    const {data, isError} = useQuery(queryKeys.productsByCate(String(activeTab)),
        () => getProductsAPI(String(activeTab)),
        {staleTime: 60 * 1000}
    );

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
    const placeholder = new Array(15).fill(0).map((v, i) => (<Dummy key={i}/>));
    const content = !data?.length ?
        (<Grid.Column>
            <Segment style={{padding: '6rem 1rem', textAlign: 'center'}}><h2>현재 진행하고 있는 전시가 없습니다.</h2>
            </Segment>
        </Grid.Column>) :
        data.map((v: Product, i: number) => (<ProductItem data={v} key={i}/>))

    return (
        <div>
            <h1>
                전시
                {member && <Button as={Link} primary to="/product/create" floated='right'>create</Button>}
            </h1>

            <Menu>
                {categories.map((value, index) => (
                    <Menu.Item
                        key={index}
                        name={value}
                        active={activeTab === value}
                        onClick={handleActiveClick}
                    />
                ))}
            </Menu>
            <Grid padded={true} columns={1}>
                {!data ? placeholder : content}
            </Grid>
        </div>
    );
}

function ProductItem({data}: any) {
    const {image, header, id, category, openAt, closeAt} = data;
    const forwardLink = '/product/' + id;
    return (
        <>
            <Grid.Column mobile={16} tablet={8} computer={5} style={CardWrap}>
                <Card style={CardStyle} as={Link} to={forwardLink}>
                    <Image src={image} loading={"true"} wrapped />
                    <Card.Content>
                        <Card.Meta>
                            {category}
                        </Card.Meta>
                        <Card.Header
                            style={{
                                width: '100%',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                wordBreak: 'break-word',

                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                            }}>
                            {header}
                        </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        {openAt} ~ {closeAt}
                    </Card.Content>
                </Card>
            </Grid.Column>
        </>
    )
}

function Dummy() {
    return (
        <Grid.Column mobile={16} tablet={8} computer={5} style={CardWrap}>
            <Card style={CardStyle}>
                <Placeholder style={{width: "100%", height: 320, maxWidth: 'unset'}}>
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