export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
    const ret: any = {}
    // @ts-ignore
    const keySet = new Set<string>(keys)

    Object.keys(obj).forEach((key: string) => {
        if (!keySet.has(key)) {
            ret[key] = obj[key]
        }
    })

    return ret
}