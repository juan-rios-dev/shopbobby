import { Product } from "@/domain/entities/product.model";
import { Validator } from "@/domain/interfaces/validator.interface";

export class ProductValidator implements Validator<Product> {
    validate(payload: Product): void {
        const rules: [boolean, string][] = [
            [!payload.name.trim(), "El nombre del producto no puede estar vacío"],
            [payload.price < 0, "El precio del producto no puede ser menor a 0"],
            [payload.stock < 0, "La cantidad del producto no puede ser menor a 0"],
        ];

        for (const [condition, message] of rules) {
            if (condition) throw new Error(message);
        }
    }
}
