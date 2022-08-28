import Template from "@/components/template";
import {Button, Container, Header, Image, Label, Loader, Menu, MenuItemProps, Table} from "semantic-ui-react";
import {useQuery} from "@tanstack/react-query";
import {testKeys} from "@/types/queryKey";
import {getAllianceAPI} from "@/api";
import {useNavigate, useParams} from "react-router";
import * as React from "react";
import {MouseEvent, useState} from "react";

export default function Alliance() {
    const navigate = useNavigate();
    const params = useParams();
    const AllianceId = params.id as string;

    const {data, isError, isLoading} = useQuery(
        testKeys.allianceID(AllianceId),
        () => getAllianceAPI(AllianceId),
        {staleTime: 60 * 1000}
    );

    const timeConverter = (date: Date) => {
        let hour = new Date(date).getHours().toString();
        let min = new Date(date).getMinutes().toString();
        if (Number(hour) < 10) {
            hour = '0' + hour;
        }
        if (Number(min) < 10) {
            min = '0' + min;
        }
        return `${hour}시 ${min}분`
    }
    const fullTimeConverter = (date: Date) => {
        const _this = new Date(date);
        const yy = _this.getFullYear();
        const mm = _this.getMonth() + 1;
        const dd = _this.getDate();

        return `${yy}년 ${mm}월 ${dd}일 `
    }
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
    const onActiveItem = (e:MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => {
        setActiveItem(data.name as string)
        navigate('/alliance' + data.value + '/' + AllianceId)
    }
    return (
        <Template>
            <Container>
                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data &&
                    <>
                        <Header
                            as='h2'
                            content={data.name}
                            subheader='Manage your alliance setting'
                        />

                        <Menu pointing secondary style={{marginTop:'6rem'}}>
                            {menu.map((v) =>
                                <Menu.Item
                                    name={v.text}
                                    active={activeItem === v.text}
                                    value={v.href}
                                    onClick={onActiveItem}
                                />
                            )}
                        </Menu>


                        <Table definition style={{margin: '4rem 0'}} size="large">
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={4}>게시여부</Table.Cell>
                                    <Table.Cell>
                                        {data.status ?
                                            <Label color="teal">게시</Label> :
                                            <Label color="orange">대기</Label>
                                        }
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>카테고리</Table.Cell>
                                    <Table.Cell>
                                        {data.category}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>프랜차이즈명</Table.Cell>
                                    <Table.Cell>
                                        {data.brand_name ?? '-'}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>업체명</Table.Cell>
                                    <Table.Cell>
                                        {data.name}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>대표자명</Table.Cell>
                                    <Table.Cell>
                                        {data.owner}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>주소</Table.Cell>
                                    <Table.Cell>
                                        {data.address}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>상세 주소</Table.Cell>
                                    <Table.Cell>
                                        {data.sub_address ?? '-'}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>정기휴무</Table.Cell>
                                    <Table.Cell>
                                        {data.regular_holiday_date?.length ?
                                            (<>휴무날짜 : {data.regular_holiday_date?.join(',')}</>) :
                                            data.regular_holiday_day?.length ?
                                                (<>휴무요일: {data.regularHolidayText?.join(',')}</>) :
                                                (<>-</>)
                                        }
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>일반 휴무</Table.Cell>
                                    <Table.Cell>
                                        {data.irregular_holiday
                                            ?.map((v: Date) => fullTimeConverter(v))
                                            ?? '-'
                                        }
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>운영 시간</Table.Cell>
                                    <Table.Cell>
                                        {timeConverter(data.open_time)} ~ {timeConverter(data.close_time)}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>전화번호</Table.Cell>
                                    <Table.Cell>
                                        {data.phone}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>안내 및 혜택</Table.Cell>
                                    <Table.Cell>
                                        {data.benefit ?? '-'}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>사업자 등록번호</Table.Cell>
                                    <Table.Cell>
                                        {data.business_number}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>편의시설</Table.Cell>
                                    <Table.Cell>
                                        {data.facility ? `${data.facility}` : `-`}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>제휴사 최초 진행일</Table.Cell>
                                    <Table.Cell>
                                        {fullTimeConverter(data.upDatedAt)} {timeConverter(data.upDatedAt)}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>제휴사 이미지</Table.Cell>
                                    <Table.Cell>
                                        <Image.Group size="small">
                                            {data.images?.map((image: string, i: number) =>
                                                <Image key={i} src={image} alt={data.name}/>)
                                            }
                                        </Image.Group>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Button floated='right' onClick={() => navigate(-1)}>목록으로</Button>
                    </>
                }
            </Container>
        </Template>
    )
}