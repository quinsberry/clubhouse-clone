import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { SERVER_URL } from '@core/axios'

export const useSocket = (): Socket => {
    const socketRef = useRef<Socket>()

    if (!socketRef.current) {
        if (typeof window !== 'undefined') {
            socketRef.current = io(SERVER_URL)
        }
    } else {
        socketRef.current.connect()
    }

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                console.log('Socket was disconnected.')
                socketRef.current.disconnect()
            }
        }
    }, [])

    return socketRef.current!
}
