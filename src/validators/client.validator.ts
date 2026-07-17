import { Client } from "../models/client.model";
import { Validator } from "../interfaces/validator.interface";

export class ClientValidator implements Validator<Client> {
    validate(payload: Client): void {
        const rules: [boolean, string][] = [
            [!payload.name?.trim(), "El nombre del cliente no puede estar vacío"],
            [!payload.email?.trim(), "El email del cliente no puede estar vacío"],
        ];

        for (const [condition, message] of rules) {
            if (condition) throw new Error(message);
        }
    }
}
