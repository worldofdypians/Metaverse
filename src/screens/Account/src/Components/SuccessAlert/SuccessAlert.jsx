
import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@mui/material'
import Collapse from '@mui/material/Collapse';
import classes from './SuccessAlert.module.css'
function SuccessAlert({ success }) {
    return (
        <div className={classes.container} >
            <Collapse in={Boolean(success)}>
                <Alert
                    severity="success" sx={{
                        alignItems: 'center'
                    }}
                >
                    {success}
                </Alert>
            </Collapse>

        </div>
    )
}
SuccessAlert.propTypes = {
    error: PropTypes.string,
}

SuccessAlert.defaultProps = {}

export default SuccessAlert