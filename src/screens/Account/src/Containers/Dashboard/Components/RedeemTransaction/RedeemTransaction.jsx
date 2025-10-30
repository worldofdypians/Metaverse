import React, { useState } from 'react'
import Web3 from 'web3';
import { Input, Button, SuccessAlert, ErrorAlert } from '../../../../Components'
import { topUpContract } from '../../../../web3';
import classes from "./Redeem.module.css";

const RedeemTransaction = ({ refetchPlayer }) => {
    const [id, setId] = useState('')
    const [errorM, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)


    const onDeposit = async () => {
        setLoading(true)
        const value = Web3.utils.toWei(id)
        const data = topUpContract.methods.deposit(value).encodeABI()
        const transactionParameters = {
            from: window?.ethereum?.selectedAddress,
            to: '0xAdD0F01275080E18975bf1C70ce213ad48DE24bf',
            value: "0x00",
            data
        };
        try {
            await window?.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            setSuccess('Successfully deposited!')
            setId('')
            refetchPlayer()
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(error?.message || 'Something went wrong!')


        }
    }

    const onChage = (val) => {
        if (errorM) {
            setError('')
        }
        if (success) {
            setSuccess('')
        }
        setId(val)
    }


    return (
        <div style={{ marginTop: 32 }}>
            <div className={classes.rowContainer}>
                <Button
                    disabled={!id}
                    style={{
                        marginRight: 32,
                        alignSelf: 'flex-end'
                    }}
                    onPress={onDeposit}
                    title='Deposit'
                    loading={loading}
                />
                <Input
                    inputType="number"
                    value={id}
                    onChange={onChage}
                />

            </div>
            <ErrorAlert error={errorM} />
            <SuccessAlert success={success} />

        </div>
    )
}

export default RedeemTransaction