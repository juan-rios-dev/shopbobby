import { Sale } from "@/domain/entities/sale.entity";
import { ICalculator } from "@/domain/interfaces/calculator.interface";

export class CalculatorTotal implements ICalculator<Sale> {
    total(payload: Sale): number {
        let total = 0
        payload.items.forEach(item => {
            total += (item.price ?? 0) * item.quantity
        })
        return total;
    }
}
