export type Sale = {
    id: string;
    client_id: number;
    date: string;
    items: SaleItem[];
    total: number;
}

export type SaleItem = {
    id: number;
    sale_id: string;
    product_id: number;
    quantity: number;
    price?: number;
}
