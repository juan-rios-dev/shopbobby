import { readFileSync, writeFileSync, existsSync } from "fs";
import { CRUD } from "../interfaces/crud.interface";

export class JsonFileStore<T extends { id: number }> implements CRUD<T> {
    private collection: Array<T>;

    constructor(private filePath: string) {
        this.collection = this.load();
    }

    private load(): Array<T> {
        if (!existsSync(this.filePath)) return [];
        try {
            const raw = readFileSync(this.filePath, "utf-8");
            return raw.trim() === "" ? [] : JSON.parse(raw);
        } catch {
            return [];
        }
    }

    private persist(): void {
        writeFileSync(this.filePath, JSON.stringify(this.collection, null, 2), "utf-8");
    }

    create(payload: T): boolean {
        this.collection.push(payload);
        this.persist();
        return true;
    }

    read(): Array<T> {
        return [...this.collection];
    }

    update(id: number, payload: T): boolean {
        const index = this.collection.findIndex(item => item.id === id);
        if (index === -1) return false;
        this.collection[index] = payload;
        this.persist();
        return true;
    }

    delete(id: number): boolean {
        const index = this.collection.findIndex(item => item.id === id);
        if (index === -1) return false;
        this.collection.splice(index, 1);
        this.persist();
        return true;
    }

    find(id: number): T | undefined {
        return this.collection.find(item => item.id === id);
    }
}
