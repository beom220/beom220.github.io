import {QueryOptionType} from "@/types/queryString";
import {queryParse} from "@/util/converter";

export const memberKey = {
    user: ['member'] as const,
    info: ['member info'] as const,
}

export const schoolKey = {
    schoolByOrder: (query: QueryOptionType) => ['school', queryParse(query)] as const,
}

export const allianceKey = {
    allianceListByOrder: (query: QueryOptionType) => ['alliance List', queryParse(query)] as const,
    allianceInfo: (id: string) => ['alliance Info', id] as const,
    allianceOption: (id: string) => ['alliance Option', id] as const,
    allianceOptionManage: (id: string) => ['alliance Option Manage', id] as const,
    allianceService: (id: string) => ['alliance Service', id] as const,
    allianceServiceTag: (id: string) => ['alliance Service Tag', id] as const,
    allianceServiceMenu: (id: string) => ['alliance Service Menu', id] as const,
}

export const couponKey = {
    couponListByOrder: (query: QueryOptionType) => ['coupon List', queryParse(query)] as const,
    couponGroup: (id: string) => ['coupon Group', id] as const,
}
