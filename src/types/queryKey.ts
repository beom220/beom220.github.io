export const testKeys = {
    user: ['user'] as const,
    info: ['info'] as const,
}

export const schoolKey = {
    schoolByOrder : (order: object) => ['school', Object.entries(order).map(v => v.join('=')).join('&')] as const,
}

export const allianceKey = {
    allianceByOrder : (order: object) => ['alliance', Object.entries(order).map(v => v.join('=')).join('&')] as const,
    allianceInfo : (id: string) => ['alliance Info', id] as const,
    allianceOption : (id: string) => ['alliance Option', id] as const,
    allianceOptionManage : (id: string) => ['alliance Option Manage', id] as const,
    allianceService : (id: string) => ['alliance Service', id] as const,
    allianceServiceTag : (id: string) => ['alliance ServiceTag', id] as const,
    allianceServiceMenu : (id: string) => ['alliance ServiceMenu', id] as const,
}
