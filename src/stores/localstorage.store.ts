import { QUERY } from "../interfaces/query.interface";

export class LocalStorageStore<T extends { id: number }> implements QUERY<T> {
    constructor(private table: string) { }

    create(payload: T): boolean {
        const collection = JSON.parse(localStorage.getItem(this.table) ?? "[]");
        collection.push(payload);
        localStorage.setItem(this.table, JSON.stringify(collection))
        return true;
    }
    read(): Array<T> {
        const data = JSON.parse(localStorage.getItem(this.table) ?? "[]");
        return data ? data : [];
    }
    update(id: number, payload: T): boolean {
        const collection = JSON.parse(localStorage.getItem(this.table) ?? "[]");
        const index = collection.findIndex((item: { id: number; }) => item.id === id);
        collection[index] = payload;
        localStorage.setItem(this.table, JSON.stringify(collection))
        return true;
    }
    delete(id: number): boolean {
        const collection = JSON.parse(localStorage.getItem(this.table) ?? "[]");
        const index = collection.findIndex((item: { id: number; }) => item.id === id);
        collection.splice(index, 1);
        localStorage.setItem(this.table, JSON.stringify(collection))
        return true;
    }
    find(id: number): T | undefined {
        const collection = JSON.parse(localStorage.getItem(this.table) ?? "[]");
        return collection.find((item: { id: number; }) => item.id === id);
    }
}