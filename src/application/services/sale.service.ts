import { Product } from "@/domain/entities/product.entity";
import { Sale } from "@/domain/entities/sale.entity";
import { CRUD } from "@/domain/interfaces/crud.interface";
import { QUERY } from "@/domain/interfaces/query.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Validator } from "@/domain/interfaces/validator.interface";

export class SaleService implements Service<Sale> {
    constructor(
        private saleStore: CRUD<Sale>,
        private productStore: QUERY<Product>,
        private validator: Validator<Sale>
    ) { }

    create(payload: Sale): boolean {
        this.validator.validate(payload)

        payload.items.forEach(item => {
            const product = this.productStore.find(item.product_id);

            if (product) {
                product.stock -= item.quantity;
                this.productStore.update(product.id, product);
            }
        });
        
        return this.saleStore.create(payload);
    }

    read(): Sale[] {
        return this.saleStore.read();
    }

    delete(id: number): boolean {
        return this.saleStore.delete(id);
    }
}
