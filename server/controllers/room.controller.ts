import { Request, Response } from 'express'
// @ts-ignore Import models from js file
import { Room } from '@server/database/models'


class RoomController {
    async index(req: Request, res: Response) {
        try {
            const rooms = await Room.findAll()
            res.status(200).json(rooms)
        } catch (error) {
            res.status(500).json({ message: 'Internal error', error })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = {
                title: req.body.title,
                type: req.body.type,
            }

            if (!data.title || !data.type) {
                return res.status(400).json({ message: 'Title or type was not found' })
            }

            const room = await Room.create(data)
            res.status(201).json(room)
        } catch (error) {
            res.status(500).json({ message: 'Internal error', error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const roomId = req.params.id

            if (isNaN(Number(roomId))) {
                return res.status(422).json({ message: 'Invalid room ID' })
            }

            const room = await Room.findByPk(roomId)

            if (!room) {
                return res.status(404).json({ message: 'Room not found' })
            }

            res.status(200).json(room)
        } catch (error) {
            res.status(500).json({ message: 'Internal error', error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const roomId = req.params.id

            if (isNaN(Number(roomId))) {
                return res.status(422).json({ message: 'Invalid room ID' })
            }

            await Room.destroy({
                where: { id: roomId },
            })

            res.status(200).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal error', error })
        }
    }
}

export const RoomCtrl = new RoomController()
