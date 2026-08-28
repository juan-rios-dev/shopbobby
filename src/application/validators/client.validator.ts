import { Client } from "@/domain/entities/client.entity";
import { Validator } from "@/domain/interfaces/validator.interface";

export class ClientValidator implements Validator<Client> {
    validate(payload: Client): void {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const rules: [boolean, string][] = [
            [Number.isNaN(payload.id), "El ID del cliente no puede estar vacío"],
            [!payload.name.trim(), "El nombre del cliente no puede estar vacío"],
            [!payload.email.trim(), "El email del cliente no puede estar vacío"],
            [!regex.test(payload.email), "El email del cliente no es valido"],
            [!payload.phone.trim(), "El telefóno del cliente no puede estar vacío"],
            [!payload.address.trim(), "La dirección del cliente no puede estar vacío"],
        ];

        for (const [condition, message] of rules) {
            if (condition) throw new Error(message);
        }
    }
}
