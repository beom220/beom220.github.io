import {useMutation, useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceServiceAPI, getAllianceServiceMenuTagAPI, postAllianceServiceMenuTagAPI,} from "@/api";
import {useNavigate, useParams} from "react-router";
import {Button, Container, Image, Label, Loader, Card, SemanticCOLORS, Message, Input} from "semantic-ui-react";
import AllianceHeader from "@/components/alliance/header";
import Template from "@/components/template";
import useModals from "@/hooks/useModals";
import {useEffect, useState} from "react";
import {AllianceEditService} from "@/pages";
import {ConfirmPortal, MessagePortal} from "@/components/common";

const color = [
    'grey',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'red',
    'black',
] as SemanticCOLORS[]

export default function AllianceService() {
    const navigate = useNavigate();
    const params = useParams();

    // 업데이트 메세지
    const [fadeMessageIsOpen, setFadeMessageIsOpen] = useState<boolean>(false);
    const [fadeMessage, setFadeMessage] = useState<string>('');

    // 카테고리 태그
    const [tag, setTag] = useState<string[]>([]);
    const [ tagForm, setTagForm ] = useState({
        objectId : params.id as string,
        category : ''
    })
    const {isOpen: addTagIsOpen, handleModal:handleAddTagModal, message:addTagMessage, handleMessage:handleAddTagMessage} = useModals();

    // 상품 서비스 수정
    const [editService, setEditService] = useState<string>('');
    const {isOpen: editServiceIsOpen, handleModal:handleEditServiceModal} = useModals();
    const handleEditService = (value: string) => {
        setEditService(value)
        handleEditServiceModal(true)
    }

    // 상품 서비스 목록 요청
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceService(params.id as string),
        () => getAllianceServiceAPI(params.id as string),
        {staleTime: 60 * 1000}
    );

    // 카테고리 태그 요청
    const {data: tagData, isLoading: tagIsLoading, refetch:tagRefetch} = useQuery(
        testKeys.allianceServiceTag(params.id as string),
        () => getAllianceServiceMenuTagAPI(params.id as string),
        {staleTime: 60 * 1000}
    );

    // 카테고리 태그 업데이트
    const {mutate, isLoading: updateTagIsLoading } = useMutation(postAllianceServiceMenuTagAPI);
    const onSubmitTag = (form:{objectId:string, category:string}):void => {
        handleAddTagModal(false)
        mutate(form, {
            onSuccess: () => {
                setFadeMessage('카테고리가 추가되었습니다.');
                setFadeMessageIsOpen(true);
                return tagRefetch();
            },
            onError: () => {
                setFadeMessage('작업에 실패하였습니다.');
                setFadeMessageIsOpen(true);
            }
        })
    }

    // 업데이트 메시지 감지
    useEffect(() => {
        if (fadeMessageIsOpen) {
            setTimeout(() => {
                setFadeMessageIsOpen(false)
            }, 2000)
        }
    }, [fadeMessageIsOpen])

    // 카테고리 태그 요청 이후 설정
    useEffect(() => {
        if (!tag.length && tagData) {
            setTag(() => tagData.map((v: string, i: number) => {
                return {key: i, text: v, value: v}
            }))
        }
    }, [tagData])

    // 카테고리 태그 모달 설정
    useEffect(() => {
        handleAddTagMessage({
            title:'카테고리 등록',
            content: <Input
                name="category"
                onChange={(event, data) => setTagForm({...tagForm, category: data.value})}
                fluid
                placeholder="카테고리명을 입력해주세요"
            />
        })
    },[addTagIsOpen])

    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <AllianceHeader/>
                    <Message info style={{marginTop: "2rem"}}>
                        카테고리를 등록하면 보다 편리하게 상품관리를 하실 수 있습니다.
                    </Message>
                    <div style={{
                        marginTop: "1rem",
                        display: "flex",
                        gap: ".625rem",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}>
                        <Button positive size="medium" type="button" onClick={() => handleAddTagModal(true)}>카테고리 추가하기</Button>
                        {tagData ?
                            tagData.map((v: string, i: number) => (
                                <Label key={i} tag color={color[i]}>{v}</Label>
                            )) : null
                        }
                    </div>
                    <Card.Group doubling itemsPerRow={3} stackable style={{margin: "2rem 0 4rem"}}>
                        {data.data.map((row: any, i: number) => (
                            <Card key={i}>
                                <Card.Content>
                                    <div style={{textAlign:"center"}}>
                                    <Image src={row.image}
                                           style={{maxHeight: '160px', maxWidth: '100%', marginBottom: '1rem'}}/>
                                    </div>
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

                <Loader
                    active={editServiceIsOpen || updateTagIsLoading || addTagIsOpen}
                    size="massive"
                    inline='centered'
                    style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}
                />

                {addTagIsOpen &&
                    <ConfirmPortal
                        actionHandler={() => onSubmitTag(tagForm)}
                        message={addTagMessage}
                        isOpen={addTagIsOpen}
                        handler={() => handleAddTagModal(false)}/>
                }

                {editServiceIsOpen &&
                    <AllianceEditService
                        objectId={editService}
                        isOpen={editServiceIsOpen}
                        handler={() => handleEditServiceModal(false)}
                        tags={tag}
                    />
                }
                <MessagePortal isOpen={fadeMessageIsOpen}>
                    <p>{fadeMessage}</p>
                </MessagePortal>
            </Container>
        </Template>

    )
}