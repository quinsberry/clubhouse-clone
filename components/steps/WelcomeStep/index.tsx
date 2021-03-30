import { FC, useContext } from 'react'

import { WhiteBlock } from '@components/common/WhiteBlock'
import { Button } from '@components/common/Button'
import { StepsContext } from '@pages/index'

import styles from './WelcomeStep.module.scss'

interface WelcomeStepProps {}

export const WelcomeStep: FC<WelcomeStepProps> = () => {
    const { onNextStep } = useContext(StepsContext)

    return (
        <WhiteBlock className={styles.block}>
            <h3 className={styles.title}>
                <img className={styles.handWaveImg} src="/static/hand-wave.png" alt="Celebration" />
                Welcome to Clubhouse!
            </h3>
            <p>
                We’re working hard to get Clubhouse ready for everyone! While we wrap up the finishing youches, we’re
                adding people gradually to make sure nothing breaks :)
            </p>
            <div>
                <Button onClick={onNextStep}>
                    Get your username
                    <img className="d-ib ml-10" alt="arrow icon" src="/static/arrow.svg" />
                </Button>
            </div>
            <div className="link mt-15 cup d-ib">Have an invite text? Sign in</div>
        </WhiteBlock>
    )
}
