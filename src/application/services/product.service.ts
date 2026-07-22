import { Product } from "@/domain/entities/product.model";
import { CRUD } from "@/domain/interfaces/crud.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Validator } from "@/domain/interfaces/validator.interface";

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
