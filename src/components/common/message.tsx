import {Segment, TransitionablePortal} from "semantic-ui-react";
import {ReactNode} from "react";

interface PropsType {
    isOpen: boolean;
    children: ReactNode;
}

export default function MessagePortal({isOpen, children} :PropsType){
    return (
        <TransitionablePortal
            open={isOpen}
            transition={{ animation:"fade left", duration:"300" }}
        >
            <Segment
                style={{
                    right: '1rem',
                    position: 'fixed',
                    padding: '1rem 2rem',
                    backgroundColor: 'rgba(255,255,255,.8)',
                    top: '56px',
                    zIndex: 1000,
                }}
            >
                {children}
            </Segment>
        </TransitionablePortal>
    )
}