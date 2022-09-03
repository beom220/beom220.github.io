import {Button, Container, Form, Loader, Modal} from "semantic-ui-react";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceServiceMenuAPI} from "@/api";
import styled from "@emotion/styled";
import {ChangeEvent, useEffect, useState} from "react";
import * as React from "react";
import {CheckboxProps} from "semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox";


const reserveOpts = [
    {
        key: 0,
        text: "메뉴선택 -> 날짜선택 -> 시간선택 -> 옵션선택 -> 결제"
    },
    {
        key: 1,
        text: "메뉴선택 -> 날짜선택 -> 옵션선택 -> 결제"
    },
    {
        key: 2,
        text: "메뉴선택 -> 옵션선택 -> 결제"
    },
    {
        key: 3,
        text: "메뉴선택 -> 다중날짜선택 -> 옵션선택 -> 결제"
    },
];

export const dayOfWeek = [
    {id: 0, data: 0, showData: '일'},
    {id: 1, data: 1, showData: '월'},
    {id: 2, data: 2, showData: '화'},
    {id: 3, data: 3, showData: '수'},
    {id: 4, data: 4, showData: '목'},
    {id: 5, data: 5, showData: '금'},
    {id: 6, data: 6, showData: '토'}
];

export default function AllianceEditService({objectId, isOpen, handler}: any) {
    const {data, isLoading} = useQuery(
        testKeys.allianceServiceMenu(objectId as string),
        () => getAllianceServiceMenuAPI(objectId as string),
        {staleTime: 60 * 1000}
    );
    const [workedDays, setWorkedDays] = useState(data?.data.working_day.length ? data.data.working_day : []);
    const handleWorkedDays = (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        if (data.checked) {
            setWorkedDays([...workedDays, Number(data.value)].sort((a, b) => a - b));
        } else if (!data.checked) {
            setWorkedDays(workedDays.filter((el: any) => el !== Number(data.value)));
        }
    };

    useEffect(() => {
        console.log(data?.data.working_day)
        console.log(workedDays)
    }, [objectId, workedDays])
    return (
        <>
            <BlurModal
                dimmer="blurring"
                open={isOpen}
                onClose={handler}
                as={Form}
            >
                {data &&
                    <>
                        <Modal.Header as={"h2"}>
                            {data.data.name}
                            <Form.Radio toggle checked={data.data.service_status} label="게시여부" style={{textAlign:'right'}}/>
                        </Modal.Header>
                        <Modal.Content>

                            <Form.Input
                                label="상품명"
                                defaultValue={data.data.name}
                            />
                            <Form.Input
                                label="카테고리"
                                defaultValue={data.data.category}
                            />
                            <Form.Input
                                label="예약타입"
                                disabled
                                defaultValue={reserveOpts.filter((v) => v.key === data.data.reserve_type_purchase)[0].text}
                            />
                            <Form.Group>
                                {dayOfWeek.map((item) => (
                                    <Form.Checkbox
                                        key={item.id}
                                        label={item.showData}
                                        value={item.data}
                                        onChange={handleWorkedDays}
                                        checked={workedDays.includes(item.data)}
                                    />
                                ))}
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    width={8}
                                    label="할인율"
                                    defaultValue={data.data.discount}
                                />
                                <Form.Input
                                    width={8}
                                    label="가격"
                                    defaultValue={data.data.cost}
                                />
                            </Form.Group>
                            <Form.Input
                                readOnly
                                disabled
                                label="최종 가격"
                                defaultValue={data.data.finally_cost}
                            />

                            <Form.Group>
                                <Form.Input
                                    width={8}
                                    label="근무 시작시간"
                                    defaultValue={data.data.working_start}
                                />
                                <Form.Input
                                    width={8}
                                    label="근무 종료시간"
                                    defaultValue={data.data.working_end}
                                />
                            </Form.Group>
                            <Form.TextArea
                                label="제품설명"
                                defaultValue={data.data.desc}
                            />

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
        </>
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