import { CRUD } from "../interfaces/crud.interface";
import { QUERY } from "../interfaces/query.interface";
import { Client } from "../models/client.model";
import { Product } from "../models/product.model";
import { Sale, SaleItem } from "../models/sale.model";

type Response = {
    status: boolean;
    message: string;
}

export class SaleService {
    constructor(
        private clientStore: QUERY<Client>,
        private productStore: QUERY<Product>,
        private saleStore: CRUD<Sale>
    ) { }

    createSale(payload: Sale): Response {
        let result = { status: true, message: "" };
        const client = this.clientStore.find(payload.client_id);

        if (!client) {
            result = { status: false, message: "Client not found" }
        }

        const items: SaleItem[] = [];

        payload.items.map(item => {
            const product = this.productStore.find(item.product_id);

            if (!product) {
                result = { status: false, message: "Product not found" }
            } else {
                items.push({
                    id: item.id,
                    sale_id: payload.id,
                    product_id: product.id,
                    quantity: item.quantity,
                    price: product.price
                })
            }
        })

        if (result.status === true) {
            const sale: Sale = { id: payload.id, client_id: client!.id, date: payload.date, items: items }
            this.saleStore.create(sale);
            result = { status: true, message: "Sale created" }
        }

        return result;
    }

    readSale(): Sale[] {
        return this.saleStore.read();
    }

    deleteSale(id: number): void {
        this.saleStore.delete(id);
    }
}
