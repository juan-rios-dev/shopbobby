import { Client } from "../models/client.model";
import { QUERY } from "../interfaces/query.interface";
import { ServicePort } from "../interfaces/service.interface";
import { Validator } from "../interfaces/validator.interface";

export class ClientService implements ServicePort<Client> {
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
