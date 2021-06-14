import { assertNonNull, assertType, isOfType } from '@utils/type-guards'

describe('isOfType', () => {
    it('applies the predicate', () => {
        let n: number = 0
        let s: string = 'hello'

        const someFunction = (thing: number | string) => {
            if (isOfType<number>(thing, thing => typeof thing === 'number')) {
                // type is narrowed to number
                n = thing
                expect(typeof n).toEqual('number')
            } else {
                // type is narrowed to string
                s = thing
                expect(typeof s).toEqual('string')
            }
        }

        someFunction(17)
        expect(n).toEqual(17)

        someFunction('goodbye')
        expect(s).toEqual('goodbye')
    })
})

describe('assertType', () => {
    it('throws error if predicate fails', () => {
        let n: number = 0

        const someFunction = (thing: number | string) => {
            assertType<number>(thing, thing => typeof thing === 'number')

            // type is narrowed to number
            n = thing
        }

        someFunction(17)
        expect(n).toEqual(17)

        expect(() => someFunction('goodbye')).toThrow()
    })
})

describe('assertNonNull', () => {
    it('throws error if predicate fails', () => {
        let n: number = 0

        const someFunction = (thing: number | null) => {
            assertNonNull(thing)

            // type is narrowed to number
            n = thing
        }

        someFunction(17)
        expect(n).toEqual(17)

        expect(() => someFunction(null)).toThrow()
    })
})
