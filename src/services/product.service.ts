import { CRUD } from "../interfaces/crud.interface";
import { Product } from "../models/product.model";

export class productService {
    constructor(
        private productStore: CRUD<Product>
    ) { }

    createProduct(payload: Product): boolean {
        const product: Product = payload;
        return this.productStore.create(product);
    }

    readProduct(): Array<Product> {
        const products = this.productStore.read();
        return products;
    }

    deleteProduct(id: number): boolean {
        return this.productStore.delete(id);
    }
}
