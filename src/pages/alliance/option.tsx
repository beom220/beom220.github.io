import {useQuery} from "@tanstack/react-query";
import {allianceKey} from "@/types/queryKey";
import { getAllianceOptionAPI} from "@/api";
import {useNavigate, useParams} from "react-router";
import {Button, Card, Container, Image, Label, Loader, Message, Table} from "semantic-ui-react";
import AllianceHeader from "@/components/alliance/header";
import * as React from "react";
import Template from "@/components/template";
import {useState} from "react";
import useModals from "@/hooks/useModals";
import AllianceOptionInfo from "@/pages/alliance/optionInfo";
import {encodeNumber} from "@/util/converter";
import AllianceOptionEdit from "@/pages/alliance/optionEdit";

export default function AllianceOption() {
    const navigate = useNavigate();
    const params = useParams();
    const {data, isError, isLoading} = useQuery(
        allianceKey.allianceOption(params.id as string),
        () => getAllianceOptionAPI(params.id as string),
        {staleTime: 60 * 1000}
    );

    // 옵션 메뉴 관리
    const [editService, setEditService] = useState<string>('');
    const {isOpen, handleModal} = useModals();

    // 옵션 수정
    const [editOption, setEditOption] = useState<string>('');
    const {isOpen:isEditOpen, handleModal:handleEditModal} = useModals();
    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <AllianceHeader/>
                    <Message info style={{marginTop: "2rem"}}>
                        옵션으로 메뉴를 추가구성하실 수 있습니다.
                    </Message>
                    <Card.Group doubling itemsPerRow={3} stackable style={{margin: "2rem 0 4rem"}}>
                            {!data.data?.length?
                                    <h2>설정한 옵션이 없습니다.</h2>
                                : <>
                                {data.data?.map((row:any, i:number) =>
                                    <Card key={i}>
                                        <Card.Content>
                                            <Image src={row.image} style={{height: '160px', width:'100%', marginBottom:'1rem'}}/>
                                            <Card.Header>{row.name}</Card.Header>
                                            <Card.Description>{row.description}</Card.Description>
                                            <Card.Description>
                                                추가 금액 : {encodeNumber(row.cost)}원
                                            </Card.Description>
                                        </Card.Content>

                                        <Card.Content>
                                            <Button size="tiny" disabled={isLoading} positive type="button" onClick={() => {
                                                setEditService(row.objectId)
                                                handleModal(true)
                                            }}>
                                                메뉴 관리
                                            </Button>
                                            <Button size="tiny" disabled={isLoading} primary type="button" onClick={() => {
                                                setEditOption(row.objectId)
                                                handleEditModal(true)
                                            }}>
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
                {isEditOpen && <AllianceOptionEdit objectId={editOption} isOpen={isEditOpen} handler={() => handleEditModal(false)}/>}
            </Container>
        </Template>

    )
}