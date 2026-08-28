import { Product } from "@/domain/entities/product.entity";
import { Validator } from "@/domain/interfaces/validator.interface";

export class ProductValidator implements Validator<Product> {
    validate(payload: Product): void {
        const rules: [boolean, string][] = [
            [!payload.id || payload.id === 0, "El ID del producto no puede estar vacío"],
            [!payload.name.trim(), "El nombre del producto no puede estar vacío"],
            [payload.price === null || Number.isNaN(payload.price), "El precio del producto no puede estar vacío"],
            [payload.price < 0, "El precio del producto no puede ser menor a 0"],
            [!payload.stock || payload.stock === 0, "La cantidad del producto no puede estar vacío"],
            [payload.stock < 0, "La cantidad del producto no puede ser menor a 0"],
        ];

        for (const [condition, message] of rules) {
            if (condition) throw new Error(message);
        }
    }
}
