/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useAuth } from '../../Utils.js/Auth/AuthDetails'
import { getErrorMessage } from '../../Utils.js/Helpers'
import { CREATE_PLAYER } from './PlayerCreation.schema'
import { Input, LoginCard, Button, LoginWrapper, ErrorAlert } from '../../Components'
import classes from './PlayerCreation.module.css'

function PlayerCreation() {
    const { getUpdatedUser } = useAuth()

    const [onCreatePlayer, { loading }] = useMutation(CREATE_PLAYER)
    const [createError, setCreateError] = useState('')

    const [creationState, setCreationState] = useState({
        displayName: '',
        password: ''
    })

    const setPassword = (val) => {
        setCreationState(prev => ({
            ...prev,
            password: val
        }))
    }
    const setDisplayName = (val) => {
        setCreationState(prev => ({
            ...prev,
            displayName: val
        }))
    }



    const { displayName, password } = creationState

    const _onCreatePlayer = async () => {
        try {
            await onCreatePlayer({
                variables: {
                    displayName: displayName,
                    password: password
                }
            })
            getUpdatedUser()
        } catch (error) {
            setCreateError(getErrorMessage(error))
        }

    }


    useEffect(() => {
        if (createError) {
            setCreateError('')
        }
    }, [creationState])

    return (
        <LoginWrapper>
            <LoginCard>
                <div className={classes.container}>
                    <p className={classes.playerCreationTitle}>
                        Player Creation
                    </p>
                    <form autocomplete="off">
                        <Input
                            autocomplete="off"
                            name='displayName'
                            style={{
                                marginBottom: 24
                            }}
                            placeHolder='Display name'
                            value={displayName}
                            onChange={setDisplayName}
                        />
                        <Input
                            name='player-password'
                            style={{
                                marginBottom: 48
                            }}
                            inputType='password'
                            placeHolder='Password'
                            value={password}
                            onChange={setPassword}

                        />
                        <Button
                            style={{ margin: 'auto' }}
                            onPress={_onCreatePlayer}
                            title={'Continue'}
                            loading={loading}
                        />
                    </form>

                </div>
            </LoginCard>
            <ErrorAlert error={createError} />

        </LoginWrapper>
    )
}

export default PlayerCreation