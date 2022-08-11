import {Button, Card, Divider, Grid, Icon, Image, Menu, Pagination, Placeholder, Segment} from "semantic-ui-react";
import {useLocation, useNavigate, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProductsAPI} from "@/api";
import {queryKeys} from "@/types/queryKey";
import {Link} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {memberState} from "@/app/member";
import * as React from "react";
import {MenuItemProps} from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import QueryString from "qs";
import {PaginationProps} from "semantic-ui-react/dist/commonjs/addons/Pagination/Pagination";

const categories = [
    "전체",
    "서울",
    "과천",
    "덕수궁",
    "청주",
    "어린이미술관",
]

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
    const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
    const [activePage, setActivePage] = useState<string | number | undefined>(1)
    const handleActiveClick = (e: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => {
        setActiveTab(data.name);
        navigate('/product?cate=' + data.name)
    }

    useEffect(() => {
        if (!activeTab && !!params) {
            return setActiveTab(params);
        }
        if (!activeTab) {
            return setActiveTab(categories[0]);
        }
        setActiveTab(params || categories[0]);
    }, [queryData, activeTab])


    const {data, isError, isSuccess, error} = useQuery(queryKeys.productsByCate(String(activeTab)),
        (v) => getProductsAPI(String(activeTab)),
        {staleTime: 60 * 1000}
    );

    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setActivePage(data.activePage)
    }

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
    const content = data?.data.length ?
        data.data.map((v: Product, i: number) => (<ProductItem data={v} key={i}/>)) :
        (<Grid.Column>
            <Segment style={{padding: '6rem 1rem', textAlign: 'center'}}><h2>데이터가 없습니다.</h2>
            </Segment>
        </Grid.Column>);

    return (
        <div>
            <h1>Product
                {member && <Button as={Link} primary to="/product/create" floated='right'>Create</Button>}
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
            <div style={{textAlign: "center", marginTop:"4rem"}}>
                <Pagination
                    totalPages={50}
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                    firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                    lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                    prevItem={{content: <Icon name='angle left'/>, icon: true}}
                    nextItem={{content: <Icon name='angle right'/>, icon: true}}
                />
            </div>
        </div>
    );
}

function ProductItem({data}: any) {
    const {image, header, description, meta, id, category, create} = data;
    const forwardLink = '/product/' + id;
    return (
        <>
            <Grid.Column mobile={16} tablet={8} computer={5} style={CardWrap}>
                <Card style={CardStyle} as={Link} to={forwardLink}>
                    <Image src={image} loading={"true"} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>
                            <Card.Meta style={{fontWeight: '600', color: 'black'}}>{category}</Card.Meta>
                            {header}
                        </Card.Header>
                        <Card.Description>
                            <p style={{
                                width: '100%',
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
                    <Card.Content extra>
                        {create}
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