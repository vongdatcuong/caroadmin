import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Typography } from "@material-ui/core";
import Utils from "../../../../Utils";

const useStyles = makeStyles((theme) => ({
  chatContents: {
    overflow: "auto",
    height: "75%",
  },
  lineChat: {
    paddingTop: "2px",
    paddingBottom: "2px",
    display: "block",
  },
  lineTime: {
    textAlign: "left",
    marginRight: "5px",
    display: "inline-block",
    "& span": {
      fontSize: "0.9em",
      marginRight: "0px",
      display: "inline-block",
    },
  },
  content: {
    display: "inline-block",
    "& span": {
      display: "inline-block",
    },
  },
  username: {
    marginRight: "5px",
    fontWeight: "600",
    display: "inline-block",
    "& span": {
      display: "inline-block",
    },
  },
}));

function ListGlobalChat({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.chatContents}>
      <List component="nav" aria-label="main mailbox folders">
        {data.map((line, index) => {
          const time = "[" + Utils.milliSecondToMinSecFormat(line.time) + "]";
          return (
            <ListItem key={index} className={classes.lineChat}>
              {line.time ? (
                <ListItemText className={classes.lineTime} primary={time} />
              ) : (
                ""
              )}
              <Typography textAlign="center" className={classes.username}>
                {line.username}:{" "}
              </Typography>
              <ListItemText
                className={classes.content}
                primary={line.content}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ListGlobalChat;
