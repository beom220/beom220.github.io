import Template from "@/components/template";
import {Container} from "semantic-ui-react";
import List from "@/components/products/list"
import Detail from "@/components/products/detail";
import Create from "@/components/products/create";

export function ProductList() {
    return (
        <Template>
            <Container>
                <List/>
            </Container>
        </Template>
    )
}

export function ProductDetail(){
    return (
        <Template>
            <Container>
                <Detail/>
            </Container>
        </Template>
    )
}
export function ProductCreate(){
    return (
        <Template>
            <Container>
                <Create/>
            </Container>
        </Template>
    )
}