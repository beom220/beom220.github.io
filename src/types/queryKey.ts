export const queryKeys = {
    products: ['products'] as const,
    products_topics: ['products_topics'] as const,
    productsByCate: (productsCate: string) => ['products', productsCate] as const,
    productById: (productId: string) => ['product', productId] as const,
};