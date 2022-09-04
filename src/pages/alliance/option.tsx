import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import { getAllianceOptionAPI} from "@/api";
import {useNavigate, useParams} from "react-router";
import {Button, Card, Container, Image, Label, Loader, Table} from "semantic-ui-react";
import AllianceHeader from "@/components/alliance/header";
import * as React from "react";
import Template from "@/components/template";
import {useState} from "react";
import useModals from "@/hooks/useModals";
import AllianceOptionInfo from "@/pages/alliance/optionInfo";

export default function AllianceOption() {
    const navigate = useNavigate();
    const params = useParams();
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceOption(params.id as string),
        () => getAllianceOptionAPI(params.id as string),
        {staleTime: 60 * 1000}
    );

    // 옵션 메뉴 관리
    const [editService, setEditService] = useState<string>('');
    const {isOpen, handleModal} = useModals();

    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <AllianceHeader/>
                    <Card.Group doubling itemsPerRow={3} stackable style={{margin: "4rem 0"}}>
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
                                            <Button size="tiny" disabled={isLoading} positive type="button" onClick={() => {
                                                setEditService(row.objectId)
                                                handleModal(true)
                                            }}>
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
                {isOpen && <AllianceOptionInfo objectId={params.id} filter={editService} isOpen={isOpen} handler={() => handleModal(false)}/>}
            </Container>
        </Template>

    )
}