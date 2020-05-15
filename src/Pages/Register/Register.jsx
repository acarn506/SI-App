import React, {useContext, useState} from 'react'
import {useForm} from '../FormElements/Hooks/form-hook'
import Aux from '../../Hoc/components/Aux.jsx'
import Input from '../FormElements/Input'
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_PATTERN, VALIDATOR_STRING} from '../FormElements/Util/Validators'
import Button from '../FormElements/Button'
import {AuthContext} from '../FormElements/Context/Context'
import '../FormElements/Form.css'
import LoadingSpinner from '../FormElements/LoadingSpinner'
import ErrorModal from '../FormElements/Util/ErrorModal'



const Register = () => {
       const auth = useContext(AuthContext);
       const [isLoading, setIsLoading] = useState('')
       const [error, setError] = useState('')

        //initial form state
       const [formState, inputHandler] = useForm(
           {
                fname: {
                    value: '',
                    isValid: false
                },
                lname: {
                    value: '',
                    isValid: false
                },
                email: {
                    value: '',
                    isValid: false
                },
                netID: {
                    value: '',
                    isValid: false
                },
                sessionCode: {
                    value: '',
                    isValid: false
                }
            },
            false  //validity of overall form
        )

        //function call to backend
        const registerSubmitHandler = async event => {
            event.preventDefault()
            setIsLoading(true)

            try {
                const response = await fetch('https://sisessionapp.herokuapp.com/api/attendees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fname: formState.inputs.fname.value,
                        lname: formState.inputs.lname.value, 
                        email: formState.inputs.email.value,
                        netID: formState.inputs.netID.value,
                        sessionCode: formState.inputs.sessionCode.value
                    })
                })      
            //response 
            const responseData = await response.json()

            //if 400 or 500 is true
            if (!response.ok) {
                throw new Error(responseData.message)
                //goes to catch
            }
            setIsLoading(false)
            console.log("here")
            auth.signIn() 
        

            } catch (err) {
                    setIsLoading(false)
                    setError(err.message || "Something went wrong, please try again.")
                } 
        } 

        const errorHandler = () => {
            setError(null)
        }

        return(
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Aux>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2 className="title">Fill in these fields</h2>
                <form  className='place-form' onSubmit={registerSubmitHandler}>
                    <Input 
                    id='fname'
                    element="input" 
                    type='text' 
                    label='First Name'
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_STRING()]}
                    errorText="Please enter a valid first name."
                    onInput = {inputHandler}
                    />
                    <Input 
                    id='lname'
                    element="input" 
                    type='text' 
                    label="Last Name"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_STRING()]}
                    errorText="Please enter a valid last name."
                    onInput={inputHandler}
                    />
                    <Input 
                    id='email'
                    element="input" 
                    type='email' 
                    label='Horizon Email'
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email."
                    onInput = {inputHandler}
                    />
                    <Input 
                    id='netID'
                    element="input" 
                    type='text' 
                    label="Net ID"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_PATTERN()]}
                    errorText="Please enter a valid Net ID."
                    onInput={inputHandler}
                    />
                    <Input 
                    id='sessionCode'
                    element="input" 
                    type='text' 
                    label="Session Code"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Session Code is invalid"
                    onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>Submit</Button>
                </form>
                <Button to='/sign-in'>Switch to Sign-in</Button>
            </Aux>
        </React.Fragment>
        )
}
    

export default Register