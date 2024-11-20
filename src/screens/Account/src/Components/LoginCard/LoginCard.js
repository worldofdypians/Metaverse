import React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card';
import { outlineBorder } from '../../Themes/Images';

function LoginCard({ children, containerStyles, cardStyles }) {
    return (
        <div
            style={{
                background: "#12133f",
                border: ".5px solid #c0c9ff",
                borderRadius: "12px",
                padding: '15px',
                width: '100%',
                maxWidth: '600px',
                ...containerStyles
            }
            }
        >
            <Card sx={{
                // minWidth: 500,
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                ...cardStyles
            }}>
                {children}
            </Card>
        </div >

    )
}

LoginCard.propTypes = {
    children: PropTypes.any,
    containerStyles: PropTypes.object,
    cardStyles: PropTypes.object,
}



export default LoginCard