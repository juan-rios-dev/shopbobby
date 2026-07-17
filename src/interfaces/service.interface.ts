export interface ServicePort<T> {
    read(): Array<T>;
    create(payload: T): boolean;
    delete(id: number): boolean;
}
