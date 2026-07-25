import { Product } from "@/domain/entities/product.entity";
import { CRUD } from "@/domain/types/crud.type";
import { Service } from "@/domain/types/service.type";
import { Validator } from "@/domain/types/validator.type";

export class ProductService implements Service<Product> {
    constructor(
        private productStore: CRUD<Product>,
        private validator: Validator<Product>
    ) { }

    create(payload: Product): boolean {
        this.validator.validate(payload);
        return this.productStore.create(payload);
    }

    read(): Array<Product> {
        const products = this.productStore.read();
        return products;
    }

    delete(id: number): boolean {
        return this.productStore.delete(id);
    }
}
