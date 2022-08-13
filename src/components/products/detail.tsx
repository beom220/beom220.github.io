import {Button, Divider, Header, Image, Placeholder, Segment, Table} from "semantic-ui-react";
import {useNavigate, useParams} from "react-router";
import {getProductDetailAPI} from "@/api";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/types/queryKey";
import {Link} from "react-router-dom";
import {useLayoutEffect} from "react";

export default function Detail() {
    const navigate = useNavigate();
    const {productById} = queryKeys;
    const params = useParams();

    const {data, isError} = useQuery(
        productById(String(params.id)),
        () => getProductDetailAPI(String(params.id)),
        {staleTime: 60 * 1000}
    );

    if(isError){
        navigate('/error')
    }

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
                </Header>
            }
            <Divider/>
            <Segment vertical>
                {!data ?
                    <Placeholder style={{maxWidth: 500, width:'100%', margin: '0 auto'}}>
                        <Placeholder.Image/>
                    </Placeholder> :
                    <Image src={data.data.image} style={{maxWidth: 500, width: '100%', margin: '0 auto'}}/>
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
                        {data.data.description}
                    </p>
                }
            </Segment>
            <Divider hidden/>

            {!data ?
                null :
                <>
                    <Table definition>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>기간</Table.Cell>
                                <Table.Cell>{data.data.openAt} ~ {data.data.closeAt}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>주최 / 후원</Table.Cell>
                                <Table.Cell>
                                    국립현대미술관/ (협력) ArkDes, Sharjah Art Foundation/(후원) 테라로사
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>장소</Table.Cell>
                                <Table.Cell>
                                    서울 지하1층, 6전시실, 온라인 플랫폼
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>관람료</Table.Cell>
                                <Table.Cell>
                                    서울관통합권 4,000원
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>작가</Table.Cell>
                                <Table.Cell>
                                    김실비, 김아영, 염지혜, 김웅현, 안정주&전소정, 바래, 안드레아스 바너슈테트, 제나 수텔라, 왕 & 쇠데르스트룀, 바스마 알 샤리프, 샤리프 와키드, 유리 패티슨, 시몬 C. 니키유, ASMR티카, 알리 체리, 마하 마아문, 아마드 고세인
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>작품수</Table.Cell>
                                <Table.Cell>
                                    20여점
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </>
            }


            <Button basic floated='right' onClick={() => navigate(-1)}>Go List</Button>
        </>
    );
}