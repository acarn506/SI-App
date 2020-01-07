import React from 'react'
import {useForm} from '../FormElements/Hooks/form-hook'
import Aux from '../../Hoc/components/Aux.jsx'
import Input from '../FormElements/Input'
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PATTERN, VALIDATOR_STRING} from '../FormElements/Util/Validators'
import Button from '../FormElements/Button'
import '../FormElements/Form.css'

const Register = () => {

        //initial form state
       const [formState, inputHandler] = useForm(
           {
                firstName: {
                    value: '',
                    isValid: false
                },
                lastName: {
                    value: '',
                    isValid: false
                },
                Email: {
                    value: '',
                    isValid: false
                },
                netID: {
                    value: '',
                    isValid: false
                }
            },
            false  //validity of overall form
        )

        //function call to backend
        const registerSubmitHandler = event => {
            event.preventDefault()
            console.log(formState.inputs)  
        }

        return(
            <Aux>
                <h2 className="title">Fill in these fields</h2>
                <form className='place-form' onSubmit={registerSubmitHandler}>
                    <Input 
                    id='firstName'
                    element="input" 
                    type='text' 
                    label='First Name'
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_STRING()]}
                    errorText="Please enter a valid first name."
                    onInput = {inputHandler}
                    />
                    <Input 
                    id='lastName'
                    element="input" 
                    type='text' 
                    label="Last Name"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_STRING()]}
                    errorText="Please enter a valid last name."
                    onInput={inputHandler}
                    />
                    <Input 
                    id='Email'
                    element="input" 
                    type='email' 
                    label='Email'
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email."
                    onInput = {inputHandler}
                    />
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
                    <Button type="submit" disabled={!formState.isValid}>Submit</Button>
                </form>
            </Aux>
        )
}
    

export default Register