import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_NONE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(
          responseData.userId,
          responseData.token,
          responseData.userImage
        );

        //notice that in both cases the id comes from the backend, there after the request we send back as our responseData such attributes
      } catch (err) {
        // note however that we should not need such error handling per se, because the backend actually contains such response, but I've also handled it in the custom hook
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        formData.append("office", formState.inputs.office.value);
        formData.append("location", formState.inputs.location.value);
        formData.append("mobile", formState.inputs.mobile.value);
        formData.append("contactemail", formState.inputs.contactemail.value);
        formData.append("fax", formState.inputs.fax.value);

        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        auth.login(
          responseData.userId,
          responseData.token,
          responseData.userImage
        );
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal
        error={error}
        onClear={
          clearError /* Notice this function isn't defined here, it comes from our custom hook */
        }
      />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLoginMode ? <h2>Login Required</h2> : <h2> Sign Up With Us </h2>}
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image"
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <div>
              <h4>
                {" "}
                The following sections are{" "}
                <span style={{ color: "red" }}> optional </span> information.
                <h5> You may skip those.</h5>
              </h4>
            </div>
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="mobile"
              type="text"
              validators={[[VALIDATOR_NONE()]]}
              label="Mobile Phone"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="office"
              type="text"
              label="Office Phone"
              onInput={inputHandler}
              validators={[[VALIDATOR_NONE()]]}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="fax"
              type="text"
              label="Office Fax"
              onInput={inputHandler}
              validators={[[VALIDATOR_NONE()]]}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="location"
              type="text"
              label="Office Adress"
              onInput={inputHandler}
              validators={[[VALIDATOR_NONE()]]}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="contactemail"
              type="text"
              label="Contact Email"
              onInput={inputHandler}
              validators={[[VALIDATOR_NONE()]]}
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? "Sign Up" : "Login"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
