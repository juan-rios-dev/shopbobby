import { Client } from "@/domain/entities/client.entity";
import { Product } from "@/domain/entities/product.entity";
import { Sale } from "@/domain/entities/sale.entity";
import { QUERY } from "@/domain/types/query.type";
import { Validator } from "@/domain/types/validator.type";

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
