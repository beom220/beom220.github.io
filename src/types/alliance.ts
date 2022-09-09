export type CreateAllianceType = {
    status: boolean
    open_date: Date
    admin_id: string
    admin_email: string
    password: string
    category: string | null
    brand_name: string | null
    branch_name: string | null
    address: string | null
    sub_addresss: string | null
    school: string[]
    phone: string | null
    email: string | null
    open_time: Date
    close_time: Date
    facility: string | null
    sub_information: string[]
    benefits: string | null
    owner: string | null
    business_address: string | null
    business_number: string | null
    images: string[]
    tax_manager: string | null
    tax_manager_email: string | null
    regular_holiday_day: number[] | null
    regular_holiday_date: number[] | null
    irregular_holiday: Date[] | null
    offline_payment_10000: boolean
    offline_payment_0: boolean
    refund_rule: number[] | null | undefined
    subway_info: string
}