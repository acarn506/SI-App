import React from 'react'
import Aux from '../../Hoc/components/Aux'
import {VALIDATOR_REQUIRE, VALIDATOR_PATTERN, VALIDATOR_DATE} from '../FormElements/Util/Validators.jsx'
import Input from '../FormElements/Input'
import Button from '../FormElements/Button'
import {useForm} from '../FormElements/Hooks/form-hook'
import '../FormElements/Form.css'

const SignIn  = () => {

    const [formState, inputHandler] = useForm(
        {
             netID: {
                 value: '',
                 isValid: false
             }
         },
         false  //validity of overall form
     )

     //function call to backend
     const signInHandler = event => {
         event.preventDefault()
         console.log(formState.inputs)  
     }
    
    return(

        <Aux>
            <h2 className="title">Fill in these fields</h2>
                <form className='place-form' onSubmit={signInHandler}>
                    <Input 
                    id='netID'
                    element="input" 
                    type='text' 
                    pattern='[A-Z]{2}[0-9]{4}'
                    title='AA####'
                    label="Net ID"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_PATTERN()]}
                    errorText="Please enter a valid Net ID."
                    onInput={inputHandler}
                    />
                    
                    <Input 
                    //date allows any year
                    id='sessionDate'
                    element="input" 
                    type='text' 
                    //pattern='/^((0)[1-5])(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/'
                    title='##/##/2020'
                    label="Date of Session"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_DATE()]}
                    errorText="Please enter a valid Date."
                    onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>Sign-in</Button>
                </form>
        </Aux>
    )
    
}

export default SignIn