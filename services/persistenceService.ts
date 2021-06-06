import { UserData } from '@pages/index'

export class PersistenceService {
    public static addUserData(userData: UserData): void {
        window.localStorage.setItem('userData', JSON.stringify(userData))
    }

    public static getUserData(): UserData | null {
        return JSON.parse(window.localStorage.getItem('userData')) ?? null
    }

    public static removeUserData(): void {
        window.localStorage.removeItem('userData')
    }
}