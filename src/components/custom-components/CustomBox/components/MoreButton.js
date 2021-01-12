import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { config } from "../../../../config";

const useStyles = makeStyles((theme) => ({
  moreWrapper: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
  },
  more: {
    width: "120px",
    textAlign: "center",
    color: "#016310",
    fontWeight: "600",
    fontSize: 16,
    textDecoration: "underline",
  },
}));

function MoreButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.moreWrapper}>
      <Button className={classes.more}>{config.string.MT_MORE}</Button>
    </div>
  );
}

export default MoreButton;
