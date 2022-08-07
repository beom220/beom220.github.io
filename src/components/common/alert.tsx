import {Button, Modal, Ref} from "semantic-ui-react";
import {AlertProps} from "@/types/alert";
import {useRef, useLayoutEffect} from "react";
import styled from "@emotion/styled";


export default function AlertPortal({message, isOpen, handler}: AlertProps) {

    const forwardedRef = useRef<HTMLButtonElement>(null);
    useLayoutEffect(() => {
        if (forwardedRef.current !== null) forwardedRef.current.focus();
    });
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
                <Ref innerRef={forwardedRef}>
                    <Button size="tiny" style={{fontWeight:600}} onClick={handler}>
                        확인
                    </Button>
                </Ref>
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