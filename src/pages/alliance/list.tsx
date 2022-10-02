import Template from "@/components/template";
import {Container, Icon, Label, Pagination, Table, Select, Button, Loader, Header, Input} from "semantic-ui-react";
import {allianceKey} from "@/types/queryKey";
import {useQuery} from "@tanstack/react-query";
import {MouseEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {getAllianceListAPI} from "@/api";
import {PaginationProps} from "semantic-ui-react";
import {useLocation, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {allianceSelect} from "@/constants/allianceSelect";
import * as React from "react";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import {InputOnChangeData} from "semantic-ui-react/dist/commonjs/elements/Input/Input";
import {QueryOptionType} from "@/types/queryString";


export default function AllianceList() {
    const location = useLocation();
    const queryData = location.search;
    const params = new URLSearchParams(queryData);
    const paramsPage = params.get('page');
    const paramsTag = params.get('tag');
    const navigate = useNavigate();

    const [queryOption, setQueryOption] = useState<QueryOptionType>({
        page: 1,
        limit: 10,
        tag: 0,
        sort:0,
    })

    useEffect(() => {
        if ((location.pathname === '/') || (location.pathname === '/alliance' && !paramsPage) || (location.pathname === '/alliance' && !paramsTag)) {
            return navigate(`/alliance?page=1&limit=${queryOption.limit}&tag=${queryOption.tag}`)
        }
        if (Number(paramsPage) !== queryOption.page || paramsTag !== queryOption.tag) {
            setQueryOption({
                ...queryOption,
                page: Number(paramsPage),
                tag: paramsTag
            })
        }
    }, [location.pathname, navigate, paramsPage, paramsTag, queryOption])


    const onChangePage = useCallback((e: MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setQueryOption({
            ...queryOption,
            page: Number(data.activePage)
        })
        navigate('/alliance?page=' + Number(data.activePage) + '&limit=' + queryOption.limit + '&tag=' + queryOption.tag)
    }, [queryOption, setQueryOption, navigate])


    const [searchName, setSearchName] = useState<string>("");
    const onHandleSearchName = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setSearchName(data.value)
    }
    const onSearchNameSubmit = () => {
        setSearchData(allianceSelect[0].text);
        setQueryOption({
            ...queryOption,
            page: 1,
            tag: 0,
            name: searchName,
        })
        navigate(`/alliance?page=1&limit=${queryOption.limit}&name=${queryOption.name}`)
    }

    const [searchData, setSearchData] = useState<string>(allianceSelect[0].text);
    const onHandleSelectData = (event: SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        setSearchName("")
        setSearchData(data.value as string)
    }
    const onSearchSubmit = () => {
        setQueryOption({
            ...queryOption,
            page: 1,
            name: "",
            tag: allianceSelect.filter(v => v.value === searchData)[0].key
        })
        navigate(`/alliance?page=1&limit=${queryOption.limit}&tag=${allianceSelect.filter(v => v.value === searchData)[0].key}`)
    }
    const {data, isError, isLoading} = useQuery(
        allianceKey.allianceListByOrder(queryOption),
        () => getAllianceListAPI(queryOption),
        {staleTime: 60 * 1000}
    );


    const columns = [
        "제휴사명",
        "지역",
        "카테고리",
        "상태",
    ]

    const statusFilter = (status:boolean) => {
        switch (status) {
            default :
            case true : return <Label content="게시" color="green" style={{fontWeight:'300'}}/>
            case false : return <Label content="대기" color="orange" style={{fontWeight:'300'}}/>
        }
    }

    if (isError) {
        navigate('/error')
    }

    return (
        <Template>
            <Container>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Header
                        as='h2'
                        content='제휴사 목록'
                        subheader='Manage your alliance'
                    />
                    <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
                        <div style={{textAlign:"right"}}>
                            <Button primary onClick={() => navigate('/alliance/create')}>신규 제휴사 생성</Button>
                        </div>
                        <div style={{display:"flex", gap:"1rem"}}>
                            <Input
                                value={searchName}
                                placeholder='제휴사명으로 검색'
                                onChange={onHandleSearchName}
                                action={{
                                    icon: 'search',
                                    color: "teal",
                                    onClick : onSearchNameSubmit

                                }}
                            />
                            <div className="ui action input">
                                <Select
                                    value={searchData}
                                    options={allianceSelect}
                                    placeholder='카테고리 검색'
                                    onChange={onHandleSelectData}
                                />
                                <Button type='button' onClick={onSearchSubmit} icon='search' color="teal"/>
                            </div>
                        </div>
                    </div>

                </div>

                <Loader active={isLoading} size="massive" inline='centered' style={{marginTop: '12rem'}}/>
                {data && <>
                    <Table compact selectable celled style={{margin: "2rem 0"}}>
                        <Table.Header>
                            <Table.Row style={{textAlign: "center"}}>
                                <Table.HeaderCell width={3} content={columns[0]}/>
                                <Table.HeaderCell content={columns[1]}/>
                                <Table.HeaderCell width={2} content={columns[2]}/>
                                <Table.HeaderCell width={2} content={columns[3]}/>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {!data.data.length ?
                                <Table.Row textAlign="center">
                                    <Table.Cell colSpan='4' style={{padding: "80px 0"}}>
                                        <h2>자료가 없습니다.</h2>
                                    </Table.Cell>
                                </Table.Row> : <>
                                {data.data.map((row: any, i: number) =>
                                    <Table.Row key={i} style={{textAlign: "center"}}>
                                        <Table.Cell
                                            textAlign="left"
                                            content={<Link to={'/alliance/info/' + row.objectId} children={row.name}/>}
                                        />
                                        <Table.Cell content={row.address} textAlign="left"/>
                                        <Table.Cell content={row.category}/>
                                        <Table.Cell content={statusFilter(row.status)}/>
                                    </Table.Row>
                                )}
                            </>}
                        </Table.Body>
                    </Table>
                    <div style={{textAlign: "center"}}>
                        <Pagination
                            boundaryRange={1}
                            activePage={Number(queryOption.page)}
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