export const queryKeys = {
    products: ['products'] as const,
    products_topics: ['products_topics'] as const,
    productsByCate: (productsCate: string) => ['products', productsCate] as const,
    productById: (productId: string) => ['product', productId] as const,
};


export const testKeys = {
    user: ['user'] as const,
    info: ['info'] as const,

    allianceByOrder : (order: object) => ['alliance', Object.entries(order).map(v => v.join('=')).join('&')] as const,
    allianceInfo : (id: string) => ['alliance Info', id] as const,
    allianceOption : (id: string) => ['alliance Option', id] as const,
    allianceOptionManage : (id: string) => ['alliance Option Manage', id] as const,
    allianceService : (id: string) => ['alliance Service', id] as const,
    allianceServiceTag : (id: string) => ['alliance ServiceTag', id] as const,
    allianceServiceMenu : (id: string) => ['alliance ServiceMenu', id] as const,
}