import { CRUD } from "../interfaces/crud.interface";
import { ServicePort } from "../interfaces/service.interface";
import { Client } from "../models/client.model";
import { Product } from "../models/product.model";
import { Sale, SaleItem } from "../models/sale.model";

export class SaleService implements ServicePort<Sale> {
    constructor(
        private clientUse: ServicePort<Client>,
        private productUse: ServicePort<Product>,
        private saleStore: CRUD<Sale>
    ) { }

    create(payload: Sale): boolean {
        let result = true;
        const client = this.clientUse.read().find(client => client.id === payload.client_id);

        if (!client) {
            result = false
        }

        const items: SaleItem[] = [];

        payload.items.map(item => {
            const product = this.productUse.read().find(product => product.id === item.product_id);

            if (!product) {
                result = false
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

        if (result === true) {
            const sale: Sale = { id: payload.id, client_id: client!.id, date: payload.date, items: items }
            this.saleStore.create(sale);
            result = true
        }

        return result;
    }

    read(): Sale[] {
        return this.saleStore.read();
    }

    delete(id: number): boolean {
        return this.saleStore.delete(id);
    }
}
