import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

// Material UI Icon
import PublicIcon from "@material-ui/icons/Public";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// Components

import BoxChat from "../BoxChat";

// Service
import AuthService from "../../../services/auth.service";
import { store } from "../../../context/socket-context";

import {
  GetGlobalUsers,
  JoinGlobalRoom,
  GetChatGlobalRoom,
  ChatGlobalRoom,
} from "../../../services/socket/base-socket";
import { Gamepad, VerifiedUserOutlined, Person } from "@material-ui/icons";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
  button: {
    fontFamily: "'Exo2.0'",
    spacing: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  // Left
  globalBtn: {
    backgroundColor: "#016310",
  },
  friendBtn: {
    color: "#016310",
    border: "1.5px solid #016310",
  },
  box: {
    width: "98%",
    height: "500px",
    backgroundColor: "#F6F6F6",
    border: "2px solid #016310",
    borderRadius: "5px",
    margin: "0 auto",
  },
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  left: {
    "& > .row": {
      marginTop: "20px",
    },
  },
  right: {
    "& > .row": {
      marginTop: "20px",
    },
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    maxWidth: "300px",
  },
  onlineUserWrapper: {
    overflow: "auto",
    height: "85%",
  },
  online: {
    color: "green",
  },
  bold: {
    fontWeight: "600",
  },
  moreWrapper: {
    marginTop: "5px",
  },
  more: {
    textAlign: "center",
    color: "#016310",
    fontWeight: "600",
    textDecoration: "underline",
  },
}));

export default function LeftDrawer() {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const user = AuthService.getCurrentUser();
  const [socket, setSocket] = useState(state.socket);
  const [chat, setChat] = useState("");
  const [onlineUserState, setOnlineUserState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOnlineUserState({ ...onlineUserState, [anchor]: open });
  };
  const handleOnChatSubmit = (e) => {
    e.preventDefault();
    ChatGlobalRoom(socket, { username: user.username, msg: chat });
    setChat("");
  };
  const handleOnChatChange = (e) => {
    setChat(e.target.value);
  };

  useEffect(() => {
    if (!state.isCheck && user) {
      JoinGlobalRoom(socket, {
        id: socket.id,
        _id: user ? user._id : 0,
        username: user.username,
      });
      GetGlobalUsers(socket, dispatch);
      GetChatGlobalRoom(socket, dispatch);
      dispatch({ type: "Check-listener" });
    }
  }, []);
  const listData = [
    {
      value: "Players",
      icon: <Person />,
    },
    {
      value: "Staffs",
      icon: <VerifiedUserOutlined />,
    },
    {
      value: "Games",
      icon: <Gamepad />,
    },
  ];
  const renderOnlineDrawer = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Container className={classes.container}>
        <Grid>
          {/* Right */}
          <Grid item className={classes.left}>
            <div className={classes.toolbar}>
              <Button
                variant="contained"
                color="primary"
                className={`${classes.button} ${classes.globalBtn}`}
                startIcon={<PublicIcon />}
              >
                Global
              </Button>
            </div>
            <div className="row">
              <Box className={classes.box}>
                <div className={classes.onlineUserWrapper}>
                  <List dense={true}>
                    {state
                      ? state.globalUsers.map((user, index) => {
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
                        })
                      : null}
                  </List>
                </div>
                <div className={classes.moreWrapper}>
                  <Typography
                    variant="h6"
                    component="h6"
                    className={classes.more}
                  >
                    More
                  </Typography>
                </div>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {listData.map((data, index) => (
          <ListItem button key={data.value}>
            <ListItemIcon>
              {data.icon}
            </ListItemIcon>
            <ListItemText primary={data.value} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem button key="OnlineUser">
          <ListItemIcon onClick={toggleDrawer("right", true)}>
            {<PeopleIcon />}
          </ListItemIcon>
          <ListItemText
            primary="Online Users"
            onClick={toggleDrawer("right", true)}
          />
        </ListItem>
      </List>
      <Divider />
      <BoxChat
        title="GLOBAL"
        data={state.globalChat}
        value={chat}
        onType={handleOnChatChange}
        onSubmit={handleOnChatSubmit}
      ></BoxChat>
      <Drawer
        anchor={"right"}
        open={onlineUserState["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {renderOnlineDrawer("right")}
      </Drawer>
    </Drawer>
  );
}
