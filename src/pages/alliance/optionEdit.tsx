import {Button, Form, Header, Image, Input, InputOnChangeData, TextAreaProps, Modal} from "semantic-ui-react";
import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceOptionMangeAPI} from "@/api";
import styled from "@emotion/styled";
import {ChangeEvent, useEffect, useState} from "react";

export default function AllianceOptionEdit({objectId, isOpen, handler}: any) {
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceOptionManage(objectId),
        () => getAllianceOptionMangeAPI(objectId),
        {staleTime: 60 * 1000}
    );
    const [editOption, setEditOption] = useState<any>({
        cost: 0,
        createdAt: "",
        delete_status: false,
        description: "",
        image: "",
        name: "",
        objectId: "",
        recommend: false,
        service: [],
        shop: {},
        updatedAt: ""
    });

    // 이미지파일
    const encodeFileToBase64 = async (fileBlob: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
             reader.onload = () => {
                setEditOption({
                    ...editOption,
                    image: reader.result
                })
            };
             return resolve
        });
    };
    const handleEditOptions = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        const {name, value} = event.target;
        setEditOption({
            ...editOption,
            [name]: value
        })
    }
    const handleEditOptionTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
        const {id} = event.currentTarget;
        setEditOption({
            ...editOption,
            [id]: data.value
        })
    }

    useEffect(() => {
        setEditOption(data?.data)
    }, [data])

    useEffect(() => {
        console.log(editOption.image)
    },[editOption.image])

    return (
        <BlurModal
            dimmer="blurring"
            open={isOpen}
            onClose={handler}
            as={Form}
        >
            {data &&
                <>
                    <Modal.Header>
                        <Header
                            as="h3"
                            content={editOption.name + " 변경"}
                            // content={data.data.name + '관리'}
                            // subheader={`추가금액 : ${encodeMoney(data.data.cost)}원`}
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <Form.Input
                            label="상품명"
                            name="name"
                            onChange={handleEditOptions}
                            defaultValue={editOption.name}
                        />
                        <Form.TextArea
                            label="제품설명"
                            // name="description"
                            id="description"
                            onChange={handleEditOptionTextArea}
                            defaultValue={editOption.description}
                        />
                        <Input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    if(e.target.files[0].type.includes('image')){
                                        encodeFileToBase64(e.target.files[0]).then(null)
                                    } else {
                                        alert('이미지 형식만 가능')
                                        e.target.value = ""
                                    }
                                }
                            }}
                        />
                        <Image src={editOption.image} style={{maxHeight: "120px"}}/>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button negative size="tiny" onClick={handler}>
                            취소
                        </Button>
                        <Button positive size="tiny" onClick={() => console.log(editOption)}>
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