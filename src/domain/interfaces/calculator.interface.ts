export interface ICalculator<T> {
    total(payload: T): number
}
