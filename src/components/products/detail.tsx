import {Button, Divider, Header, Image, Placeholder, Segment, Table} from "semantic-ui-react";
import {useNavigate, useParams} from "react-router";
import {getProductDetailAPI} from "@/api";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/types/queryKey";
import {useLayoutEffect} from "react";

export default function Detail() {
    const navigate = useNavigate();
    const {productById} = queryKeys;
    const params = useParams();
    const {isOpen, handleModal, message, handleMessage} = useModals();

    useEffect(() => {
        handleMessage({
            title:'예약하기',
            content: <Calender/>
        })
    }, [])


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
                    {data.header}
                    <Button as={Link} primary to="/product/create" floated='right'>Create</Button>
                </Header>
            }
            <Divider/>
            <Segment vertical>
                {!data ?
                    <Placeholder style={{maxWidth: 500, width:'100%', margin: '0 auto'}}>
                        <Placeholder.Image/>
                    </Placeholder> :
                    <Image src={data.image} style={{maxWidth: 500, width: '100%', margin: '0 auto'}}/>
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
                        {data.description}
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
                                <Table.Cell>작가</Table.Cell>
                                <Table.Cell>
                                    {data.authors}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={2}>기간</Table.Cell>
                                <Table.Cell>{data.openAt} ~ {data.closeAt}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>작품수</Table.Cell>
                                <Table.Cell>
                                    {data.itemCount}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>주최 / 후원</Table.Cell>
                                <Table.Cell>
                                    {data.sponsor}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>장소</Table.Cell>
                                <Table.Cell>
                                    {data.place}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>관람료</Table.Cell>
                                <Table.Cell>
                                    {data.price}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </>
            }
            <Button floated='right' positive onClick={() => handleModal(true)}>예약하기</Button>
            <Button floated='right' onClick={() => navigate(-1)}>목록으로</Button>
            <ConfirmPortal actionHandler={() => handleModal(false)} message={message} isOpen={isOpen} handler={() => handleModal(false)}/>
        </>
    );
}