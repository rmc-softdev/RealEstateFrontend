import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationOutlined(props) {
  const classes = useStyles();
  let currentPage;

  return (
    <div className={classes.root}>
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        onChange={(e, page) => {
          currentPage = page;
          props.HowManyToShow(currentPage);
        }}
      />
    </div>
  );
}
