import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceServiceAPI, getAllianceServiceMenuAPI} from "@/api";
import {useNavigate, useParams} from "react-router";
import {Button, Container, Image, Label, Loader, Table, Card, Placeholder, Form, Radio} from "semantic-ui-react";
import AllianceHeader from "@/components/alliance/header";
import Template from "@/components/template";
import useModals from "@/hooks/useModals";
import {ConfirmPortal} from "@/components/common";
import {ReactNode, useEffect, useState} from "react";
import {AllianceEditService} from "@/pages";

export default function AllianceService() {
    const navigate = useNavigate();
    const params = useParams();
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceService(params.id as string),
        () => getAllianceServiceAPI(params.id as string),
        {staleTime: 60 * 1000}
    );

    const [editService, setEditService] = useState<string>('');
    const {isOpen, handleModal } = useModals();
    const handleEditService = (value:string) => {
        setEditService(value)
        handleModal(true)
    }


    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <AllianceHeader/>
                    <Card.Group doubling itemsPerRow={4} stackable style={{margin: "4rem 0"}}>
                        {data.data.map((row: any, i: number) => (
                            <Card key={i}>
                                <Card.Content>
                                    <Image src={row.image}
                                           style={{height: '160px', width: '100%', marginBottom: '1rem'}}/>
                                    <Card.Header>{row.name}</Card.Header>
                                    <Card.Meta>
                                        {row.status ?
                                            <><Label circular color="green" size="tiny" empty/> 게시</> :
                                            <><Label circular color="orange" size="tiny" empty/> 대기</>
                                        }
                                    </Card.Meta>
                                    <Card.Description>{row.desc}</Card.Description>
                                    <Card.Description>
                                        <span style={{
                                            textDecoration: "line-through",
                                            color: "#ccc",
                                            paddingRight: '4px'
                                        }}>{row.cost}원</span>
                                        {row.finally_cost}원
                                    </Card.Description>
                                </Card.Content>

                                <Card.Content>
                                    <Button size="tiny" disabled={isLoading} primary type="button"
                                            onClick={() => handleEditService(row.objectId)}>
                                        수정
                                    </Button>
                                    <Button size="tiny" disabled={isLoading}>삭제</Button>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>

                    <Button floated='right' primary size="small" onClick={() => navigate('/alliance')}>메뉴추가</Button>
                    <Button floated='right' size="small" onClick={() => navigate('/alliance')}>목록으로</Button>
                </>}
                {isOpen && <AllianceEditService objectId={editService} isOpen={isOpen} handler={() => handleModal(false)}/>}

            </Container>
        </Template>

    )
}