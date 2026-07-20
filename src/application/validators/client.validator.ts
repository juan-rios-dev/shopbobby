import { Client } from "@/infrastructure/models/client.model";
import { Validator } from "@/domain/interfaces/validator.interface";

export class ClientValidator implements Validator<Client> {
    validate(payload: Client): void {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const rules: [boolean, string][] = [
            [!payload.name.trim(), "El nombre del cliente no puede estar vacío"],
            [!payload.email.trim(), "El email del cliente no puede estar vacío"],
            [!regex.test(payload.email), "El email del cliente no es valido"],
        ];

        for (const [condition, message] of rules) {
            if (condition) throw new Error(message);
        }
    }
}
