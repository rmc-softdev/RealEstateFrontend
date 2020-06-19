import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormPropsTextFields({
  homes,
  label,
  filteredHomes,
  setFilteredHomes,
}) {
  const classes = useStyles();
  const [status, setStatus] = useState("");

  useEffect(() => {
    // state.contacts.filter((contact) => {
    //   const regex = new RegExp(`${action.payload}`, "gi");

    //   return contact.name.match(regex) || contact.email.match(regex);
    // }),

    setFilteredHomes(
      homes?.filter((el) => {
        const regex = new RegExp(`${status}`, "gi");
        return el.status.toString().match(regex);
      })
    );
  }, [status, homes, setFilteredHomes]);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <TextField
          id="standard-search"
          helperText={status === "" ? "e.g., for sale" : ""}
          label={label}
          type="search"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        />
      </div>
    </form>
  );
}
