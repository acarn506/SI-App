import React, { useContext, useState } from "react";
import Aux from "../../Hoc/components/Aux";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PATTERN,
  VALIDATOR_DATE,
  VALIDATOR_MINLENGTH
} from "../FormElements/Util/Validators.jsx";
import Input from "../FormElements/Input";
import Button from "../FormElements/Button";
import { useForm } from "../FormElements/Hooks/form-hook";
import "../FormElements/Form.css";
import { AuthContext } from "../FormElements/Context/Context";
import LoadingSpinner from "../FormElements/LoadingSpinner";
import ErrorModal from "../FormElements/Util/ErrorModal";

const SISignIn = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  const [formState, inputHandler] = useForm(
    {
      attended: {
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
  const signInHandler = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://sisessionapp.herokuapp.com/api/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            attended: formState.inputs.attended.value,
            password: formState.inputs.password.value
          })
        }
      );
      //response

      const responseData = await response.json();
      console.log(responseData);

      //if 400 or 500 is true
      if (!response.ok) {
        throw new Error(responseData.message);
        //goes to catch
      }
      setIsLoading(false);
      auth.login();
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
        <form className="place-form" onSubmit={signInHandler}>
          <Input
            id="attended"
            element="input"
            type="text"
            label="Net ID"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_PATTERN()]}
            errorText="Please enter a valid NetID."
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
            Sign-in
          </Button>
        </form>
      </Aux>
    </React.Fragment>
  );
};

export default SISignIn;
