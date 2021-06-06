import { FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

import { StepsContext } from '@pages/index'
import { StepInfo } from '@components/StepInfo'
import { WhiteBlock } from '@components/common/WhiteBlock'
import { Button } from '@components/common/Button'

import styles from './EnterCodeStep.module.scss'
import { ClientService } from '@services/clientService'

const ReactCodeInput = dynamic(import('react-code-input'))

interface EnterCodeStepProps {
}

export const EnterCodeStep: FC<EnterCodeStepProps> = () => {
    const { userData } = useContext(StepsContext)
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const [rerenderTrigger, makeRerender] = useState(1)

    useEffect(() => {
        if (code.length === 4) {
            onSubmit()
        }
    }, [code])

    const handleChangeInput = (value: string) => setCode(value)

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            await ClientService().sendActivationCode({
                code,
                user: userData,
            })
            setTimeout(() => {
                router.push('/rooms')
            }, 1000)
        } catch (error) {
            setTimeout(() => {
                setCode('')
                makeRerender(rerenderTrigger + 1)
                console.error('Activation error\n', error)
                setIsLoading(false)
            }, 1000)
        }
    }

    return (
        <div className={styles.block}>
            {!isLoading ? null : (
                <div className={styles.loaderBlock}>
                    <div className={styles.loaderBack} />
                    <div className={clsx('text-center', styles.loaderFront)}>
                        <div className='loader' />
                    </div>
                </div>
            )}
            <div style={{ marginBottom: 200 }}>
                <StepInfo icon='/static/numbers.png' title='Enter your activate code' />
                <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
                    <ReactCodeInput
                        key={rerenderTrigger}
                        name='code'
                        value={code}
                        onChange={handleChangeInput}
                        className={clsx('mb-30', styles.codeInput)}
                        type='number'
                        fields={4}
                        inputMode='numeric'
                    />
                    <Button onClick={onSubmit} disabled={code.length < 4}>
                        Next
                        <img className='d-ib ml-10' alt='arrow icon' src='/static/arrow.svg' />
                    </Button>
                </WhiteBlock>
            </div>
        </div>
    )
}
