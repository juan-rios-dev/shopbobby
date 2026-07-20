import { QUERY } from "@/domain/interfaces/query.interface";
import { Validator } from "@/domain/interfaces/validator.interface";
import { Client } from "@/infrastructure/models/client.model";
import { Product } from "@/infrastructure/models/product.model";
import { Sale } from "@/infrastructure/models/sale.model";

export class SaleValidator implements Validator<Sale> {
    constructor(
        private clientStore: QUERY<Client>,
        private productStore: QUERY<Product>
    ) { }
    validate(payload: Sale): void {
        const rules: [boolean, string][] = [
            [!payload.client_id, "El cliente es requerido"],
            [!payload.items?.length, "Debe tener al menos un producto"],
        ];

        for (const [condition, message] of rules) {
            if (condition) throw new Error(message);
        }

        const client = this.clientStore.find(payload.client_id);
        if (!client) throw new Error("Cliente no existe");

        payload.items.forEach(item => {
            const product = this.productStore.find(item.product_id);

            if (!product) {
                throw new Error(`Producto ${item.product_id} no existe`);
            }

            if (product.stock < item.quantity) {
                throw new Error(
                    `Stock insuficiente para ${product.name}. ` +
                    `Disponible: ${product.stock}, Solicitado: ${item.quantity}`
                );
            }
        });
    }
}
