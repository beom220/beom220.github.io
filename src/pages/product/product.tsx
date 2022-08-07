import Template from "@/components/template";
import {default as List} from "@/components/products/list";
import {Container} from "semantic-ui-react";

export default function ProductList() {
    return (
        <Template>
            <Container>
                <List/>
            </Container>
        </Template>
    )
}