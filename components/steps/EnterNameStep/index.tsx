import { ChangeEvent, FC, useContext, useState } from 'react'
import clsx from 'clsx'

import { WhiteBlock } from '@components/common/WhiteBlock'
import { StepInfo } from '@components/StepInfo'
import { Button } from '@components/common/Button'
import { StepsContext } from '@pages/index'

import styles from './EnterNameStep.module.scss'

interface EnterNameStepProps {}

export const EnterNameStep: FC<EnterNameStepProps> = () => {
    const { onNextStep, userData, setFieldValue } = useContext(StepsContext)
    const [inputValue, setInputValue] = useState<string>(userData.fullname ?? '')

    const nextDisabled = !inputValue

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleNextStep = () => {
        setFieldValue('fullname', inputValue)
        onNextStep()
    }

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/man.png"
                title="What’s your full name?"
                description="People use real names in Clubhouse :) Thanks!"
            />
            <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
                <div className="mb-30">
                    <input
                        onChange={handleChangeInput}
                        value={inputValue}
                        className="field"
                        placeholder="Enter fullname"
                    />
                </div>
                <Button disabled={nextDisabled} onClick={handleNextStep}>
                    Next
                    <img className="d-ib ml-10" alt="arrow icon" src="/static/arrow.svg" />
                </Button>
            </WhiteBlock>
        </div>
    )
}
