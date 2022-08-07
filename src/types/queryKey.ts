export const queryKeys = {
    products: ['products'] as const,
    productById: (productId: string) => ['product', productId] as const,
};