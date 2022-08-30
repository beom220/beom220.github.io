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
    allianceInfo : (id: string) => ['allianceInfo', id] as const,
    allianceService : (id: string) => ['allianceService', id] as const,
}