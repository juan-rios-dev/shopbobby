import { QUERY } from "../interfaces/query.interface";

export class MemoryStore<T extends { id: number }> implements QUERY<T> {
    constructor(private collection: Array<T> = []) { }

    create(payload: T): boolean {
        this.collection.push(payload);
        return true;
    }
    read(): Array<T> {
        return this.collection;
    }
    update(id: number, payload: T): boolean {
        const index = this.collection.findIndex(item => item.id === id);
        this.collection[index] = payload;
        return true;
    }
    delete(id: number): boolean {
        const index = this.collection.findIndex(item => item.id === id);
        this.collection.splice(index, 1);
        return true;
    }
    find(id: number): T | undefined {
        return this.collection.find(item => item.id === id);
    }
}