import React from 'react'
import Layout from '../../Hoc/components/Layout'
import './ThanksReg.css'
import Button from '../FormElements/Button'

const ThanksReg = (props) => {

    return(
        <Layout>
            <h1 className='text'>Thanks for registering, please sign-in.</h1>
            
            <Button to='/sign-in'>Sign-in</Button>
        </Layout>
    )
}

export default ThanksReg 