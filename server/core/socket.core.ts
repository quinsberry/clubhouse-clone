import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { getUsersFromTheRoom, SocketRoom } from '@server/utils/getUserFromTheRoom'
import { $ClientSocketApi, $ServerSocketApi } from '@server/types/client.types'
// @ts-ignore js file
import { Room } from '@server/database/models'

export const rooms: SocketRoom = {}
export const initSocket = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            credentials: true,
            origin: process.env.CLIENT_URL,
            optionsSuccessStatus: 200,
        },
    })

    io.on('connection', (socket) => {
        console.log('Connected socket id: ', socket.id)
        SocketTree(io, socket)
    })
}

function SocketTree(io: Server, socket:  Socket) {
    socket.on($ClientSocketApi.JOIN, ({ user, roomId }) => {
        socket.join(`room/${roomId}`)
        rooms[socket.id] = { roomId, user }
        const speakers = getUsersFromTheRoom(rooms, roomId)
        io.emit($ServerSocketApi.HOME, { roomId: Number(roomId), speakers })
        io.in(`room/${roomId}`).emit($ServerSocketApi.JOIN, speakers)
        Room.update({ speakers }, { where: { id: roomId } })
    })

    socket.on($ClientSocketApi.CALL, ({ targetUserId, callerUserId, roomId, signal }) => {
        socket.broadcast.to(`room/${roomId}`).emit($ServerSocketApi.CALL, {
            targetUserId,
            callerUserId,
            signal,
        })
    })

    socket.on($ClientSocketApi.ANSWER, ({ targetUserId, callerUserId, roomId, signal }) => {
        socket.broadcast.to(`room/${roomId}`).emit($ServerSocketApi.ANSWER, {
            targetUserId,
            callerUserId,
            signal,
        })
    })

    socket.on('disconnect', () => {
        if (rooms[socket.id]) {
            const { roomId, user } = rooms[socket.id]
            socket.broadcast.to(`room/${roomId}`).emit($ServerSocketApi.LEAVE, user)
            delete rooms[socket.id]
            const speakers = getUsersFromTheRoom(rooms, roomId)
            io.emit($ServerSocketApi.HOME, { roomId: Number(roomId), speakers })
            Room.update({ speakers }, { where: { id: roomId } })
        }
    })
}