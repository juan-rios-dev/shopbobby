import { GeneratorId } from "@/domain/interfaces/generator-id.interface";

export class CryptoGenerator implements GeneratorId {
    generate(): string {
        return crypto.randomUUID();
    }
}
