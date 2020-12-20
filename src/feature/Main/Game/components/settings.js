import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "../index.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 250,
    flex: 1,
  },
  media: {},
  timeButton: {
    flex: 1,
    background: "red",
    color: "white",
    alignItems: "flex-end",
  },
  avatar: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
    justifySelf: "center",
  },
  rootList: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: 200,
  },
  inline: {
    display: "inline",
  },
}));

export default function Settings({ onLeave }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography style={{ textAlign: "center", padding: 5 }}>
          Settings
        </Typography>
      </CardContent>
      <CardActions style={{ paddingTop: 0, alignSelf: "flex-end" }}>
        <Button onClick={onLeave} className={classes.timeButton}>
          Leave Room
        </Button>
      </CardActions>
    </Card>
  );
}
