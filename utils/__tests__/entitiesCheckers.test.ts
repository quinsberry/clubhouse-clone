import { isRoom, isUserData, isUserDataWithRoomId } from '@utils/entitiesCheckers'

describe('isUserData', () => {
    it('check all fields', () => {
        let mockedUserData = {}
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
        }
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
        }
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
        }
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
        }
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
            username: 'punisher2000',
        }
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
            username: 'punisher2000',
            phone: '1954684325',
        }
        expect(isUserData(mockedUserData)).toEqual(true)
    })

    it('incorrect types', () => {
        let mockedUserData = {}
        expect(isUserData(null)).toEqual(false)
        expect(isUserData({})).toEqual(false)

        mockedUserData = {
            id: '1',
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
            username: 'punisher2000',
            phone: '1954684325',
        }
        expect(isUserData(mockedUserData)).toEqual(false)

        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: true,
            username: 'punisher2000',
            phone: '1954684325',
        }
        expect(isUserData(mockedUserData)).toEqual(false)
    })
})

describe('isUserDataWithRoomId', () => {
    it('check all fields', () => {
        let mockedUserData = {}
        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
            username: 'punisher2000',
            phone: '1954684325',
        }
        expect(isUserDataWithRoomId(mockedUserData)).toEqual(false)


        mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
            username: 'punisher2000',
            phone: '1954684325',
            roomId: 1
        }
        expect(isUserDataWithRoomId(mockedUserData)).toEqual(true)
    })

    it('incorrect types', () => {
        const mockedUserData = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            isActive: 1,
            username: 'punisher2000',
            phone: '1954684325',
            roomId: '1'
        }
        expect(isUserDataWithRoomId(mockedUserData)).toEqual(false)
    })
})

describe('isRoom', () => {
    it('check all fields', () => {
        let mockedRoom = {}
        expect(isRoom(mockedRoom)).toEqual(false)

        mockedRoom = {
            id: 1,
        }
        expect(isRoom(mockedRoom)).toEqual(false)

        mockedRoom = {
            id: 1,
            title: 'New room',
        }
        expect(isRoom(mockedRoom)).toEqual(false)

        mockedRoom = {
            id: 1,
            title: 'New room',
            type: 'open',
        }
        expect(isRoom(mockedRoom)).toEqual(false)

        mockedRoom = {
            id: 1,
            title: 'New room',
            type: 'open',
            speakers: [],
        }
        expect(isRoom(mockedRoom)).toEqual(false)

        mockedRoom = {
            id: 1,
            title: 'John Johnson',
            type: '/public/1d12e1as.jpeg',
            speakers: [],
            listenersCount: 0,
        }
        expect(isRoom(mockedRoom)).toEqual(true)

        mockedRoom = {
            id: 1,
            title: 'John Johnson',
            type: '/public/1d12e1as.jpeg',
            speakers: [{
                id: 1,
                fullname: 'John Johnson',
                avatarUrl: '/public/1d12e1as.jpeg',
                isActive: 1,
                username: 'punisher2000',
                phone: '1954684325',
                roomId: 1
            }],
            listenersCount: 0,
        }
        expect(isRoom(mockedRoom)).toEqual(true)
    })

    it('incorrect types', () => {
        expect(isRoom(null)).toEqual(false)

        const mockedRoom = {
            id: 1,
            fullname: 'John Johnson',
            avatarUrl: '/public/1d12e1as.jpeg',
            speakers: [{
                id: 1,
            }],
            listenersCount: 0,
        }
        expect(isRoom(mockedRoom)).toEqual(false)
    })
})