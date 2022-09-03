import {Button, Modal} from "semantic-ui-react";
import {ConfirmProps} from "@/types/alert";
import styled from "@emotion/styled";


export default function ConfirmPortal({message, isOpen, handler, actionHandler}: ConfirmProps) {
    return (
        <BlurModal
            dimmer="blurring"
            open={isOpen}
            onClose={handler}
        >
            {message.title ?
                <Modal.Header>{message.title}</Modal.Header> :
                null
            }
            <Modal.Content>
                {message.content}
            </Modal.Content>

            <Modal.Actions>
                <Button negative size="tiny" onClick={handler}>
                    취소
                </Button>
                <Button positive size="tiny" onClick={actionHandler}>
                    확인
                </Button>
            </Modal.Actions>
        </BlurModal>
    )
}

const BlurModal = styled(Modal)`
    width: 96%;
    max-width: 540px;
    left: 50%;
    top: 50%;
    position: fixed !important;
    zIndex: 1000;
    transform:translate(-50%,-50%);
`