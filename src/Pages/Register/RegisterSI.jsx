import React, { useContext, useState } from "react";
import { useForm } from "../FormElements/Hooks/form-hook";
import Aux from "../../Hoc/components/Aux.jsx";
import Input from "../FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PATTERN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PATTERNC
} from "../FormElements/Util/Validators";
import Button from "../FormElements/Button";
import { AuthContext } from "../FormElements/Context/Context";
import "../FormElements/Form.css";
import LoadingSpinner from "../FormElements/LoadingSpinner";
import ErrorModal from "../FormElements/Util/ErrorModal";

const RegisterSI = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  //initial form state
  const [formState, inputHandler] = useForm(
    {
      netID: {
        value: "",
        isValid: false
      },
      course: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false //validity of overall form
  );

  //function call to backend
  const registerSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://sisessionapp.herokuapp.com/api/attendees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            netID: formState.inputs.netID.value,
            course: formState.inputs.course.value,
            password: formState.inputs.password.value
          })
        }
      );
      //response
      const responseData = await response.json();

      //if 400 or 500 is true
      if (!response.ok) {
        throw new Error(responseData.message);
        //goes to catch
      }
      setIsLoading(false);
      console.log("here");
      auth.signIn();
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Aux>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="title">Fill in these fields</h2>
        <form className="place-form" onSubmit={registerSubmitHandler}>
          <Input
            id="netID"
            element="input"
            type="text"
            label="Net ID"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PATTERN()]}
            errorText="Please enter a valid Net ID."
            onInput={inputHandler}
          />
          <Input
            id="course"
            element="input"
            type="text"
            label="Course"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PATTERNC()]}
            placeholder="Example: CS401-01"
            errorText="Please Enter a valid course"
            onInput={inputHandler}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            element="input"
            placeholder="8 characters minimum"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
            errorText="8 characters minimum"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </form>
      </Aux>
    </React.Fragment>
  );
};

export default RegisterSI;
