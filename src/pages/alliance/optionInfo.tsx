import {Button, Table, Card, Container, Form, Image, Label, Loader, Modal, Checkbox, Header} from "semantic-ui-react";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceOptionMangeAPI, getAllianceServiceAPI} from "@/api";
import styled from "@emotion/styled";
import * as React from "react";
import {useEffect, useState} from "react";
import {encodeMoney} from "@/util/converter";


export default function AllianceOptionInfo({objectId, filter, isOpen, handler}: any) {
    // 상품 서비스 목록 요청
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceService(objectId),
        () => getAllianceServiceAPI(objectId),
        {staleTime: 60 * 1000}
    );
    // 그룹 리스트
    const {data:manageData, isError:manageIsError, isLoading:manageIsLoading} = useQuery(
        testKeys.allianceOptionManage(filter),
        () => getAllianceOptionMangeAPI(filter),
        {staleTime: 60 * 1000}
    );
    const [service, setService] = useState<any>([]);

    useEffect(() => {
        if(manageData?.data.service){
            setService(manageData.data.service.map((v:any) => v.objectId))
        }
    },[manageData])


    return (
        <BlurModal
            dimmer="blurring"
            open={isOpen}
            onClose={handler}
            as={Form}
        >
            {data && manageData &&
                <>

                    <Modal.Header>
                        <Header
                            as="h3"
                            content={manageData.data.name + '관리'}
                            subheader={`추가금액 : ${encodeMoney(manageData.data.cost)}원`}
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Table compact celled unstackable>
                            <Table.Header>
                                <Table.Row textAlign="center">
                                    <Table.HeaderCell collapsing>등록</Table.HeaderCell>
                                    <Table.HeaderCell>추천</Table.HeaderCell>
                                    <Table.HeaderCell>상품명</Table.HeaderCell>
                                    <Table.HeaderCell>카테고리</Table.HeaderCell>
                                    <Table.HeaderCell>가격</Table.HeaderCell>
                                    <Table.HeaderCell>할인가</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                        {data.data.map((row: any, i: number) => (
                            <Table.Row key={i} textAlign="center">
                                <Table.Cell>
                                    <Checkbox
                                        onChange={() => {
                                            if(!service.includes(row.objectId)){
                                                setService([...service, row.objectId])
                                            } else {
                                                setService(service.filter((v:string) => v !== row.objectId))
                                            }
                                        }}
                                        checked={service?.length ? service.includes(row.objectId) : false}
                                    />
                                </Table.Cell>
                                <Table.Cell>{row.recommend ? '추천' : '-'}</Table.Cell>
                                <Table.Cell>{row.name}</Table.Cell>
                                <Table.Cell>{row.category}</Table.Cell>
                                <Table.Cell textAlign="right">{encodeMoney(row.cost)}원</Table.Cell>
                                <Table.Cell textAlign="right">{encodeMoney(row.finally_cost)}원</Table.Cell>
                            </Table.Row>
                        ))}
                            </Table.Body>
                        </Table>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button negative size="tiny" onClick={handler}>
                            취소
                        </Button>
                        <Button positive size="tiny" onClick={handler}>
                            확인
                        </Button>
                    </Modal.Actions>
                </>
            }
        </BlurModal>
    )
}

const BlurModal = styled(Modal)`
    width: 96%;
    max-width: 840px;
    left: 50%;
    top: 50%;
    position: fixed !important;
    zIndex: 1000;
    transform:translate(-50%,-50%);
`