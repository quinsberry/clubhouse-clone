import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { WelcomeStep } from '@components/steps/WelcomeStep'
import { EnterNameStep } from '@components/steps/EnterNameStep'
import { GithubStep } from '@components/steps/GithubStep'
import { ChooseAvatarStep } from '@components/steps/ChooseAvatarStep'
import { EnterPhoneStep } from '@components/steps/EnterPhoneStep'
import { EnterCodeStep } from '@components/steps/EnterCodeStep'
import { PersistenceService } from '@services/persistenceService'
import { checkAuth } from '@utils/checkAuth'
import { $User } from '@generated/AppModels'
import { storeWrapper } from '@store/store'
import { assertNonNull } from '@tps/guards.types'

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
    step: AuthSteps
    userData: UserData | null
    onNextStep: () => void
    setUserData: Dispatch<SetStateAction<UserData | null>>
    setFieldValue: <Field extends keyof UserData>(field: Field, value: UserData[Field]) => void
}

export const StepsContext = createContext<StepsContextProps>({} as StepsContextProps)
export default function Home() {
    const [step, setStep] = useState<AuthSteps>(AuthSteps.WelcomeStep)
    const [userData, setUserData] = useState<UserData | null>(null)
    const Step = stepsComponents[step]

    const onNextStep = () => setStep((prev) => prev + 1)

    const setFieldValue = <Field extends keyof UserData>(field: Field, value: UserData[Field]): void => {
        assertNonNull(userData, 'This method cannot be called when userData equals null')
        setUserData(prev => {
            return ({ ...prev!, [field]: value })
        })
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

export const getServerSideProps = storeWrapper.getServerSideProps(
    store => async ctx => {
        try {
            const user = await checkAuth(ctx, store)

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
    },
)
