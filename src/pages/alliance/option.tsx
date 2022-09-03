import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import { getAllianceOptionAPI} from "@/api";
import {useNavigate, useParams} from "react-router";
import {Button, Card, Container, Image, Label, Loader, Table} from "semantic-ui-react";
import AllianceHeader from "@/components/alliance/header";
import * as React from "react";
import Template from "@/components/template";

export default function AllianceOption() {
    const navigate = useNavigate();
    const params = useParams();
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceOption(params.id as string),
        () => getAllianceOptionAPI(params.id as string),
        {staleTime: 60 * 1000}
    );
    const columns = [
        "옵션명",
        "추천여부",
        "추가금액",
        "게시여부",
        "수정",
        "삭제",
    ]

    console.log(data)


    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <AllianceHeader/>



                    <Card.Group doubling itemsPerRow={4} stackable style={{margin: "4rem 0"}}>
                            {!data.data.length?
                                    <h2>설정한 옵션이 없습니다.</h2>
                                : <>
                                {data.data?.map((row:any, i:number) =>
                                    <Card key={i}>
                                        <Card.Content>
                                            <Image src={row.image} style={{height: '160px', width:'100%', marginBottom:'1rem'}}/>
                                            <Card.Header>{row.name}</Card.Header>
                                            <Card.Description>{row.description}</Card.Description>
                                            <Card.Description>
                                                추가 금액 : {row.cost}원
                                            </Card.Description>
                                        </Card.Content>

                                        <Card.Content>
                                            <Button size="tiny" disabled={isLoading} positive>
                                                메뉴 관리
                                            </Button>
                                            <Button size="tiny" disabled={isLoading} primary>
                                                수정
                                            </Button>
                                            <Button size="tiny" disabled={isLoading}>삭제</Button>
                                        </Card.Content>
                                    </Card>
                                )}
                            </>}
                    </Card.Group>

                    <Button floated='right' primary size="small" onClick={() => navigate('/alliance')}>옵션추가</Button>
                    <Button floated='right' size="small" onClick={() => navigate('/alliance')}>목록으로</Button>
                </>}
            </Container>
        </Template>

    )
}