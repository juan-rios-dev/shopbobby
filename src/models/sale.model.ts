export type Sale = {
    id: number;
    client_id: number;
    date: string;
    items: SaleItem[];
}

export type SaleItem = {
    id: number;
    sale_id: number;
    product_id: number;
    quantity: number;
    price: number;
}