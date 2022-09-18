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
import {useLocation, useNavigate} from "react-router";
import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import {QueryOptionType} from "@/types/queryString";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {reservationKey} from "@/types/queryKey";
import {getReservationAPI, getReservationListAPI,} from "@/api";
import {dateConverter, encodeNumber} from "@/util/converter";
import useModals from "@/hooks/useModals";
import {AlertPortal, ConfirmPortal, MessagePortal} from "@/components/common";
import {useRecoilValue} from "recoil";
import {memberState} from "@/app/member";
import * as React from "react";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

interface ReservationQueryOption extends QueryOptionType {
    shopId: string;
}

export default function ReservationList() {
    const navigate = useNavigate();
    const location = useLocation();
    const locationSearch = location.search;
    const params = new URLSearchParams(locationSearch);
    const paramsPage = Number(params.get('page'));
    const paramsLimit = Number(params.get('limit'));
    const paramsSort = Number(params.get('sort'));
    const paramsName = params.get('name');
    const scrollTop = () => window.scrollTo(0, 0)
    const member = useRecoilValue(memberState);
    const queryClient = useQueryClient()

    const shopId = member.auth_level ? member.shop : "";

    // 리스트 쿼리옵션
    const [queryOption, setQueryOption] = useState<ReservationQueryOption>({
        page: 1,
        limit: 10,
        sort: 1,
        name: "",
        shopId: shopId
    })

    // 예약 리스트 요청
    const {data: reservationList, isLoading: reservationListIsLoading, isFetching} = useQuery(
        reservationKey.reservationListByOrder(queryOption),
        () => getReservationListAPI(queryOption),
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
            sort: !String(paramsSort).length ? queryOption.sort : paramsSort,
            name: paramsName ?? "",
            shopId: shopId
        })
    }, [location])

    // 검색명
    const [searchName, setSearchName] = useState<string>("");
    const onHandleSearchName = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value)
    }
    // 검색 
    const onSearchPage = () => {
        navigate(`/reservation?page=1&limit=${queryOption.limit}&sort=${queryOption.sort}&name=${searchName}`)
    }
    // 정렬 옵션
    const reserveSortOption = [
        {
            value: 1,
            text: '예약일순',
        },
        {
            value: 0,
            text: '결제일순',
        },
        {
            value: 2,
            text: '승인여부순',
        },
    ]
    const [reserveSortSelect, setReserveSortSelect] = useState<number>(reserveSortOption[0].value);
    const onHandleSort = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        setReserveSortSelect(data.value as number)
    }
    // 정렬 검색
    const onSortPage = () => {
        navigate(`/reservation?page=1&limit=${queryOption.limit}&sort=${reserveSortSelect}&name=${queryOption.name}`)
    }

    // 페이징
    const onChangePage = (e: MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        navigate(`/reservation?page=${data.activePage}&limit=${queryOption.limit}&sort=${queryOption.sort}&name=${queryOption.name}`)
    }

    // 테이블 컬럼명
    const column = ["예약자", "제휴사", "상품명(서비스명)", "결제일", "예약일", "승인여부",] as const;
    // 제휴사 테이블 컬럼명
    const allianceColumn = ["예약자", "상품명(서비스명)", "결제일", "예약일", "승인여부"] as const;
    // 예약 상태
    const reserve_status = ["예약완료", "사용완료", "노쇼취소", "예약취소"] as const;
    // 예약 상태 필터
    const reserveStatusFilter = (status: number) => {
        switch (status) {
            default :
            case 0 :
                return <Label content={reserve_status[0]} basic style={{fontWeight: '300'}}/>
            case 1 :
                return <Label content={reserve_status[1]} color="green" style={{fontWeight: '300'}}/>
            case 4 :
                return <Label content={reserve_status[2]} color="yellow" style={{fontWeight: '300'}}/>
            case 2 :
            case 3 :
                return <Label content={reserve_status[3]} color="red" style={{fontWeight: '300'}}/>
        }
    }


    // 예약 정보 모달
    const {isOpen, handleModal, message, handleMessage} = useModals();
    // 예약 정보 아이디설정
    const [reserveID, setReserveID] = useState<string>("");
    const onChangeReserveID = (value: string) => {
        setReserveID(value)
        handleModal(true)
    }
    // 예약 정보 요청
    const {data: reserveInfo, isLoading: reserveInfoIsLoading, isSuccess: reserveInfoIsSuccess} = useQuery(
        reservationKey.reservationInfo(reserveID),
        () => getReservationAPI(reserveID),
        {
            staleTime: 60 * 1000,
            enabled: !!reserveID.length
        }
    );
    // 예약 정보 요청 이후 모달컨텐츠 데이터 바인딩
    useEffect(() => {
        if (reserveInfo) {
            handleMessage({
                title: "예약 내역 상세",
                content: <ModalContent data={reserveInfo}/>
            })
        }
    }, [reserveInfo])
    // 예약 정보 데이터 초기화
    const reserveDataInit = () => {
        setReserveID("");
        handleMessage({title: null, content: null,})
    }
    // 예약 정보 모달 닫기
    const closeReserveModal = () => {
        reserveDataInit();
        handleModal(false);
    }

    const ModalContent = ({data}: any): JSX.Element => {
        const modalColumn = ["상품명", "상품 옵션명", "결제 방식", "사용한 포인트", "결제금액", "예약 회원", "연락처", "결제일시", "예약 일시", "사용완료 시간", "요청사항", "예약 상태 변경", "취소일", "취소 사유", "환불 금액", "승인 여부"] as const;
        const reserveTypeConverter = (status:number) => {
            switch (status) {
                case 0 :
                    return '인앱결제';
                case 1 :
                    return '현장결제(10,000원)';
                case 2 :
                    return '현장결제(0원)'
                default :
                    return '-'
            }
        };
        return (
            <Table definition size="small">
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[5]}/>
                        <Table.Cell content={data.user_name}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[0]}/>
                        <Table.Cell content={data.service_name}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[1]}/>
                        <Table.Cell content={data.option_name}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[2]}/>
                        <Table.Cell content={reserveTypeConverter(data.purchase_type)}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[6]}/>
                        <Table.Cell content={data.phone}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[7]}/>
                        <Table.Cell content={dateConverter(data.pay_date).fullDateMonth}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[8]}/>
                        <Table.Cell content={
                            data.reserve_date ?
                            data.reserve_date.indexOf('~') > 0 ? data.reserve_date.split('~').map((v:string) =>
                                    dateConverter(new Date(v.trim())).yearMonthDate).join(' ~ ') :
                                dateConverter(data.reserve_date).fullDateMonth :
                            '-'
                        }/>

                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[9]}/>
                        <Table.Cell content={!data.reserve_date_use ? "-" : dateConverter(data.reserve_date_use).fullDateMonth}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[10]}/>
                        <Table.Cell content={data.requirement}/>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={4} content={modalColumn[15]}/>
                        <Table.Cell content={reserveStatusFilter(data.status)}/>
                    </Table.Row>
                    {!!data.status ? null :
                        <Table.Row>
                            <Table.Cell width={4} content={modalColumn[11]}/>
                            <Table.Cell>
                                <Form.Checkbox
                                    label={<label>사용완료</label>}
                                    name="status"
                                    value={1}
                                    // checked={confirmData.status === 1}
                                    // onChange={handleStatus}
                                />
                                <Form.Checkbox
                                    label={<label>예약취소</label>}
                                    name="status"
                                    value={2}
                                    // checked={confirmData.status === 2}
                                    // onChange={handleStatus}
                                />
                            </Table.Cell>
                        </Table.Row>
                    }
                    <Table.Row >
                        <Table.Cell width={4} content={modalColumn[3]}/>
                        <Table.Cell content={!data.use_point ? "0p" : encodeNumber(data.use_point) + "p"}/>
                    </Table.Row>
                    <Table.Row positive>
                        <Table.Cell width={4} content={modalColumn[4]}/>
                        <Table.Cell content={encodeNumber(data.purchase_cost) + "원"}/>
                    </Table.Row>
                    {(data.status === 2 || data.status === 3) ?
                        <>
                            <Table.Row warning>
                                <Table.Cell width={4} content={modalColumn[12]}/>
                                <Table.Cell content={dateConverter(data.cancel_date).fullDateMonth}/>
                            </Table.Row>
                            <Table.Row warning>
                                <Table.Cell width={4} content={modalColumn[13]}/>
                                <Table.Cell content={data.cancel_reason}/>
                            </Table.Row>
                            <Table.Row warning>
                                <Table.Cell width={4} content={modalColumn[14]}/>
                                <Table.Cell content={encodeNumber(data.refund_cost) + "원"}/>
                            </Table.Row>
                        </> : null
                    }
                </Table.Body>
            </Table>
        )
    }

    useEffect(() => {
        if (reserveInfo) {
            console.log(reserveInfo)
        }
        console.log(reserveID)
    }, [reserveID])
    //
    // // 쿠폰 그룹 컨펌 데이터
    // const confirmInitData = {
    //     groupId: "",
    //     status: 0,
    //     reason: '',
    //     deleteStatus: false
    // } as CouponConfirmType;
    // const [confirmData, setConfirmData] = useState(confirmInitData);
    //
    // // 쿠폰그룹 데이터 요청 이후 모달컨텐츠 데이터 바인딩
    // useEffect(() => {
    //     if (couponGroup) {
    //         handleMessage({
    //             title: couponGroup.data.couponName,
    //             content: <ModalContent data={{...couponGroup.data}}/>
    //         })
    //     }
    // }, [couponGroup, confirmData])
    //
    // // 그룹아이디 셀렉 후 컨펌데이터에 바인딩
    // useEffect(() => {
    //     setConfirmData({
    //         ...confirmData,
    //         groupId: couponGroupId
    //     })
    // }, [couponGroup])
    //
    // // 승인 및 반려 컨트롤
    // const handleStatus = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    //     setConfirmData({
    //         ...confirmData,
    //         status: Number(data.value)
    //     });
    // };

    // //  쿠폰 그룹 변경 데이터 초기화
    // const couponGroupDataInit = () => {
    //     setCouponGroupId("");
    //     handleMessage({title: null, content: null,})
    //     setConfirmData(confirmInitData)
    // }
    //
    // // 쿠폰 그룹 모달 닫기
    // const closeGroupModal = () => {
    //     couponGroupDataInit();
    //     handleModal(false);
    // }
    //
    // // 변경 후 메세지
    // const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
    // const [mutateMessage, setMutateMessage] = useState<string>("");

    // // 변경 요청 액션 & 업데이트
    // const {mutate: couponConfirm, isLoading: couponConfirmIsLoading} = useMutation(patchCouponConfirmAPI)
    // const couponGroupAction = () => {
    //     if (!confirmData.status) {
    //         return closeGroupModal()
    //     }
    //     couponConfirm(confirmData, {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries(couponKey.couponListByOrder(queryOption))
    //                 .then(() => queryClient.invalidateQueries(couponKey.couponGroup(couponGroupId))
    //                     .then(() => setMutateMessage('변경에 성공하였습니다.')))
    //         },
    //         onError: (error) => {
    //             console.log('error : ', error)
    //             setMutateMessage('변경에 실패하였습니다.')
    //         },
    //         onSettled: (data) => {
    //             console.log('settled : ', data)
    //             setIsOpenMessage(true)
    //             closeGroupModal()
    //         }
    //     })
    // }


    // // 업데이트 메세지 감시
    // useEffect(() => {
    //     if (isOpenMessage) {
    //         setTimeout(() => {
    //             setIsOpenMessage(false)
    //         }, 2000)
    //     }
    // }, [isOpenMessage])

    return (
        <>
            <Template>
                <Container>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <Header
                            as='h2'
                            content='예약 목록'
                            subheader='Manage your alliance'
                        />

                        <div style={{display: "flex", gap: "1rem"}}>
                            <Input
                                name="searchName"
                                value={searchName}
                                placeholder='쿠폰명 검색'
                                onChange={onHandleSearchName}
                                action={{
                                    icon: 'search',
                                    color: "teal",
                                    loading: reservationListIsLoading,
                                    onClick: onSearchPage
                                }}
                            />
                            <div className="ui action input">
                                <Select
                                    // value={searchData}
                                    options={reserveSortOption}
                                    placeholder='정렬'
                                    onChange={onHandleSort}
                                />
                                <Button
                                    type='button'
                                    loading={reservationListIsLoading}
                                    onClick={onSortPage}
                                    icon='search'
                                    color="teal"
                                />
                            </div>
                        </div>

                    </div>
                    {/* Header End   */}
                    <Loader active={reservationListIsLoading || (isOpen && reserveInfoIsLoading)}
                            size="massive" inline='centered'
                            style={{
                                position: 'fixed',
                                top:'50%',
                                left:'50%',
                                transform:'translate(-50%, -50%)'
                            }}
                    />
                    {reservationList && <>
                        <Table compact celled selectable stackable size='small' style={{margin: "2rem 0"}}>
                            <Table.Header>
                                <Table.Row textAlign="center">
                                    {member.auth_level ?
                                        <>{allianceColumn.map((name, i) =>
                                            <Table.HeaderCell key={i} content={name}/>
                                        )}</> :
                                        <>{column.map((name, i) =>
                                            <Table.HeaderCell key={i} content={name}/>
                                        )}</>
                                    }
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {!reservationList.data.length ?
                                    <Table.Row textAlign="center">
                                        <Table.Cell colSpan={column.length} style={{padding: "80px 0"}}>
                                            <h2>자료가 없습니다.</h2>
                                        </Table.Cell>
                                    </Table.Row>
                                    : <>{reservationList.data.map((row: any, i: number) =>
                                        <Table.Row
                                            key={i}
                                            positive={row.status === 1}
                                            error={row.status === 2 || row.status === 3}
                                            warning={row.status === 4}
                                            style={{cursor: "pointer"}}
                                            onClick={() => onChangeReserveID(row.objectId)}
                                        >
                                            <Table.Cell
                                                width={2}
                                                content={row.receiver_name}
                                            />
                                            {member.auth_level ? null :
                                                <Table.Cell
                                                    width={3}
                                                    content={row.shop.name}
                                                />
                                            }
                                            <Table.Cell
                                                content={row.service.name}
                                            />
                                            <Table.Cell
                                                textAlign="right"
                                                width={3}
                                                content={dateConverter(row.createdAt).fullDateMonth}
                                            />
                                            <Table.Cell
                                                textAlign="right"
                                                width={3}
                                            >
                                                {!row.reserve_end ?
                                                    !row.reserve_date ? "-" :
                                                        dateConverter(row.reserve_date.iso).fullDateMonth :
                                                    <>{dateConverter(row.reserve_date.iso).yearMonthDate}
                                                        <br/>~ {dateConverter(row.reserve_end.iso).yearMonthDate}</>
                                                }
                                            </Table.Cell>
                                            <Table.Cell
                                                width={2}
                                                textAlign="center"
                                                content={reserveStatusFilter(row.status)}/>
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
                                totalPages={reservationList.totalPage}
                                onPageChange={onChangePage}
                            />
                        </div>
                    </>}
                    {/*<Loader*/}
                    {/*    active={false}*/}
                    {/*    size="massive"*/}
                    {/*    inline='centered'*/}
                    {/*    style={{*/}
                    {/*        position: 'fixed',*/}
                    {/*        top:'50%',*/}
                    {/*        left:'50%',*/}
                    {/*        transform:'translate(-50%, -50%)'*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <ConfirmPortal actionHandler={closeReserveModal} message={message} isOpen={isOpen && reserveInfo}
                                   handler={closeReserveModal}/>
                </Container>
            </Template>
        </>
    );
}