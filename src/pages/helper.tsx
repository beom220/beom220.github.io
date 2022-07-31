import {Button, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function Helper(){
    return (
        <Segment>
            <Button as={Link} to="/test">지도</Button>
            <Button as={Link} to="/login">로그인</Button>
            <Button as={Link} to="/qwerqwfasdfasdf">에러</Button>
        </Segment>
    )
}