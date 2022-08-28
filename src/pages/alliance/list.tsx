import Template from "@/components/template";
import {
    Container,
    Icon,
    Label,
    Pagination,
    Table,
    Select,
    Button, Loader, Header
} from "semantic-ui-react";
import {testKeys} from "@/types/queryKey";
import {useQuery} from "@tanstack/react-query";
import {MouseEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {getAllianceListAPI} from "@/api";
import {PaginationProps} from "semantic-ui-react";
import {useLocation, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {allianceSelect} from "@/constants/allianceSelect";
import * as React from "react";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

export interface QueryOption {
    page?: number | null;
    limit: number;
    name?: string | null;
    tag?: string | null;
}

export default function AllianceList() {
    const location = useLocation();
    const queryData = location.search;
    const params = new URLSearchParams(queryData);
    const paramsPage = params.get('page');
    const paramsTag = params.get('tag');
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/alliance' && !paramsPage || location.pathname === '/alliance' && !paramsTag) {
            return navigate('/alliance?page=0' + '&limit=' + queryOption.limit + '&tag=' + queryOption.tag)
        }
        if (Number(paramsPage) !== queryOption.page || paramsTag !== queryOption.tag) {
            setQueryOption({
                ...queryOption,
                page: Number(paramsPage),
                tag: paramsTag
            })
        }
    }, [paramsPage, paramsTag])

    const [queryOption, setQueryOption] = useState<QueryOption>({
        page: 0,
        limit: 5,
        tag: "전체"
    })

    const onChangePage = useCallback((e: MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setQueryOption({
            ...queryOption,
            page: Number(data.activePage) - 1
        })
        navigate('/alliance?page=' + (Number(data.activePage) - 1) + '&limit=' + queryOption.limit + '&tag=' + queryOption.tag)
    }, [queryOption, setQueryOption])


    const [searchData, setSearchData] = useState<string>(allianceSelect[0].text);
    const onHandleSelectData = (event: SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        setSearchData(data.value as string)
    }
    const onSearchSubmit = () => {
        setQueryOption({
            ...queryOption,
            page: 0,
            tag: searchData
        })
        navigate('/alliance?page=0' + '&limit=' + queryOption.limit + '&tag=' + searchData)
    }
    const {data, isError, isLoading} = useQuery(
        testKeys.allianceByOrder(queryOption),
        () => getAllianceListAPI(queryOption),
        {staleTime: 60 * 1000}
    );

    const columns = [
        "제휴사명",
        "지역",
        "카테고리",
        "상태",
    ]

    const dataRow = [
        "name",
        "address",
        "category",
        "status"
    ]

    if (isError) {
        navigate('/error')
    }

    return (
        <Template>
            <Container>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <Header
                        as='h2'
                        content='제휴사 리스트'
                        subheader='Manage your alliance setting'
                    />
                    <div>
                        <Select
                            options={allianceSelect}
                            placeholder='카테고리 검색'
                            onChange={onHandleSelectData}
                        />
                        <Button type='button' primary onClick={onSearchSubmit}>검색</Button>
                    </div>
                </div>

                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '6rem'}}/>
                {data && <>
                    <Table compact celled size='large' style={{margin: "4rem 0"}}>
                        <Table.Header>
                            <Table.Row style={{textAlign: "center"}}>
                                <Table.HeaderCell width={4}>{columns[0]}</Table.HeaderCell>
                                <Table.HeaderCell width={8}>{columns[1]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{columns[2]}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{columns[3]}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {!data.rows.length ?
                                <Table.Row textAlign="center">
                                    <Table.Cell colSpan='4' style={{padding: "80px 0"}}>
                                        <h2>자료가 없습니다.</h2>
                                    </Table.Cell>
                                </Table.Row> : <>
                                    {data.rows.map((v: any, i: number) =>
                                        <Table.Row key={i} style={{textAlign: "center"}}>
                                            {dataRow.map((row, index) => {
                                                if (row === 'name') {
                                                    return <Table.Cell key={index} style={{textAlign: "left"}}>
                                                        <Link
                                                            to={'/alliance/' + v.objectId}>{String(v[row])}</Link></Table.Cell>
                                                }
                                                if (row === 'status') {
                                                    return (
                                                        <Table.Cell key={index}>{v[row] ?
                                                            <Label color="teal">게시</Label> :
                                                            <Label color="orange">대기</Label>}
                                                        </Table.Cell>)
                                                }
                                                if (row === 'address') {
                                                    return <Table.Cell key={index}
                                                                       style={{textAlign: "left"}}>{String(v[row])}</Table.Cell>
                                                }
                                                return <Table.Cell key={index}>{String(v[row])}</Table.Cell>
                                            })}
                                        </Table.Row>
                                    )}</>
                            }
                        </Table.Body>
                    </Table>
                    <div style={{textAlign: "center"}}>
                        <Pagination
                            boundaryRange={0}
                            activePage={Number(queryOption.page) + 1}
                            ellipsisItem={null}
                            firstItem={{content: <Icon name="angle double left"/>, icon: true}}
                            lastItem={{content: <Icon name="angle double right"/>, icon: true}}
                            prevItem={{content: <Icon name="angle left"/>, icon: true}}
                            nextItem={{content: <Icon name="angle right"/>, icon: true}}
                            siblingRange={1}
                            totalPages={data.totalPage}
                            onPageChange={onChangePage}
                        />
                    </div>
                </>}
            </Container>
        </Template>
    )
}