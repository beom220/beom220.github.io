export const queryKeys = {
    products: ['products'] as const,
    productsByCate: (productsCate: string) => ['products', productsCate] as const,
    productById: (productId: string) => ['product', productId] as const,
};