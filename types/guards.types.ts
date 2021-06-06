export function assertType<T>(value: any, predicate: (value: any) => boolean, message?: string): asserts value is T {
    if (!predicate(value)) {
        throw new Error(message ?? `Invalid value: ${value}`)
    }
}