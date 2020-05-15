import React from 'react'
import Layout from '../../Hoc/components/Layout'
import '../FormElements/Form.css'
import './Logged.css'

const Logged = (props) => {
    return(
        <Layout>
            <div className='text'>
            <h1>Thanks!</h1>
            <h2>You're signed in for today's session</h2>
            </div>
        </Layout>
    )
}

export default Logged 