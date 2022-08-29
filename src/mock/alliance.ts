interface Alliance {
    objectId: string;
    open_time: Date;
    brand_name: string | null;
    open_data: Date;
    facility: string;
    refund_rule: Array<number>;
    delete_status: boolean;
    business_number: string;
    review_count: number;
    branch_name: string;
    rating_sum: number;
    name: string;
    irregular_holiday: Array<Date> | null;
    reserve_count: number;
    phone: string;
    upDatedAt: Date;
    views: number;
    admin: string;
    regular_holiday_day: Array<number> | null;
    status: boolean;
    owner: string;
    close_time: Date;
    address: string;
    category: string;
    subway_info: string;
    category_list: Array<string> | null;
    sub_address?: string;
    images?: Array<string>;
    benefit?:string;
}

const alliance = [
    {
        objectId: 'EZ1388vqmU',
        open_time: new Date('19 Aug 2022 00:00:00'),
        brand_name: null,
        open_data: new Date('19 Aug 2022 01:33:49'),
        facility: '주차 | 인터넷 | 엘레베이터',
        refund_rule: [100, 90, 80, 70, 60, 50, 40, 0],
        delete_status: false,
        business_number: '012301249872389',
        review_count: 0,
        branch_name: '독산커피',
        rating_sum: 24,
        name: '독산커피',
        irregular_holiday: null,
        reserve_count: 0,
        phone: '01012341234',
        upDatedAt: new Date('24 Aug 2022 01:11:47'),
        views: 0,
        admin: '631Dlk60ta',
        regular_holiday_day: null,
        status: true,
        owner: '이커피',
        close_time: new Date('5 Aug 2022 11:00:00'),
        address: '서울 금천구 독산동 291-1',
        category: '음식점',
        category_list: ["커피", "쥬스"],
        sub_address: 'SK V1 AP타워 611호, Geumcheon District, South Korea',
        benefit:'학생 10% 할인, 엔퍼센트 예약시 추가 10% 할인 적용',
        images: ["https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/e3f213a9b3e022d3a8428b27c63af9db_image.png"]
    },
    {
        objectId: 'q9RxVZF8SG',
        open_time: new Date('1 Aug 2022 10:00:00'),
        close_time: new Date('5 Aug 2022 20:00:00'),
        brand_name: null,
        open_data: new Date('1 Aug 2022 09:21:26'),
        facility: '약국 | 편의점 | 은행',
        refund_rule: [0, 5, 10, 15, 20, 100, 100, 100],
        delete_status: false,
        business_number: '012301249872389',
        review_count: 0,
        branch_name: '독산헤어커커',
        rating_sum: 24,
        name: '독산헤어커커',
        irregular_holiday: null,
        reserve_count: 0,
        phone: '01012341234',
        upDatedAt: new Date('24 Aug 2022 01:11:47'),
        views: 0,
        admin: 'QWKCWnWFVS',
        regular_holiday_day: [0, 6],
        status: true,
        owner: '이헤어',
        address: '서울 금천구 가산동 345-9',
        category: '미용',
        category_list: ["디자이너"],
        benefit:'엔퍼센트 예약 후 방문 시 방문 기념품 지급',
        images: ["https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/409062bc229e2ed56e620a9fd0af63d2_image.png", "https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/dcc07a1085102ec445209d7227ebccfd_image.png", "https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/5c1026ad2bb61c0a5e8be788aec17100_image.png"]
    },
    {
        objectId: 'Iwe3r03z2a',
        open_time: new Date('11 Aug 2022 00:00:00'),
        close_time: new Date('11 Aug 2022 00:00:00'),
        brand_name: null,
        open_data: new Date('12 Aug 2022 08:11:28'),
        facility: '약국 | 편의점 | 은행',
        refund_rule: [100, 90, 80, 70, 60, 50, 40, 0],
        delete_status: false,
        business_number: '1231234444',
        review_count: 0,
        branch_name: '독산시티호텔',
        rating_sum: 24,
        name: '독산시티호텔',
        irregular_holiday: null,
        reserve_count: 0,
        phone: '01012341234',
        upDatedAt: new Date('24 Aug 2022 01:11:47'),
        views: 0,
        admin: '59yYmBx3w0',
        regular_holiday_day: [],
        status: true,
        owner: '이독산',
        address: '서울 금천구 가산동 345-9',
        category: '숙박',
        sub_address: '1층',
        category_list: ["기본"],
        images: ["https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/8fce547a036b5bef5b6ebb587bc1aec7_image.png", "https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/d62c6aed40288007c71306f55751a8fa_image.png"]
    },
    {
        objectId: 'D4kPCEYMAW',
        open_time: new Date('5 Aug 2022 17:00:00'),
        close_time: new Date('3 July 2022 02:00:00'),
        brand_name: null,
        open_data: new Date('1 Aug 2022 09:21:26'),
        facility: '주차, 발렛파킹, 방문접수/출장, 예약, 무선 인터넷, 남/녀 화장실 구분, 장애인 편의시설, 국민지원금 ',
        refund_rule: [100,90,80,70,60,50,40,0],
        delete_status: false,
        business_number: '1231234444',
        review_count: 0,
        branch_name: '강남점',
        rating_sum: 24,
        name: '독산갈비',
        irregular_holiday: ["2022-07-15","2022-07-17"],
        reserve_count: 0,
        phone: '01012341234',
        upDatedAt: new Date('1 Aug 2022 09:21:26'),
        views: 0,
        admin: 'iYmYOkFgXp',
        regular_holiday_day: [1,5],
        status: true,
        owner: '왕갈비',
        address: '서울 금천구 가산디지털1로 2',
        sub_address:'독산역 2번 출구',
        category: '음식점',
        category_list: ["기본"],
        images:["https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/f9f56b710bac8376c37bdfb7953d7611_image.png","https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/5c7a21458630d6bc32fec8c8c5f81767_image.png"]
    },
    {
        objectId: 'sR3ATyLk1r',
        open_time: new Date('1 Aug 2022 01:00:00'),
        brand_name: null,
        open_data: new Date('1 Aug 2022 09:21:26'),
        facility: '주차, 발렛파킹, 방문접수/출장, 예약, 무선 인터넷, 남/녀 화장실 구분, 장애인 편의시설, 국민지원금 ',
        refund_rule: [0, 5, 10, 15, 20, 100, 100, 100],
        delete_status: false,
        business_number: '1231234444',
        review_count: 0,
        branch_name: '강남점',
        rating_sum: 24,
        name: '이젠아카데미컴퓨터학원 강남점',
        irregular_holiday: null,
        reserve_count: 0,
        phone: '01012341234',
        upDatedAt: new Date('24 Aug 2022 01:11:47'),
        views: 0,
        admin: 'iYmYOkFgXp',
        regular_holiday_day: [0, 6],
        status: true,
        owner: '윤이젠',
        close_time: new Date('5 Aug 2022 11:00:00'),
        address: '서울 서초구 서초대로77길 54',
        category: '교육',
        category_list: ["기본"]
    },
    {
        objectId: '2XF1IfAVqP',
        open_time: new Date('1 Aug 2022 01:00:00'),
        brand_name: null,
        open_data: new Date('Fri Feb 25 2022 19:37:17 GMT+0900 (Korean Standard Time)'),
        refund_rule: [0, 0, 0, 0, 0, 0, 0, 0],
        delete_status: false,
        business_number: '1231234444',
        review_count: 0,
        branch_name: '234-567-09876',
        rating_sum: 18,
        name: '준오헤어 홍대2호점',
        irregular_holiday: null,
        reserve_count: 0,
        phone: '01012341234',
        upDatedAt: new Date('24 Aug 2022 01:11:47'),
        views: 0,
        admin: 'Emz7jEtttI',
        regular_holiday_day: [0, 6],
        status: true,
        owner: '김준오',
        close_time: new Date('5 Aug 2022 11:00:00'),
        address: '서울 서초구 서초대로77길 54',
        category: '미용',
        category_list: ["파마", "일반펌", "염색", "컷", "열펌"]
    },
    // {
    //     objectId: 'AA3PpOSEDa',
    //     open_time: new Date('Thu Feb 10 2022 09:00:00 GMT+0900 (Korean Standard Time)'),
    //     brand_name: '준오헤어',
    //     open_data: new Date('Fri Feb 25 2022 19:37:17 GMT+0900 (Korean Standard Time)'),
    //     refund_rule: [0, 0, 0, 0, 0, 0, 0, 0],
    //     delete_status: false,
    //     business_number: '1231234444',
    //     review_count: 0,
    //     branch_name: '234-567-09876',
    //     rating_sum: 18,
    //     name: '준오헤어 강남점',
    //     irregular_holiday: null,
    //     reserve_count: 0,
    //     phone: '01012341234',
    //     upDatedAt: new Date('Mon Jul 18 2022 10:16:07 GMT+0900 (Korean Standard Time)'),
    //     views: 0,
    //     admin: 'bluJx0bbFt',
    //     regular_holiday_day: [0, 6],
    //     status: true,
    //     owner: '김준오',
    //     close_time: new Date('5 Aug 2022 11:00:00'),
    //     address: '서울특별시 강남구 테헤란로 101',
    //     sub_address: '중산빌딩2층 준오헤어',
    //     category: '미용',
    //     category_list: ["펌", "미용"],
    //     images: ["https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/409062bc229e2ed56e620a9fd0af63d2_image.png", "https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/dcc07a1085102ec445209d7227ebccfd_image.png", "https://lime-abm-dev.s3.ap-northeast-2.amazonaws.com/5c1026ad2bb61c0a5e8be788aec17100_image.png"]
    // },
    // {
    //     objectId: 'XrIbCraBrP',
    //     open_time: new Date('Fri Feb 25 2022 11:00:00 GMT+0900 (Korean Standard Time)'),
    //     brand_name: '비앤헤어',
    //     open_data: new Date('Fri Feb 25 2022 19:37:17 GMT+0900 (Korean Standard Time)'),
    //     refund_rule: [0, 0, 0, 0, 0, 0, 0, 0],
    //     delete_status: false,
    //     business_number: '456-098-456732',
    //     review_count: 0,
    //     branch_name: '234-567-09876',
    //     rating_sum: 18,
    //     name: 'BBQ 홍대역점',
    //     irregular_holiday: ["2022-08-05", "2022-08-21"],
    //     reserve_count: 0,
    //     phone: '01012341234',
    //     upDatedAt: new Date('26 Aug 2022 08:02:51'),
    //     views: 0,
    //     admin: 'H2pUY8FzLO',
    //     regular_holiday_day: [0, 6],
    //     status: false,
    //     owner: '윙치킨',
    //     close_time: new Date('5 Aug 2022 11:00:00'),
    //     address: '서울 마포구 연희로 3',
    //     category: '음식점',
    //     category_list: ["기본"]
    // },
] as Alliance[];

export default alliance;