import React from 'react'
import classes from './Layout.module.css'
import Aux from './Aux'

const Layout = (props) => {
    return(
        <Aux>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout