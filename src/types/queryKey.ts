export const queryKeys = {
    teams: ['teams'] as const,
    products: ['products'] as const,
    products_topics: ['products_topics'] as const,
    productsByCate: (productsCate: string) => ['products', productsCate] as const,
    productById: (productId: string) => ['product', productId] as const,
};

export const testKeys = {
    user : ['user'] as const,
    info : ['info'] as const,
}