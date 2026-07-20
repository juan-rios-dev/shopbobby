import { Client } from "@/infrastructure/models/client.model";
import { QUERY } from "@/domain/interfaces/query.interface";
import { Service } from "@/domain/interfaces/service.interface";
import { Validator } from "@/domain/interfaces/validator.interface";

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
