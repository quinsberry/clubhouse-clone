import { createContext, useState } from 'react'

import { WelcomeStep } from '@components/steps/WelcomeStep'
import { EnterNameStep } from '@components/steps/EnterNameStep'
import { GithubStep } from '@components/steps/GithubStep'
import { ChooseAvatarStep } from '@components/steps/ChooseAvatarStep'
import { EnterPhoneStep } from '@components/steps/EnterPhoneStep'
import { EnterCodeStep } from '@components/steps/EnterCodeStep'

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
    onNextStep: () => void
}

export const StepsContext = createContext<StepsContextProps>({} as StepsContextProps)

export default function Home() {
    const [step, setStep] = useState<number>(0)
    const Step = stepsComponents[step]

    const onNextStep = () => setStep((prev) => prev + 1)

    return (
        <StepsContext.Provider value={{ step, onNextStep }}>
            <Step />
        </StepsContext.Provider>
    )
}
