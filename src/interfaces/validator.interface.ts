export interface Validator<T> {
    validate(payload: T): void
}
