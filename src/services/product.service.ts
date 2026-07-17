import { CRUD } from "../interfaces/crud.interface";
import { ServicePort } from "../interfaces/service.interface";
import { Product } from "../models/product.model";

export class ProductService implements ServicePort<Product> {
    constructor(
        private productStore: CRUD<Product>
    ) { }

    create(payload: Product): boolean {
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
