export const publicMenuList = (shop:string) => [
    {
        href: "/alliance/info/" + shop,
        title: "제휴사 관리",
    },
    {
        href: "/coupon?page=1&sort=0",
        title: "쿠폰 관리",
    },
]

export const privateMenuList = [
    {
        href: "/alliance",
        title: "제휴사 관리",
    },
    {
        href: "/coupon?page=1&sort=0",
        title: "쿠폰 관리",
    },
]