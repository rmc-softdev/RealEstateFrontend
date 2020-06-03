import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, SetIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      SetIsValid(true);
      fileIsValid = true;
    } else {
      SetIsValid(false);
      fileIsValid = false;
      //Notice that due to the way react scops its state changing mechanism, we would've sent the old state, not yet updated of the isValid property if we chose to sent it to onInput below, so we create an auxiliary variable!
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        type="file"
        id={props}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p> Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          {" "}
          PICK IMAGE{" "}
        </Button>
      </div>
      {!isValid && <p style={{ color: "red" }}>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
