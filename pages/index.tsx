import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { WelcomeStep } from '@components/steps/WelcomeStep'
import { EnterNameStep } from '@components/steps/EnterNameStep'
import { GithubStep } from '@components/steps/GithubStep'
import { ChooseAvatarStep } from '@components/steps/ChooseAvatarStep'
import { EnterPhoneStep } from '@components/steps/EnterPhoneStep'
import { EnterCodeStep } from '@components/steps/EnterCodeStep'
import { ValueOf } from '@tps/utils.types'

export interface UserData {
    id: number
    fullname: string
    avatarUrl: string
    isActive: number
    username: string
    phone: string
    createdAt: Date
    updatedAt: Date
    token?: string
}

const stepsComponents = {
    0: WelcomeStep,
    1: GithubStep,
    2: EnterNameStep,
    3: ChooseAvatarStep,
    4: EnterPhoneStep,
    5: EnterCodeStep,
}

interface StepsContextProps {
    step: number
    userData: UserData
    onNextStep: () => void
    setUserData: Dispatch<SetStateAction<UserData>>
    setFieldValue: (field: keyof UserData, value: ValueOf<UserData>) => void
}

export const StepsContext = createContext<StepsContextProps>({} as StepsContextProps)

export default function Home() {
    const [step, setStep] = useState<number>(0)
    const [userData, setUserData] = useState<UserData>(null)
    const Step = stepsComponents[step]

    const onNextStep = () => setStep((prev) => prev + 1)

    const setFieldValue = (field: keyof UserData, value: ValueOf<UserData>) => {
        setUserData(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    useEffect(() => {
        if (userData) {
            window.localStorage.setItem('userData', JSON.stringify(userData))
        }
    }, [userData])


    return (
        <StepsContext.Provider value={{ step, userData, onNextStep, setUserData, setFieldValue }}>
            <Step />
        </StepsContext.Provider>
    )
}
