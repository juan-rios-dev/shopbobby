import { CRUD } from "./crud.interface";

export interface QUERY<T> extends CRUD<T> {
    find(id: number): T | undefined 
}