import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

let initialValue;
export default function RangeSlider({
  homes,
  filteredHomes,
  setFilteredHomes,
  filterdHomes,
  label,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, initialValue || 1700]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let itemToFilter = label.toLowerCase().split(" ")[0].trim();
  let max;

  useEffect(() => {
    // since we want to reuse this, it's better to not hard code it here
    if (setFilteredHomes && itemToFilter === "area") {
      setFilteredHomes(
        homes?.filter((el) => el.area > value[0] && el.area < value[1])
      );
      initialValue = 100;
    }
    if (setFilteredHomes && itemToFilter === "price") {
      setFilteredHomes(
        homes?.filter((el) => el.price > value[0] && el.price < value[1])
      );
      initialValue = 2000;
    }
  }, [value, homes, itemToFilter, setFilteredHomes]);

  const handleMinMax = () => {
    if (itemToFilter === "area") {
      max = 1000;
    }
    if (itemToFilter === "price") {
      max = 10000;
    }
  };
  handleMinMax();

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {label}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={max}
      />
    </div>
  );
}
