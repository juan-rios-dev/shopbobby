import { Sale } from "@/domain/entities/sale.entity";
import { CRUD } from "@/domain/types/crud.type";
import { Service } from "@/domain/types/service.type";
import { Validator } from "@/domain/types/validator.type";

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
