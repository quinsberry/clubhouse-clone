import { FC, useContext, useState } from 'react'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'

import { StepInfo } from '@components/StepInfo'
import { WhiteBlock } from '@components/common/WhiteBlock'
import { Button } from '@components/common/Button'
import { StepsContext } from '@pages/index'

import styles from './EnterPhoneStep.module.scss'
import { ClientService } from '@services/clientService'

interface InputValueState {
    formattedValue: string
    value: string
}

interface EnterPhoneStepProps {
}

export const EnterPhoneStep: FC<EnterPhoneStepProps> = () => {
    const { onNextStep, setFieldValue } = useContext(StepsContext)
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState<InputValueState>({} as InputValueState)

    const nextDisabled = !values.formattedValue || values.formattedValue.includes('_')

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            await ClientService().sendActivationSms(values.value)
            setFieldValue('phone', values.value)
            onNextStep()
        } catch (err) {
            console.error('Sending sms-code error\n', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.block}>
            <StepInfo
                icon='/static/phone.png'
                title='Enter your phone #'
                description='We will send you a confirmation code'
            />
            <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
                <div className={clsx('mb-30', styles.input)}>
                    <img src='/static/ukrainian-flag.webp' alt='flag' width={24} />
                    <NumberFormat
                        className='field'
                        format='+## (###) ###-##-##'
                        mask='_'
                        placeholder='+38 (099) 333-22-11'
                        value={values.value}
                        onValueChange={({ formattedValue, value }) => setValues({ formattedValue, value })}
                    />
                </div>
                <Button disabled={isLoading || nextDisabled} onClick={onSubmit}>
                    Next
                    <img className='d-ib ml-10' alt='arrow icon' src='/static/arrow.svg' />
                </Button>
                <p className={clsx(styles.policyText, 'mt-30')}>
                    By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
                </p>
            </WhiteBlock>
        </div>
    )
}
