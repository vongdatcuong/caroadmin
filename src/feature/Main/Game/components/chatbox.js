import { IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import React from "react";
import "../index.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 390,
  },
  media: {},
  timeButton: {
    flex: 1,
    background: "green",
    color: "white",
    alignItems: "center",
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
    maxHeight: 280,
  },
  inline: {
    display: "inline",
  },
}));

export default function Chatbox(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography style={{ textAlign: "center", padding: 5 }}>
          Chat
        </Typography>
        <List className={classes.rootList}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
              }
              secondary={" — I'll be in your neighborhood doing errands this…"}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </CardContent>
      <CardActions style={{ alignSelf: "flex-end" }}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={1}
          variant="outlined"
        />
        <IconButton
          children={<SendIcon />}
          color="primary"
          style={{ padding: 2 }}
        />
        <IconButton
          children={<InsertEmoticonIcon />}
          color="primary"
          style={{ padding: 2 }}
        />
      </CardActions>
    </Card>
  );
}
