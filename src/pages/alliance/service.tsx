import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceServiceAPI} from "@/api";
import {useNavigate, useParams} from "react-router";
import {Button, Container, Label, Loader, Table} from "semantic-ui-react";
import AllianceHeader from "@/components/alliance/header";
import * as React from "react";
import Template from "@/components/template";

export default function AllianceService() {
    const navigate = useNavigate();
    const params = useParams();
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceService(params.id as string),
        () => getAllianceServiceAPI(params.id as string),
        {staleTime: 60 * 1000}
    );
    const columns = [
        "상품명",
        "추천여부",
        "세부 카테고리",
        "판매가",
        "할인가",
        "게시여부",
        "수정",
        "삭제",
    ]


    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <AllianceHeader/>
                    <Table compact celled size='small' style={{margin: "4rem 0"}}>
                        <Table.Header>
                            <Table.Row style={{textAlign: "center"}}>
                                {columns.map((v, i) =>
                                    <Table.HeaderCell key={i}>{v}</Table.HeaderCell>
                                )}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {!data.length?
                            <Table.Row textAlign="center">
                                <Table.Cell colSpan='4' style={{padding: "80px 0"}}>
                                    <h2>자료가 없습니다.</h2>
                                </Table.Cell>
                            </Table.Row> : <>
                                {data?.map((row:any, i:number) =>
                                    <Table.Row key={i}>
                                        <Table.Cell width={3}>{row.name}</Table.Cell>
                                        <Table.Cell width={1} style={{textAlign: "center"}}>
                                            {row.recommend ?
                                                <Label color="yellow" tag>추천</Label> :
                                                '-'
                                            }
                                        </Table.Cell>
                                        <Table.Cell width={1} style={{textAlign: "center"}}>{row.category}</Table.Cell>
                                        <Table.Cell width={1} style={{textAlign:"right"}}>
                                            {row.cost}
                                        </Table.Cell>
                                        <Table.Cell width={1} style={{textAlign:"right"}}>
                                            {row.finally_cost}
                                        </Table.Cell>
                                        <Table.Cell width={1} style={{textAlign: "center"}}>
                                            {row.status ?
                                                <Label color="blue">게시</Label> :
                                                <Label color="orange">대기</Label>
                                            }
                                        </Table.Cell>
                                        <Table.Cell width={1} style={{textAlign: "center"}}>
                                            <Label basic color="teal">수정</Label>
                                        </Table.Cell>
                                        <Table.Cell width={1} style={{textAlign: "center"}}>
                                            <Label basic color="orange">삭제</Label>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </>}
                        </Table.Body>
                    </Table>
                    <Button floated='right' size="small" onClick={() => navigate('/alliance')}>목록으로</Button>
                </>}
            </Container>
        </Template>

    )
}