import Template from "@/components/template";
import {
    Button,
    Container,
    Divider,
    Form,
    Header,
    Image,
    Message,
    MessageContent,
    MessageHeader,
    Segment, Select
} from "semantic-ui-react";
import {ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState} from "react";
import {CheckboxProps, InputOnChangeData} from "semantic-ui-react";
import DaumPostcode, {Address} from "react-daum-postcode";
import useModals from "@/hooks/useModals";
import {AlertPortal} from "@/components/common";
import * as React from "react";
import {TextAreaProps} from "semantic-ui-react/dist/commonjs/addons/TextArea/TextArea";
import {allianceSelect} from "@/constants/allianceSelect";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getSchoolsAPI, postCreateAllianceAPI, postEmailCheck} from "@/api";
import {useNavigate} from "react-router";
import {dateConverter} from "@/util/converter";
import {testKeys} from "@/types/queryKey";
import {CreateAllianceType} from "@/types/alliance";

export default function AllianceCreate() {

    const navigate = useNavigate();
    const _thisDate = dateConverter(new Date());
    const initOpenTime = _thisDate.yy + "/" + _thisDate.mm + "/" + _thisDate.dd + " 00:00:00";
    const initCloseTime = _thisDate.yy + "/" + _thisDate.mm + "/" + _thisDate.dd + " 23:59:59";

    const [createData, setCreateData] = useState<CreateAllianceType>({
        status: true,
        open_date: new Date(),
        admin_id: "",
        admin_email: "",
        password: "",
        category: null,
        brand_name: null,
        branch_name: null,
        address: null,
        sub_addresss: null,
        school: [],
        phone: null,
        email: null,
        open_time: new Date(initOpenTime),
        close_time: new Date(initCloseTime),
        facility: null,
        sub_information: ["현재 준비중입니다."],
        benefits: null,
        owner: null,
        business_address: null,
        business_number: null,
        images: [],
        tax_manager: null,
        tax_manager_email: null,
        regular_holiday_day: null,
        regular_holiday_date: null,
        irregular_holiday: null,
        offline_payment_10000: false,
        offline_payment_0: false,
        refund_rule: [0, 0, 0, 0, 0, 0, 0, 0],
        subway_info: ""
    });

    // 프렌차이즈 여부
    const [isBranch, setIsBranch] = useState<boolean>(!!createData.branch_name)
    const handleBranchNameVisible = () => {
        setIsBranch(!isBranch)
    }

    // 인풋 폼데이터 핸들
    const onChangeCreateData = (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setCreateData({
            ...createData,
            [data.name]: data.value
        })
    }

    // 토글 폼데이터 핸들
    const onChangeToggleCreateData = (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        setCreateData({
            ...createData,
            [data.name as string]: data.checked
        })
    }

    // 텍스트에리어 폼데이터 핸들
    const onChangeTextCreateData = (event: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
        setCreateData({
            ...createData,
            [data.name]: data.value
        })
    }

    // 아이디 중복 여부
    const [isAdminIDError, setIsAdminIDError] = useState<boolean>(false);
    const adminIDPattern = /^[a-zA-Z]+[a-zA-Z\d]?/;

    const {
        isOpen: IDCheckIsOpen,
        handleModal:handleIDCheckIsOpen,
        message:IDCheckMessage,
        handleMessage:setIDCheckMessage
    } = useModals();

    // 아이디 중복확인
    const {mutate:IDMutate, isLoading:isIDLoading} = useMutation(postEmailCheck)
    
    const onAdminIDCheck = () => {
        if(!createData.admin_id.trim()){
            handleIDCheckIsOpen(true)
            return setIDCheckMessage({ content : "아이디를 입력해주세요"})
        }
        if(!adminIDPattern.test(createData.admin_id)){
            handleIDCheckIsOpen(true)
            return setIDCheckMessage({ content : "아이디는 영어로 시작해야합니다. 특수문자는 사용할 수 없습니다."})
        }

        const data = { admin_id : createData.admin_id}
        IDMutate(data, {
            onSuccess : (data) => {
                if(data.content === "중복되는 아이디가 있습니다."){
                    // 아이디 인풋에 에러
                    setIsAdminIDError(true)
                } else {
                    setIsAdminIDError(false)
                }
                handleIDCheckIsOpen(true)
                setIDCheckMessage({ content : data.content })
            },
            onError : (error) => {
                console.log(error);
                navigate("/error")
            }
        })
    }

    // 비밀번호 체크
    const [checkPassword, setCheckPassword] = useState<string>("")
    const handleCheckPassword = (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setCheckPassword(data.value)
    }

    // 비밀번호값, 비밀번호 체크값 비교
    const comparePassword = (a :string, b : string) => {
        return a === b
    }

    // 카테고리 선택
    const handleSelectCreateData = (event: SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        setCreateData({
            ...createData,
            category: data.value as string
        })
    }

    // 현장 결제 방식은, 둘다 택되지 않거나 둘중에 하나여야함
    const onChangePayment = (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        if (createData.offline_payment_0 && data.name === "offline_payment_10000" && data.checked) {
            return setCreateData({
                ...createData,
                offline_payment_0: false,
                offline_payment_10000: data.checked
            })
        }
        if (createData.offline_payment_10000 && data.name === "offline_payment_0" && data.checked) {
            return setCreateData({
                ...createData,
                offline_payment_0: data.checked,
                offline_payment_10000: false
            })
        }
        onChangeToggleCreateData(event, data)
    }

    // 환불 규정 핸들
    const onChangeRefundRules = (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let copyRefundRules = [...createData.refund_rule as number[]];

        const {name, value} = data;
        if (isNaN(Number(value))) {
            return alert("숫자만 입력해주세요.")
        }
        if (Number(value) < 0) {
            return alert("0%보다 작을수 없습니다.")
        }
        if (Number(value) > 100) {
            return alert("100%를 초과할 수 없습니다.");
        }
        // @ts-ignore
        copyRefundRules[name] = Number(value);
        setCreateData({
            ...createData,
            refund_rule: copyRefundRules,
        })
    }

    // 이미지파일
    const encodeFileToBase64 = async (fileBlob: Blob) => {
        if (createData.images.length >= 4) {
            return alert("최대 4장까지 가능합니다.")
        }
        const reader = await new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setCreateData({
                    ...createData,
                    images: [...createData.images, reader.result as string]
                })
            };
            return resolve
        });
    };

    // 다음 주소 검색 모달
    const {
        isOpen:addressIsOpen,
        handleModal:handleAddressIsOpen,
        message:addressMessage,
        handleMessage:setAddressMessage
    } = useModals();

    // 다음 주소 검색
    const searchAddress = (data: Address) => {
        const fullAddress = data.address;
        setCreateData({
            ...createData,
            address: fullAddress
        })
        fullAddress ? handleAddressIsOpen(false) : handleAddressIsOpen(true);
    }

    // 다음 주소 검색 모달 트리거
    const handleAddressOpen = () => {
        handleAddressIsOpen(true)
    }

    // 다음 주소 검색 모달 컨텐츠 설정
    useEffect(() => {
        if(addressIsOpen){
            setAddressMessage({
                content:<DaumPostcode onComplete={searchAddress}/>
            })
        }
    }, [addressIsOpen])


    // 대학교 리스트
    const [schoolList, setSchoolList] = useState<{value:string, text:string, key:string}[]>([]);
    // 대학교 리스트 요청 쿼리옵션
    const schoolQueryOption = {
        page: 1,
        limit: 'all',
        sort: 0
    }
    // 대학교 리스트 요청
    const {data: schoolData, isLoading: schoolIsLoading} = useQuery(
        testKeys.schoolByOrder(schoolQueryOption),
        () => getSchoolsAPI(schoolQueryOption),
        {staleTime: 60 * 1000}
    );

    // 대학교 리스트 요청 이후 설정
    useEffect(() => {
        if (schoolData && !schoolList.length) {
            setSchoolList(() => schoolData.data.map((v:any, i: number) => {
                return {key: i, text: v.name, value: v.objectId}
            }))
        }
    }, [schoolData, schoolList])

    // 대학교 선택 핸들
    const handleSelectSchool = (event: SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        setCreateData({
            ...createData,
            school: data.value as string[]
        })
    }

    const {mutate, isLoading} = useMutation(postCreateAllianceAPI)
    const onCreateSubmit =  (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        alert('전송')
        mutate(createData, {
            onSuccess : (data) => {
                alert('성공')
                console.log(data)
            },
            onError : (error) => {
                alert('실패')
                console.log(error);
                // navigate("/error")
            }
        })
    }
    // useEffect(() => {
    //     console.log(createData.school)
    // }, [createData])


    return (
        <Template>
            <Container>
                <Header
                    as="h2"
                    content="신규 제휴사 생성"
                    subheader="Create New Alliance"
                />
                <Form onSubmit={onCreateSubmit}>
                    <Message info>
                        <MessageHeader>제휴사 계정</MessageHeader>
                        <MessageContent>제휴사 계정 정보를 설정 합니다.</MessageContent>
                    </Message>
                    <Segment>
                        <Header
                            as="h3"
                            content="게시여부"
                            subheader="제휴사 게시여부 상태를 설정 합니다."
                        />
                        <Form.Radio
                            toggle
                            onChange={onChangeToggleCreateData}
                            name="status"
                            size="large" label="게시"
                            checked={createData.status}
                        />
                        <Divider/>

                        <Form.Group widths="equal">
                            <Form.Input
                                name="admin_id"
                                required
                                defaultValue={createData.admin_id}
                                onChange={onChangeCreateData}
                                size="large" label="제휴사 계정 아이디"
                                placeholder="제휴사 계정 아이디"
                                action={{
                                    icon: "search",
                                    color: "teal",
                                    type: "button",
                                    loading: isIDLoading,
                                    onClick : onAdminIDCheck,
                                }}
                                error={isAdminIDError ? {
                                    content: "중복되는 아이디가 있습니다."
                                } : false }
                            />
                            <Form.Input
                                name="admin_email"
                                required
                                type="email"
                                defaultValue={createData.admin_email}
                                onChange={onChangeCreateData}
                                size="large" label="제휴사 계정 이메일"
                                placeholder="제휴사 계정 이메일"
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                name="password"
                                required
                                defaultValue={createData.password}
                                onChange={onChangeCreateData}
                                type="password"
                                size="large" label="제휴사 계정 비밀번호"
                                placeholder="제휴사 계정 비밀번호"
                            />
                            <Form.Input
                                name="password"
                                required
                                defaultValue={checkPassword}
                                onChange={handleCheckPassword}
                                type="password"
                                size="large" label="제휴사 계정 비밀번호 체크"
                                placeholder="제휴사 계정 비밀번호 체크"
                                error={
                                    checkPassword && !comparePassword(createData.password, checkPassword) ?
                                    {content: "비밀번호를 확인해주세요.",} : false
                                }
                            />
                        </Form.Group>
                    </Segment>

                    <Message info>
                        <MessageHeader>제휴사 정보</MessageHeader>
                        <MessageContent>제휴사 정보를 설정 합니다.</MessageContent>
                    </Message>
                    <Segment>
                        <Header
                            as="h3"
                            content="제휴사 정보"
                            subheader="제휴사 정보를 설정 합니다."
                        />
                        <Form.Radio
                            toggle
                            onChange={handleBranchNameVisible}
                            size="large" label="프렌차이즈 설정"
                            checked={isBranch}
                        />
                        <Form.Input
                            name="brand_name"
                            defaultValue={createData.brand_name}
                            onChange={onChangeCreateData}
                            disabled={!isBranch}
                            size="large" label="상호명 (프렌차이즈)"
                            placeholder="상호명 (프렌차이즈)"
                            width={8}
                        />
                        <Divider/>
                        <Form.Group widths="equal">
                            <Form.Input
                                name="branch_name"
                                required
                                defaultValue={createData.branch_name}
                                onChange={onChangeCreateData}
                                size="large" label="제휴사 지점명"
                                placeholder="제휴사 지점명"
                            />

                            <Form.Select
                                label="카테고리"
                                name="category"
                                required
                                defaultValue={createData.category as string}
                                options={allianceSelect.filter(v => v.key !== "0")}
                                onChange={handleSelectCreateData}
                                placeholder="카테고리"
                                style={{fontSize:"1.14285714em"}}
                                // onChange={onHandleSelectData}
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                name="phone"
                                required
                                defaultValue={createData.phone}
                                onChange={onChangeCreateData}
                                size="large" label="제휴사 연락처"
                                placeholder="제휴사 연락처"
                            />
                            <Form.Input
                                name="email"
                                type="email"
                                required
                                defaultValue={createData.email}
                                onChange={onChangeCreateData}
                                size="large" label="제휴사 이메일"
                                placeholder="제휴사 이메일"
                            />
                        </Form.Group>
                        <Divider/>
                        <Form.Group widths="equal">
                            <Form.Input
                                name="open_time"
                                required
                                defaultValue={dateConverter(createData.open_time).hourAndTime}
                                onChange={onChangeCreateData}
                                size="large" label="오픈 시간"
                                placeholder="오픈 시간"
                            />
                            <Form.Input
                                name="close_time"
                                required
                                defaultValue={dateConverter(createData.close_time).hourAndTime}
                                onChange={onChangeCreateData}
                                size="large" label="마감 시간"
                                placeholder="마감 시간"
                            />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input
                                name="irregular_holiday"
                                defaultValue={createData.regular_holiday_day}
                                onChange={onChangeCreateData}
                                size="large" label="정기휴무일"
                                placeholder="정기휴무일"
                            />
                            <Form.Input
                                name="irregular_holiday"
                                defaultValue={createData.irregular_holiday}
                                // onClick={handleCalendarOpen}
                                size="large" label="일반휴무일"
                                placeholder="일반휴무일"
                            />
                        </Form.Group>
                        <Divider/>
                        <Form.TextArea
                            name="facility"
                            label="업체내의 편의시설 정보"
                            onChange={onChangeTextCreateData}
                            placeholder="업체내의 편의시설 정보"
                            style={{minHeight: 100}}
                        />
                        <Form.TextArea
                            name="benefits"
                            onChange={onChangeTextCreateData}
                            label="업체 안내 및 혜택"
                            placeholder="업체 안내 및 혜택"
                            style={{minHeight: 100}}
                        />
                        <Form.TextArea
                            name="sub_information"
                            defaultValue={createData.sub_information}
                            onChange={onChangeTextCreateData}
                            label="부가서비스"
                            placeholder="부가서비스"
                            tyle={{minHeight: 100}}
                        />

                        <Divider/>
                        <Header
                            as="h3"
                            content="제휴사 주소 & 주변 학교"
                            subheader="제휴사 주소 & 주변 학교를 설정 합니다."
                        />
                        <Form.Group widths="equal">
                            <Form.Input
                                name="address"
                                required
                                defaultValue={createData.address}
                                // onChange={onChangeCreateData}
                                onClick={handleAddressOpen}
                                size="large" label="기본 주소"
                                placeholder="기본 주소"
                                readOnly
                                action={{
                                    icon: "search",
                                    color: "teal",
                                    onClick : handleAddressOpen,
                                    type:"button"
                                }}

                            />
                            <Form.Input
                                name="sub_addresss"
                                defaultValue={createData.sub_addresss}
                                onChange={onChangeCreateData}
                                size="large" label="상세 주소"
                                placeholder="상세 주소"
                            />
                        </Form.Group>
                        <Form.Group widths="equal">

                            <Form.Dropdown
                                label="주변 학교"
                                name="school"
                                multiple selection closeOnChange search
                                options={schoolList}
                                onChange={handleSelectSchool}
                                placeholder="주변 학교"
                                loading={schoolIsLoading}
                                style={{fontSize:"1.14285714em"}}
                            />
                            <Form.Input
                                name="subway_info"
                                defaultValue={createData.subway_info}
                                onChange={onChangeCreateData}
                                size="large" label="주소 설명"
                                placeholder="주소를 설명해주세요"
                            />
                        </Form.Group>

                        <Divider/>
                        <Header
                            as="h3"
                            content="제휴사 대표 이미지"
                            subheader="제휴사 대표 이미지를 설정 합니다."
                        />
                        <Message info>
                            <MessageContent>제휴사 대표 이미지는 최대 4장까지 가능합니다.</MessageContent>
                        </Message>
                        <Button positive type="button" disabled={createData.images.length >= 4}>
                            <label htmlFor="file" style={{cursor: "pointer"}}>파일첨부</label>
                            <input type="file"
                                   hidden={true}
                                   id="file"
                                   className="file"
                                   accept="image/*"
                                   onChange={async (e) => {
                                       if (e.target.files) {
                                           await encodeFileToBase64(e.target.files[0])
                                       }
                                   }}
                            />
                        </Button>
                        {createData.images.length ?
                            <Image.Group style={{marginTop: "1rem"}}>
                                {createData.images?.map((v, i) => (
                                    <Image
                                        key={i}
                                        src={v}
                                        style={{verticalAlign: "top"}}
                                        size="small"
                                        label={{
                                            as: "span",
                                            positive: "true",
                                            corner: true,
                                            position: "top right",
                                            icon: "remove",
                                            style: {cursor: "pointer"},
                                            onClick: () => setCreateData({
                                                ...createData,
                                                images : createData.images.filter(img => img !== v)
                                            })
                                        }}
                                    />
                                ))}
                            </Image.Group> : null
                        }
                    </Segment>

                    <Message info>
                        <MessageHeader>업체 정보</MessageHeader>
                        <MessageContent>업체정보를 설정 합니다.</MessageContent>
                    </Message>
                    <Segment>
                        <Header
                            as="h3"
                            content="제휴 업체"
                            subheader="제휴 업체 정보를 설정 합니다."
                        />
                        <Form.Input
                            name="owner"
                            required
                            defaultValue={createData.owner}
                            onChange={onChangeCreateData}
                            size="large" label="대표자명"
                            placeholder="대표자명"
                            width={8}
                        />
                        <Form.Group widths="equal">
                            <Form.Input
                                name="business_number"
                                required
                                defaultValue={createData.business_number}
                                onChange={onChangeCreateData}
                                size="large" label="사업자 등록 번호"
                                placeholder="사업자 등록 번호"
                            />
                            <Form.Input
                                name="business_address"
                                required
                                defaultValue={createData.business_address}
                                onChange={onChangeCreateData}
                                size="large" label="사업자 주소"
                                placeholder="사업자 주소"
                            />
                        </Form.Group>
                    </Segment>

                    <Message info>
                        <MessageHeader>결제 정보</MessageHeader>
                        <MessageContent>결제정보를 설정 합니다.</MessageContent>
                    </Message>

                    <Segment>
                        <Header
                            as="h3"
                            content="결제 정보"
                            subheader="결제 정보를 설정 합니다."
                        />
                        <Message positive>
                            <MessageContent>현장 결제 방식은, 선택하지 않거나 둘중에 하나를 택할 수 있습니다.</MessageContent>
                        </Message>
                        <Form.Checkbox
                            label={<label>현장결제 (예약금 0원)</label>}
                            name="offline_payment_0"
                            checked={createData.offline_payment_0}
                            onChange={onChangePayment}
                        />
                        <Form.Checkbox
                            label={<label>현장결제 (예약금 10,000원)</label>}
                            name="offline_payment_10000"
                            checked={createData.offline_payment_10000}
                            onChange={onChangePayment}
                        />
                        <Divider/>
                        <Header
                            as="h3"
                            content="환불 규정"
                            subheader="환불 규정 (차감율)을 설정 합니다."
                        />
                        <Form.Group>
                            {createData.refund_rule?.map((v, i) =>
                                (<Form.Input
                                    size="small"
                                    icon="percent"
                                    value={v}
                                    onChange={onChangeRefundRules}
                                    key={i}
                                    name={i}
                                    label={!i ? "당일 / 노쇼" : i + " 일전"}
                                    placeholder={!i ? "당일 / 노쇼" : i + " 일전"}
                                    width={3}
                                />)
                            )}
                        </Form.Group>

                        <Divider/>
                        <Header
                            as="h3"
                            content="세금 계산서"
                            subheader="세금 계산서 담당자를 설정 합니다."
                        />
                        <Form.Group widths="equal">
                            <Form.Input
                                name="tax_manager"
                                required
                                defaultValue={createData.tax_manager}
                                onChange={onChangeCreateData}
                                size="large" label="세금계산서 담당자"
                                placeholder="세금계산서 담당자"
                            />
                            <Form.Input
                                name="tax_manager_email"
                                required
                                type="email"
                                defaultValue={createData.tax_manager_email}
                                onChange={onChangeCreateData}
                                size="large" label="세금계산서 담당자 이메일"
                                placeholder="세금계산서 담당자 이메일"
                            />
                        </Form.Group>
                    </Segment>

                    <Segment style={{textAlign:"center", marginTop:"4rem"}}>
                        <Button positive type="submit" fluid size="large" loading={isLoading}>제휴사 생성</Button>
                    </Segment>
                </Form>
            </Container>

            {addressIsOpen &&
                <AlertPortal message={addressMessage} isOpen={addressIsOpen} handler={() => handleAddressIsOpen(false)}/>
            }
            {IDCheckIsOpen &&
                <AlertPortal message={IDCheckMessage} isOpen={IDCheckIsOpen} handler={() => handleIDCheckIsOpen(false)}/>
            }
        </Template>
    );
}