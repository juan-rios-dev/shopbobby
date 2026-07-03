import { Client } from "../models/client.model";
import { QUERY } from "../interfaces/query.interface";

export class clientService {
    constructor(
        private clientStore: QUERY<Client>,
    ) { }

    createClient(payload: Client): void {
        const client: Client = payload;
        this.clientStore.create(client);
    }

    readClient(): Array<Client> {
        const clients = this.clientStore.read();
        console.log(clients)
        return clients;
    }

    deleteClient(id: number): void {
        this.clientStore.delete(id);
    }
}
