import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: "auto",
    height: "75%",
  },
  online: {
    color: "green",
  },
  bold: {
    fontWeight: "600",
  },
}));

function ListOnlineUser({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <List dense={true}>
        {data.map((user, index) => {
          return (
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={user.username}
                className={classes.bold}
                disableTypography={true}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <FiberManualRecordIcon
                    fontSize="small"
                    className={classes.online}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ListOnlineUser;
