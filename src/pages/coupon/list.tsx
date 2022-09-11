import {Button, Container, Header, Input, Select} from "semantic-ui-react";
import Template from "@/components/template";
import {allianceSelect} from "@/constants/allianceSelect";
import * as React from "react";
import {useNavigate} from "react-router";

export default function CouponList(){
    const navigate = useNavigate();
    return (
        <>
            <Template>
                <Container>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <Header
                            as='h2'
                            content='쿠폰 목록'
                            subheader='Manage your alliance'
                        />
                        <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                            <div style={{textAlign:"right"}}>
                                <Button primary onClick={() => navigate('/alliance/create')}>신규 쿠폰 발급</Button>
                            </div>
                            <div style={{display:"flex", gap:"1rem"}}>
                                <Input
                                    // value={searchName}
                                    placeholder='쿠폰명 검색'
                                    // onChange={onHandleSearchName}
                                    action={{
                                        icon: 'search',
                                        color: "teal",
                                        // onClick : onSearchNameSubmit

                                    }}
                                />
                                <div className="ui action input">
                                    <Select
                                        // value={searchData}
                                        options={allianceSelect}
                                        placeholder='정렬'
                                        // onChange={onHandleSelectData}
                                    />
                                    <Button
                                        type='button'
                                        // onClick={onSearchSubmit}
                                        icon='search'
                                        color="teal"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                {/* Header End   */}


                </Container>
            </Template>
        </>
    );
}