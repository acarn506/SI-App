import React from 'react'
import './Layout.css'
import Aux from './Aux'

const Layout = (props) => {
    return(
        <Aux>
            <div className="place-form">
                {props.children}
            </div>
        </Aux>
    )
}

export default Layout