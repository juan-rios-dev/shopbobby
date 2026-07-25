
import { Client } from "@/domain/entities/client.entity";
import { QUERY } from "@/domain/types/query.type";
import { Service } from "@/domain/types/service.type";
import { Validator } from "@/domain/types/validator.type";

export class ClientService implements Service<Client> {
    constructor(
        private clientStore: QUERY<Client>,
        private validator: Validator<Client>
    ) { }

    create(payload: Client): boolean {
        this.validator.validate(payload);
        return this.clientStore.create(payload);
    }

    read(): Array<Client> {
        const clients = this.clientStore.read();
        return clients;
    }

    delete(id: number): boolean {
        return this.clientStore.delete(id);
    }
}
