import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { WelcomeStep } from '@components/steps/WelcomeStep'
import { EnterNameStep } from '@components/steps/EnterNameStep'
import { GithubStep } from '@components/steps/GithubStep'
import { ChooseAvatarStep } from '@components/steps/ChooseAvatarStep'
import { EnterPhoneStep } from '@components/steps/EnterPhoneStep'
import { EnterCodeStep } from '@components/steps/EnterCodeStep'
import { ValueOf } from '@tps/utils.types'
import { PersistenceService } from '@services/persistenceService'
import { checkAuth } from '@utils/checkAuth'
import { $User } from '@generated/AppModels'

export interface UserData extends $User {
    token?: string
}

export enum AuthSteps {
    WelcomeStep,
    GithubStep,
    EnterNameStep,
    ChooseAvatarStep,
    EnterPhoneStep,
    EnterCodeStep,
}

const stepsComponents = {
    [AuthSteps.WelcomeStep]: WelcomeStep,
    [AuthSteps.GithubStep]: GithubStep,
    [AuthSteps.EnterNameStep]: EnterNameStep,
    [AuthSteps.ChooseAvatarStep]: ChooseAvatarStep,
    [AuthSteps.EnterPhoneStep]: EnterPhoneStep,
    [AuthSteps.EnterCodeStep]: EnterCodeStep,
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
            PersistenceService.addUserData(userData)
        }
    }, [userData])


    return (
        <StepsContext.Provider value={{ step, userData, onNextStep, setUserData, setFieldValue }}>
            <Step />
        </StepsContext.Provider>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const user = await checkAuth(ctx)

        if (user) {
            return {
                props: {},
                redirect: {
                    destination: '/rooms',
                    permanent: false,
                },
            }
        }
        return { props: {} }
    } catch (err) {
        return { props: {} }
    }
}
