import { Sale } from "@/domain/entities/sale.model";
import { CRUD } from "@/domain/interfaces/crud.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Validator } from "@/domain/interfaces/validator.interface";

export class SaleService implements Service<Sale> {
    constructor(
        private saleStore: CRUD<Sale>,
        private validator: Validator<Sale>
    ) { }

    create(payload: Sale): boolean {
        this.validator.validate(payload)
        
        return this.saleStore.create(payload);
    }

    read(): Sale[] {
        return this.saleStore.read();
    }

    delete(id: number): boolean {
        return this.saleStore.delete(id);
    }
}
