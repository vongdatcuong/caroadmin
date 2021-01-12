import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: "auto",
    height: "75%",
  },
}));

function ListRanking({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <List dense={true}>
        {data.map((user, index) => {
          return (
            <ListItem>
              {index < 3 ? (
                <ListItemIcon>
                  <EmojiEventsIcon
                    style={{
                      color:
                        index === 0
                          ? "#fcba03"
                          : index === 1
                          ? "#a8a59b"
                          : "#e86a09",
                    }}
                    fontSize="large"
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <Avatar style={{ backgroundColor: "#016310" }}>
                    {index + 1}
                  </Avatar>
                </ListItemIcon>
              )}
              <ListItemText
                primary={user.username}
                className={classes.bold}
                disableTypography={true}
              />
              <ListItemText
                primary={"(" + user.trophy + " trophy)"}
                className={classes.bold}
                disableTypography={true}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ListRanking;
