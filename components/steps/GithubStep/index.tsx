import { FC, useContext, useEffect } from 'react'
import clsx from 'clsx'

import { StepInfo } from '@components/StepInfo'
import { WhiteBlock } from '@components/common/WhiteBlock'
import { Button } from '@components/common/Button'
import { StepsContext } from '@pages/index'

import styles from './GithubStep.module.scss'
import { BASE_URL } from '@core/axios'

interface GithubStepProps {
}

export const GithubStep: FC<GithubStepProps> = () => {
    const { onNextStep, setUserData } = useContext(StepsContext)

    useEffect(() => {
        const handleOnMessage = ({ data }) => {
            const userJson: string = data
            if (typeof userJson === 'string' && userJson.includes('avatarUrl')) {
                const user = JSON.parse(userJson)
                setUserData(user)
                onNextStep()
            }
        }
        window.addEventListener('message', handleOnMessage)
        return () => {
            window.removeEventListener('message', handleOnMessage)
        }
    }, [])


    const onClickAuth = () => {
        window.open(
            `${BASE_URL}/auth/github`,
            'Auth',
            'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
        )
    }

    return (
        <div className={styles.block}>
            <StepInfo icon='/static/connect.png' title='Do you want import info from Github?' />
            <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
                <div className={styles.avatar}>
                    <b>NS</b>
                    <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z'
                            fill='#E0E0E0'
                            stroke='#D6D6D6'
                        />
                    </svg>
                </div>
                <h2 className='mb-40'>Name Surname</h2>
                <Button onClick={onClickAuth} className={styles.importButton}>
                    <img src='/static/github.svg' alt='Twitter logo' className={styles.githubLogo} />
                    Import from Github
                    <img className='d-ib ml-10' src='/static/arrow.svg' alt='arrow icon' />
                </Button>
                <div className='link mt-20 cup d-ib'>Enter my info manually</div>
            </WhiteBlock>
        </div>
    )
}
