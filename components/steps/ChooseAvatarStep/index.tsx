import { ChangeEvent, FC, useContext, useState } from 'react'
import clsx from 'clsx'
import { StepInfo } from '@components/StepInfo'
import { WhiteBlock } from '@components/common/WhiteBlock'
import { Avatar } from '@components/common/Avatar'
import { Button } from '@components/common/Button'
import { StepsContext } from '@pages/index'
import { assertType } from '@tps/guards.types'
import styles from './ChooseAvatarStep.module.scss'
import { ClientService } from '@services/clientService'

interface ChooseAvatarStepProps {
}

const uploadFile = async (file: File): Promise<{ url: string }> => {
    try {
        const data = await ClientService().uploadAvatar(file)
        assertType<{ url: string }>(data, data => 'url' in data)
        return data
    } catch (err) {
        throw new Error(err)
    }
}

export const ChooseAvatarStep: FC<ChooseAvatarStepProps> = () => {
    const { onNextStep, userData, setFieldValue } = useContext(StepsContext)
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(userData?.avatarUrl ?? undefined)
    const avatarLetters = userData?.fullname.split(' ').map(_ => _[0]).join('')

    const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setAvatarUrl(imageUrl)
            const data = await uploadFile(file)
            target.value = ''
            setAvatarUrl(data.url)
            setFieldValue('avatarUrl', data.url)
        }
    }

    return (
        <div className={styles.block}>
            <StepInfo icon='/static/celebration.png' title='Okay, Name Surname!' description='How’s this photo?' />
            <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
                <div className={!avatarUrl ? 'mb-5' : undefined}>
                    <Avatar width='120px' height='120px' src={avatarUrl} letters={avatarLetters} />
                </div>
                <div className='mb-30'>
                    <label htmlFor='image' className='link cup'>
                        Choose a different photo
                    </label>
                </div>
                <input id='image' type='file' accept='image/*' hidden onChange={handleChangeImage} />
                <Button onClick={onNextStep}>
                    Next
                    <img className='d-ib ml-10' alt='arrow icon' src='/static/arrow.svg' />
                </Button>
            </WhiteBlock>
        </div>
    )
}
