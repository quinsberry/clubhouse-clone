import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useAsyncAction = <Returned, Arg = any>(
    actionCreator: AsyncThunk<Returned, Arg, {}>,
): (arg: Arg) => Promise<Returned> => {
    const dispatch = useDispatch<any>()

    return useCallback(
        (arg: Arg) =>
            dispatch(actionCreator(arg))
                .then((result: any) => unwrapResult(result))
                .catch((err: any) => Promise.reject(err)),
        [dispatch, actionCreator],
    )
}
