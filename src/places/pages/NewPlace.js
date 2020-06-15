import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NONE,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
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

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("garages", formState.inputs.garages.value);
      formData.append("bathrooms", formState.inputs.bathrooms.value);
      formData.append("bedrooms", formState.inputs.bedrooms.value);
      formData.append("type", formState.inputs.type.value);
      formData.append("status", formState.inputs.status.value);
      formData.append("area", formState.inputs.area.value);
      formData.append("price", formState.inputs.price.value);

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Input
          id="price"
          element="input"
          label="Price (dollars/month)."
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(10)]}
          errorText="Please enter a valid price (at most 10 characters)."
          onInput={inputHandler}
        />
        <h4 style={{ textAlign: "center" }}>
          The following sections are{" "}
          <span style={{ color: "red" }}> additional </span> information.
          <h5 style={{ textAlign: "center" }}>
            You may fill those as you wish.
          </h5>
        </h4>
        <Input
          id="area"
          element="input"
          label="What's the area of your property (m²)?"
          validators={[VALIDATOR_NONE(), VALIDATOR_MAXLENGTH(10)]}
          errorText="Please enter a valid area (at most 10 characters)."
          onInput={inputHandler}
        />
        <Input
          id="bedrooms"
          element="input"
          label="How many bedrooms there are in your property?"
          validators={[VALIDATOR_NONE(), VALIDATOR_MAXLENGTH(2)]}
          errorText="Please enter a valid area (at most 2 characters)."
          onInput={inputHandler}
        />
        <Input
          id="garages"
          element="input"
          label="How many garages?"
          validators={[VALIDATOR_NONE(), VALIDATOR_MAXLENGTH(2)]}
          errorText="Please enter a valid area (at most 2 characters)."
          onInput={inputHandler}
        />
        <Input
          id="bathrooms"
          element="input"
          label="How many bathrooms?"
          validators={[VALIDATOR_NONE(), VALIDATOR_MAXLENGTH(2)]}
          errorText="Please enter a valid area (at most 2 characters)."
          onInput={inputHandler}
        />
        <Input
          id="type"
          element="input"
          label="What's the type of your propety (for example, single family)?"
          validators={[VALIDATOR_NONE()]}
          errorText='Please enter something. For example, "Single Family".'
          onInput={inputHandler}
        />
        <Input
          id="status"
          element="input"
          label="What's the status of your property? Is it for rent or sale?"
          validators={[VALIDATOR_NONE()]}
          errorText='Please enter something. For example, "For Sale".'
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Post a new place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
