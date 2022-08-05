import {Button, Modal} from "semantic-ui-react";
import { AlertProps} from "@/types/alert";
import styled from "@emotion/styled";


export default function AlertPortal({message, isOpen, handler}: AlertProps) {
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

            {message.content ?
                <Modal.Content>{message.content}</Modal.Content> :
                null
            }

            <Modal.Actions>
                <Button positive size="tiny" onClick={handler}>
                    확인
                </Button>
            </Modal.Actions>
        </BlurModal>
    )
}

const BlurModal = styled(Modal)`
    width: 96%;
    max-width: 380px;
    left: 50%;
    top: 50%;
    position: fixed !important;
    zIndex: 1000;
    transform:translate(-50%,-50%);
`