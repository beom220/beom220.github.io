import {Container, Header} from "semantic-ui-react";
import Template from "@/components/template";

export default function CouponList(){
    return (
        <>
            <Template>
                <Container>
                    <Header
                        as="h2"
                        content="쿠폰 리스트"
                        subheader="Mange Coupons"
                    />
                </Container>
            </Template>
        </>
    );
}