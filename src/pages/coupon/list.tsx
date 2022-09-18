import {
    Button,
    Container, Form,
    Header,
    Icon,
    Input,
    Label,
    Loader,
    Pagination,
    PaginationProps,
    Select,
    Table,
    CheckboxProps
} from "semantic-ui-react";
import Template from "@/components/template";
import {allianceSelect} from "@/constants/allianceSelect";
import {useLocation, useNavigate} from "react-router";
import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {QueryOptionType} from "@/types/queryString";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {couponKey} from "@/types/queryKey";
import {getCouponGroupAPI, getCouponGroupItemAPI, getCouponListAPI, patchCouponConfirmAPI} from "@/api";
import * as React from "react";
import {dateConverter, encodeNumber} from "@/util/converter";
import useModals from "@/hooks/useModals";
import {AlertPortal, ConfirmPortal, MessagePortal} from "@/components/common";
import {CouponConfirmType} from "@/types/coupon";

export default function CouponList() {
    const navigate = useNavigate();
    const location = useLocation();
    const locationSearch = location.search;
    const params = new URLSearchParams(locationSearch);
    const paramsPage = Number(params.get('page'));
    const paramsLimit = Number(params.get('limit'));
    const paramsSort = Number(params.get('sort'));
    const paramsName = params.get('name');
    const scrollTop = () => window.scrollTo(0, 0)
    const queryClient = useQueryClient()

    // 쿠폰 리스트 쿼리옵션
    const [queryOption, setQueryOption] = useState<QueryOptionType>({
        page: 1,
        limit: 10,
        sort: 0,
        name: ""
    })

    // 쿠폰 리스트 요청
    const {data: couponList, isLoading: couponListIsLoading} = useQuery(
        couponKey.couponListByOrder(queryOption),
        () => getCouponListAPI(queryOption),
        {
            staleTime: 60 * 1000,
            refetchInterval: 60 * 1000,
        }
    );

    // 페이지 이동시 쿼리옵션 변경
    useEffect(() => {
        scrollTop();
        setQueryOption({
            page: !paramsPage ? queryOption.page : paramsPage,
            limit: !paramsLimit ? queryOption.limit : paramsLimit,
            sort: !paramsSort ? queryOption.sort : paramsSort,
            name: paramsName ?? ""
        })
    }, [location])

    // 검색명
    const [searchName, setSearchName] = useState<string>("");
    const onHandleSearchName = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value)
    }
    // 검색 
    const onSearchPage = () => {
        navigate(`/coupon?page=1&limit=${queryOption.limit}&sort=${queryOption.sort}&name=${searchName}`)
    }

    // 페이징
    const onChangePage = (e: MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        navigate(`/coupon?page=${data.activePage}&limit=${queryOption.limit}&sort=${queryOption.sort}&name=${queryOption.name}`)
    }

    // 테이블 컬럼명
    const column = ["쿠폰명", "발행처", "신청일", "사용기한", "발행수", "등록수", "사용처", "상태", "사용여부"] as const;
    // 쿠폰 발급 상태
    const coupon_status = ['발급중', '발급완료', '반려'] as const;
    // 쿠폰 상태 필터
    const couponStatusFilter = (status: number) => {
        switch (status) {
            default :
            case 0 :
                return <Label content={coupon_status[0]} color="yellow" style={{fontWeight: '400'}}/>
            case 1 :
                return <Label content={coupon_status[1]} color="green" style={{fontWeight: '300'}}/>
            case 2 :
                return <Label content={coupon_status[2]} color="red" style={{fontWeight: '300'}}/>
        }
    }
    // 쿠폰 삭제 상태 필터
    const deleteStatusFilter = (status: boolean) => {
        switch (status) {
            default :
            case true :
                return <Label content="미사용" color="orange" style={{fontWeight: '300'}}/>
            case false :
                return <Label content="사용" color="blue" style={{fontWeight: '300'}}/>
        }
    }

    // 쿠폰 그룹 모달
    const {isOpen, handleModal, message, handleMessage} = useModals();
    // 쿠폰 그룹 확인할 그룹 아이디설정
    const [couponGroupId, setCouponGroupId] = useState<string>("");
    const handleCouponGroupId = (value: string) => {
        setCouponGroupId(value)
    }
    // 쿠폰 그룹 요청
    const {data: couponGroup, isLoading: couponGroupIsLoading, isSuccess: couponGroupIsSuccess} = useQuery(
        couponKey.couponGroup(couponGroupId),
        () => getCouponGroupAPI(couponGroupId),
        {
            staleTime: 60 * 1000,
            enabled: !!couponGroupId.length
        }
    );

    // 쿠폰 그룹 컨펌 데이터
    const confirmInitData = {
        groupId: "",
        status: 0,
        reason: '',
        deleteStatus: false
    } as CouponConfirmType;
    const [confirmData, setConfirmData] = useState(confirmInitData);

    // 쿠폰그룹 데이터 요청 이후 모달컨텐츠 데이터 바인딩
    useEffect(() => {
        if (couponGroup) {
            handleMessage({
                title: couponGroup.data.couponName,
                content: <ModalContent data={{...couponGroup.data}}/>
            })
        }
    }, [couponGroup, confirmData])

    // 그룹아이디 셀렉 후 컨펌데이터에 바인딩
    useEffect(() => {
        setConfirmData({
            ...confirmData,
            groupId: couponGroupId
        })
    }, [couponGroup])

    // 승인 및 반려 컨트롤
    const handleStatus = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        setConfirmData({
            ...confirmData,
            status: Number(data.value)
        });
    };

    //  쿠폰 그룹 변경 데이터 초기화
    const couponGroupDataInit = () => {
        setCouponGroupId("");
        handleMessage({title: null, content: null,})
        setConfirmData(confirmInitData)
    }

    // 쿠폰 그룹 모달 닫기
    const closeGroupModal = () => {
        couponGroupDataInit();
        handleModal(false);
    }

    // 변경 후 메세지
    const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
    const [mutateMessage, setMutateMessage] = useState<string>("");

    // 변경 요청 액션 & 업데이트
    const {mutate: couponConfirm, isLoading: couponConfirmIsLoading} = useMutation(patchCouponConfirmAPI)
    const couponGroupAction = () => {
        if (!confirmData.status) {
            return closeGroupModal()
        }
        couponConfirm(confirmData, {
            onSuccess: () => {
                queryClient.invalidateQueries(couponKey.couponListByOrder(queryOption))
                    .then(() => queryClient.invalidateQueries(couponKey.couponGroup(couponGroupId))
                        .then(() => setMutateMessage('변경에 성공하였습니다.')))
            },
            onError: (error) => {
                console.log('error : ', error)
                setMutateMessage('변경에 실패하였습니다.')
            },
            onSettled: (data) => {
                console.log('settled : ', data)
                setIsOpenMessage(true)
                closeGroupModal()
            }
        })
    }

    // 쿠폰 그룹 상세 모달
    const {
        isOpen: detailIsOpen,
        handleModal: setDetailIsOpen,
        message: detailMessage,
        handleMessage: setDetailMessage
    } = useModals();
    // 쿠폰 그룹 상세 확인할 그룹 아이디설정
    const [couponGroupDetailId, setCouponGroupDetailId] = useState<string>("");
    const handleCouponGroupDetailId = (value: string) => {
        setCouponGroupDetailId(value)
    }
    // 쿠폰 그룹 상세 쿼리옵션 초기값
    const detailQueryOptionInit: QueryOptionType = {page: 1, limit : 5}
    // 쿠폰 그룹 상세 쿼리옵션
    const [detailQueryOption, setDetailQueryOption] = useState<QueryOptionType>(detailQueryOptionInit)
    // 쿠폰 그룹 상세 요청
    const {data: couponGroupDetail, isLoading: couponGroupDetailIsLoading} = useQuery(
        couponKey.couponGroupDetail(couponGroupDetailId, detailQueryOption),
        () => getCouponGroupItemAPI(couponGroupDetailId, detailQueryOption),
        {
            staleTime: 60 * 1000,
            enabled: !!couponGroupDetailId.length
        }
    );
    // 쿠폰 그룹 상세 페이징
    const onChangeDetailPage = (e: MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setDetailQueryOption({
            ...detailQueryOption,
            page: data.activePage
        })
    }
    // 쿠폰 그룹 상세 테이블 컬럼명
    const couponDetailColumn = ["쿠폰명", "등록자", "사용금액", "사용여부"] as const;
    // 쿠폰 그룹 상세 사용 여부 필터
    const couponDetailUsedFilter = (status: boolean) => {
        switch (status) {
            default :
            case false :
                return <Label content="사용전" color="grey" style={{fontWeight: '300'}}/>
            case true :
                return <Label content="사용" color="yellow" style={{fontWeight: '400'}}/>
        }
    }
    //  쿠폰 그룹 상세 요청 이후 모달컨텐츠 데이터 바인딩
    useEffect(() => {
        if (couponGroupDetail) {
            setDetailMessage({
                title: couponGroupDetailId,
                content: <CouponDetailContent data={couponGroupDetail}/>
            })
        }
    }, [couponGroupDetail])
    // 쿠폰 그룹 상세 모달 닫기 (쿼리옵션 초기화)
    const onCloseDetailModal = () => {
        setDetailIsOpen(false)
        setDetailQueryOption(detailQueryOptionInit)
        setCouponGroupDetailId("")
    }


    // 업데이트 메세지 감시
    useEffect(() => {
        if (isOpenMessage) {
            setTimeout(() => {
                setIsOpenMessage(false)
            }, 2000)
        }
    }, [isOpenMessage])

    // 쿠폰그룹 모달 컨텐츠 설정
    const ModalContent = ({data}: any): JSX.Element => {
        return (
            <>
                {couponGroupIsSuccess &&
                    <Table definition size="small">
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={4} content="발급 요청 제휴사"/>
                                <Table.Cell content={data.shopName}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="발급 요청일"/>
                                <Table.Cell content={dateConverter(data.createdAt).yearMonthDate}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="사용 기한"/>
                                <Table.Cell
                                    content={`${dateConverter(data.dateStart).yearMonthDate} ~ ${dateConverter(data.dateEnd).yearMonthDate}`}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="발행 수량"/>
                                <Table.Cell content={encodeNumber(data.count) + ' 건'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="할인율 %"/>
                                <Table.Cell content={data.discount + ' %'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="할인 금액"/>
                                <Table.Cell content={encodeNumber(data.cost) + ' 원'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="최소 사용금액"/>
                                <Table.Cell content={encodeNumber(data.minimum) + ' 원'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="최대 할인금액"/>
                                <Table.Cell content={encodeNumber(data.maxDiscount) + ' 원'}/>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell width={4} content="발급 상태"/>
                                <Table.Cell content={couponStatusFilter(data.issueStatus)}/>
                            </Table.Row>
                            {data.issueStatus ? null :
                                <Table.Row>
                                    <Table.Cell width={4} content="승인 및 반려"/>
                                    <Table.Cell>
                                        <Form.Checkbox
                                            label={<label>승인</label>}
                                            name="status"
                                            value={1}
                                            checked={confirmData.status === 1}
                                            onChange={handleStatus}
                                        />
                                        <Form.Checkbox
                                            label={<label>반려</label>}
                                            name="status"
                                            value={2}
                                            checked={confirmData.status === 2}
                                            onChange={handleStatus}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            }
                            {confirmData.status !== 2 ? null :
                                <Table.Row>
                                    <Table.Cell width={4} content="반려 사유"/>
                                    <Table.Cell>
                                        <Form>
                                            <Form.TextArea/>
                                        </Form>
                                    </Table.Cell>
                                </Table.Row>
                            }
                        </Table.Body>
                    </Table>
                }
            </>
        )
    }

    // 쿠폰그룹 상세 컨텐츠 설정
    const CouponDetailContent = ({data}: any): JSX.Element => {
        return (
            <>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            {couponDetailColumn.map((column, i) => (
                                <Table.HeaderCell key={i} content={column}/>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.data.map((row: any, i: number) => (
                            <Table.Row key={i}>
                                <Table.Cell content={row.couponId}/>
                                <Table.Cell content={row.userNickname}/>
                                <Table.Cell content={row.purchaseCost}/>
                                <Table.Cell content={couponDetailUsedFilter(row.deleteStatus)}/>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <div style={{textAlign: "center"}}>
                    <Pagination
                        boundaryRange={1}
                        activePage={Number(detailQueryOption.page)}
                        ellipsisItem={null}
                        firstItem={{content: <Icon name="angle double left"/>, icon: true}}
                        lastItem={{content: <Icon name="angle double right"/>, icon: true}}
                        prevItem={{content: <Icon name="angle left"/>, icon: true}}
                        nextItem={{content: <Icon name="angle right"/>, icon: true}}
                        siblingRange={1}
                        totalPages={data.totalPage}
                        onPageChange={onChangeDetailPage}
                    />
                </div>
            </>
        )
    }

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
                        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <div style={{textAlign: "right"}}>
                                <Button primary onClick={() => navigate('/alliance/create')}>신규 쿠폰 발급</Button>
                            </div>
                            <div style={{display: "flex", gap: "1rem"}}>
                                <Input
                                    name="searchName"
                                    value={searchName}
                                    placeholder='쿠폰명 검색'
                                    onChange={onHandleSearchName}
                                    action={{
                                        icon: 'search',
                                        color: "teal",
                                        onClick: onSearchPage
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
                    <Loader active={couponListIsLoading || couponConfirmIsLoading} size="massive" inline='centered'
                            style={{marginTop: '12rem'}}/>
                    {couponList && <>
                        <Table compact celled selectable size='small' style={{margin: "2rem 0"}}>
                            <Table.Header>
                                <Table.Row textAlign="center">
                                    {column.map((name, i) =>
                                        <Table.HeaderCell key={i} content={name}/>
                                    )}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {!couponList.data.length ?
                                    <Table.Row textAlign="center">
                                        <Table.Cell colSpan={column.length} style={{padding: "80px 0"}}>
                                            <h2>자료가 없습니다.</h2>
                                        </Table.Cell>
                                    </Table.Row>
                                    : <>{couponList.data.map((row: any, i: number) =>
                                        <Table.Row
                                            key={i}
                                            active={row.deleteStatus}
                                            warning={!row.status}
                                            negative={row.status === 2}
                                        >
                                            <Table.Cell
                                                content={<Label
                                                    basic
                                                    content={row.groupName}
                                                    style={{color: "inherit", cursor: "pointer"}}
                                                    onClick={() => {
                                                        handleCouponGroupId(row.groupId)
                                                        handleModal(true)
                                                    }}
                                                />}
                                            />
                                            <Table.Cell content={row.issuer}/>
                                            <Table.Cell textAlign="right"
                                                        content={dateConverter(row.createdAt).fullDateMonth}/>
                                            <Table.Cell textAlign="right">
                                                {dateConverter(row.dateStart).yearMonthDate}<br/>~ {dateConverter(row.dateEnd).yearMonthDate}
                                            </Table.Cell>
                                            <Table.Cell textAlign="right" content={`${encodeNumber(row.count)} 건`}/>
                                            <Table.Cell textAlign="right" content={`${encodeNumber(row.useCount)} 건`}/>
                                            <Table.Cell textAlign="center">
                                                {/*{row.groupId}*/}
                                                {row.status !== 1 ? "-" :
                                                    <Label basic color="blue"
                                                           content="보기"
                                                           style={{cursor: "pointer"}}
                                                           onClick={() => {
                                                               setDetailIsOpen(true)
                                                               handleCouponGroupDetailId(row.groupId)
                                                           }}
                                                    />
                                                }
                                            </Table.Cell>
                                            <Table.Cell textAlign="center">{couponStatusFilter(row.status)}</Table.Cell>
                                            <Table.Cell
                                                textAlign="center">{deleteStatusFilter(row.deleteStatus)}</Table.Cell>
                                        </Table.Row>
                                    )}</>
                                }
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
                                totalPages={couponList.totalPage}
                                onPageChange={onChangePage}
                            />
                        </div>
                    </>}
                    <Loader
                        active={
                            (detailIsOpen && couponGroupDetailIsLoading) || (isOpen && couponGroupIsLoading)
                        }
                        size="massive"
                        inline='centered'
                        style={{
                            position: 'fixed',
                            top:'50%',
                            left:'50%',
                            transform:'translate(-50%, -50%)'
                        }}
                    />
                    <ConfirmPortal
                        isOpen={isOpen && !!couponGroup}
                        message={message}
                        handler={closeGroupModal}
                        actionHandler={couponGroupAction}
                    />
                    <MessagePortal
                        isOpen={isOpenMessage}
                        children={mutateMessage}
                    />
                    <AlertPortal
                        isOpen={detailIsOpen && couponGroupDetail}
                        message={detailMessage}
                        handler={onCloseDetailModal}
                    />
                </Container>
            </Template>
        </>
    );
}