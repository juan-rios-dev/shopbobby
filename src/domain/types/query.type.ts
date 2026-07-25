import { CRUD } from "./crud.type";

export interface QUERY<T> extends CRUD<T> {
    find(id: number): T | undefined 
}