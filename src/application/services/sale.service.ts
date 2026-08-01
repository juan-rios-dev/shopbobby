import { Product } from "@/domain/entities/product.entity";
import { Sale } from "@/domain/entities/sale.entity";
import { ICalculator } from "@/domain/interfaces/calculator.interface";
import { CRUD } from "@/domain/interfaces/crud.interface";
import { GeneratorId } from "@/domain/interfaces/generator-id.interface";
import { QUERY } from "@/domain/interfaces/query.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Validator } from "@/domain/interfaces/validator.interface";

export class SaleService implements Service<Sale> {
    constructor(
        private saleStore: CRUD<Sale>,
        private productStore: QUERY<Product>,
        private validator: Validator<Sale>,
        private generateId: GeneratorId,
        private calculatorTotal: ICalculator<Sale>
    ) { }

    create(payload: Sale): boolean {
        const uuid = this.generateId.generate();
        payload.id = uuid;
        payload.items.forEach(item => {
            item.sale_id = uuid
            item.price = this.productStore.find(item.product_id)?.price || 0;
        })

        payload.total = this.calculatorTotal.total(payload);

        this.validator.validate(payload)

        const result = this.saleStore.create(payload);

        if (result) {
            payload.items.forEach(item => {
                const product = this.productStore.find(item.product_id);

                if (product) {
                    product.stock -= item.quantity;
                    this.productStore.update(product.id, product);
                }
            });
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
