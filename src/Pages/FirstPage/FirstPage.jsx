import React from 'react'
import Layout from '../../Hoc/components/Layout'
import './FirstPage.module.css'
import Button from '../FormElements/Button'

const FirstPage = (props) => {

    return(
        <Layout>
            <h1>First Page</h1>
            <Button to='/register'>Register</Button>
            
            <Button to='/sign-in'>Sign-in</Button>
        </Layout>
    )
}

export default FirstPage 