import {useNavigate, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceAPI} from "@/api";
import {MouseEvent, useState} from "react";
import {Header, Menu, MenuItemProps} from "semantic-ui-react";
import * as React from "react";

export default function AllianceHeader() {
    const navigate = useNavigate();
    const params = useParams();
    const AllianceId = params.id as string;

    const {data, isError, isLoading} = useQuery(
        testKeys.allianceID(AllianceId),
        () => getAllianceAPI(AllianceId),
        {staleTime: 60 * 1000}
    );

    const menu = [
        {
            href: '/info',
            text: '기본정보',
            key: '0',
        },
        {
            href: '/menu',
            text: '메뉴등록(서비스)',
            key: '1',
        },
        {
            href: '/option',
            text: '옵션관리',
            key: '2',
        },
        {
            href: '/review',
            text: '리뷰관리',
            key: '3',
        },
        {
            href: '/ask',
            text: '문의관리',
            key: '4',
        },
    ];
    const [activeItem, setActiveItem] = useState<string>(menu[0].text)
    const onActiveItem = (e: MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => {
        setActiveItem(data.name as string)
        navigate('/alliance' + data.value + '/' + AllianceId)
    }
    return (
        <>
            {data &&
                <>
                    <Header
                        as='h2'
                        content={data.name}
                        subheader='Manage your alliance setting'
                    />
                    <Menu pointing secondary style={{marginTop: '6rem'}}>
                        {menu.map((v) =>
                            <Menu.Item
                                name={v.text}
                                active={activeItem === v.text}
                                value={v.href}
                                onClick={onActiveItem}
                            />
                        )}
                    </Menu>
                </>
            }
        </>)
}