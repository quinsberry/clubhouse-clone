import React, { useRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import styles from './StartRoomModal.module.scss'
import { Button } from '@components/common/Button'
import { Room, RoomType } from '@api/room.api'
import { ClientService } from '@services/clientService'
import { assertType } from '@tps/guards.types'
import { isRoom } from '@utils/entitiesCheckers'

interface StartRoomModalProps {
    onClose: () => void;
}

export const StartRoomModal: React.FC<StartRoomModalProps> = ({ onClose }) => {
    const router = useRouter()

    const [title, setTitle] = React.useState<string>('')
    const [type, setType] = React.useState<RoomType>(RoomType.Open)
    // const createRoom = useAsyncAction<any, Room>(fetchCreateRoom)

    const modalRef = useRef<HTMLDivElement>()

    const onSubmit = async () => {
        if (!title) {
            return alert('Enter a header of the room')
        }
        const room = await ClientService().createRoom({ title, type })
        assertType<Room>(room, room => isRoom(room))

        router.push(`/rooms/${room.id}`)
    }

    React.useEffect(() => {
        document.body.addEventListener('click', handleOnOut)
        return () => {
            document.body.removeEventListener('click', handleOnOut)
        }
    }, [])

    const handleOnOut = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(modalRef.current)) {
            onClose()
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={modalRef}>
                <img
                    width='24px'
                    height='24px'
                    src='/static/close.svg'
                    alt='Close'
                    className={styles.closeBtn}
                    onClick={onClose}
                />
                <div className='mb-30'>
                    <h3>Topic</h3>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.inputTitle}
                        placeholder='Enter the topic to be discussed'
                    />
                </div>
                <div className='mb-30'>
                    <h3>Room type</h3>
                    <div className='d-flex justify-content-between'>
                        <div
                            onClick={() => setType(RoomType.Open)}
                            className={clsx(styles.roomType, { [styles.roomTypeActive]: type === RoomType.Open })}>
                            <img width='70px' height='70px' src='/static/room-type-1.png' alt='Room type' />
                            <h5>Open</h5>
                        </div>
                        <div
                            onClick={() => setType(RoomType.Social)}
                            className={clsx(styles.roomType, { [styles.roomTypeActive]: type === RoomType.Social })}>
                            <img width='70px' height='70px' src='/static/room-type-2.png' alt='Room type' />
                            <h5>Social</h5>
                        </div>
                        <div
                            onClick={() => setType(RoomType.Closed)}
                            className={clsx(styles.roomType, { [styles.roomTypeActive]: type === RoomType.Closed })}>
                            <img width='70px' height='70px' src='/static/room-type-3.png' alt='Room type' />
                            <h5>Closed</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.delimiter}/>
                <div className='text-center'>
                    <h3>Start a room open to everyone</h3>
                    <Button onClick={onSubmit} color='green'>
                        <img width='18px' height='18px' src='/static/celebration.png' alt='Celebration' />
                        Let's go
                    </Button>
                </div>
            </div>
        </div>
    )
}
