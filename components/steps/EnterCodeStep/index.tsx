import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

import { Axios } from '@core/axios'

import { StepInfo } from '@components/StepInfo'
import { WhiteBlock } from '@components/common/WhiteBlock'
import { Button } from '@components/common/Button'

import styles from './EnterCodeStep.module.scss'

const ReactCodeInput = dynamic(import('react-code-input'))

interface EnterCodeStepProps {}

export const EnterCodeStep: FC<EnterCodeStepProps> = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')

    const handleChangeInput = (value: string) => setCode(value)

    const onSubmit = async () => {
        console.log(code)
        try {
            setIsLoading(true)
            await Axios.get('/todos')
            setTimeout(() => {
                router.push('/rooms')
            }, 1000)
        } catch (error) {
            alert('Activation error!')
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }

    return (
        <div className={styles.block}>
            {!isLoading ? null : (
                <div className={styles.loaderBlock}>
                    <div className={styles.loaderBack} />
                    <div className={clsx('text-center', styles.loaderFront)}>
                        <div className="loader" />
                    </div>
                </div>
            )}
            <div style={{ marginBottom: 200 }}>
                <StepInfo icon="/static/numbers.png" title="Enter your activate code" />
                <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
                    <ReactCodeInput
                        name="code"
                        value={code}
                        onChange={handleChangeInput}
                        className={clsx('mb-30', styles.codeInput)}
                        type="number"
                        fields={4}
                        inputMode="numeric"
                    />
                    <Button onClick={onSubmit} disabled={code.length < 4}>
                        Next
                        <img className="d-ib ml-10" alt="arrow icon" src="/static/arrow.svg" />
                    </Button>
                </WhiteBlock>
            </div>
        </div>
    )
}
