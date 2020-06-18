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

const NumberSelect = ({
  homes,
  setHomes,
  filteredHomes,
  setFilteredHomes,
  label,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    if (e.target.value >= 0) {
      setValue(e.target.value);
    }
  };

  useEffect(() => {
    let itemToFilter = label.toLowerCase(); // since we want to reuse this, it's better to not hard code it here
    if (setFilteredHomes && itemToFilter === "bathrooms") {
      setFilteredHomes(homes?.filter((el) => el.bathrooms >= value));
    }

    if (setFilteredHomes && itemToFilter === "bedrooms") {
      setFilteredHomes(homes?.filter((el) => el.bedrooms >= value));
    }

    if (setFilteredHomes && itemToFilter === "garages") {
      setFilteredHomes(homes?.filter((el) => el.garages >= value));
    }
  }, [value]);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <TextField
          id="outlined-number"
          label={label}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChange}
          value={value}
        />
      </div>
    </form>
  );
};

export default NumberSelect;
