import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#016310",
    fontWeight: "600",
    padding: "5px",
    textAlign: "center",
    height: "10%",
    marginBottom: "7px",
  },
}));

function HeaderBox({ title }) {
  const classes = useStyles();
  return (
    <Typography
      textAlign="center"
      variant="h6"
      component="h6"
      className={classes.title}
    >
      {title}
    </Typography>
  );
}

export default HeaderBox;
