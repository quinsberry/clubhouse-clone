export function assertType<T>(value: any, predicate: (value: any) => boolean, message?: string): asserts value is T {
    if (!predicate(value)) {
        throw new Error(message ?? `Invalid value: ${value}`)
    }
}

export function validateFirstElementInList(list: any[], check: (element: any) => boolean): boolean {
    if (Array.isArray(list)) {
        if (list.length > 0) {
            return check(list[0])
        } else {
            return true
        }
    } else {
        return false
    }
}