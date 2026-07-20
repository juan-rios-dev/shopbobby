export interface Service<T> {
    read(): Array<T>;
    create(payload: T): boolean;
    delete(id: number): boolean;
}
