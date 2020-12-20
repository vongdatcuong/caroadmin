import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

// Material UI Core
import Typography from "@material-ui/core/Typography";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "@material-ui/lab/Pagination";

// Material UI Icon
import PublicIcon from "@material-ui/icons/Public";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Components

import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import BoxChat from "../../../components/layouts/BoxChat";
import GameEntrance from "./GameEntrance";
import CreateFormDialog from "../../../components/dialogs/CreateRoomDialog";

// Service
import AuthService from "../../../services/auth.service";
import { store } from "../../../context/socket-context";
import { loadingStore } from "../../../context/loading-context";

import {
  GetGlobalUsers,
  JoinGlobalRoom,
  GetChatGlobalRoom,
  ChatGlobalRoom,
  CreatePlayingRoom,
  GetListRoom,
  JoinRoom,
} from "../../../services/socket/base-socket";
import JoinRoomDialog from "../../../components/dialogs/JoinRoomDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(6),
    maxWidth: "1400px",
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
  toolbar: {},
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
    width: "90%",
    height: "250px",
    backgroundColor: "#F6F6F6",
    border: "2px solid #016310",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "5px",
    margin: '0 auto',
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
  // Right
  playNowBtn: {
    backgroundColor: "#EA4335",
  },
  rankingBtn: {
    backgroundColor: "#FBBC05",
  },
  newRoomBtn: {
    backgroundColor: "#255FDB",
  },
  JoinRoomBtn: {
    backgroundColor: "#A336B4",
  },
  waiting: {
    color: "#016310",
  },
  paginationWrapper: {
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  pagination: {
    "& ul": {
      justifyContent: "center",
    },
  },
}));

const DashBoard = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(store);
  const [socket, setSocket] = useState(state.socket);
  const [chat, setChat] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);

  if (!AuthService.getCurrentUser()) {
    history.push("/logIn");
  }
  const classes = useStyles();
  const user = AuthService.getCurrentUser();

  const handleOnChooseRoom = (roomID) => {
    history.push({ pathname: "/game", state: { roomID: roomID, turn: 2 } });
    JoinRoom(socket, roomID, user);
  };

  const handleOnChatChange = (e) => {
    setChat(e.target.value);
  };

  const handleClickOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleClickOpenJoinDialog = () => {
    setOpenJoinDialog(true);
  };

  const handleCloseJoinDialog = () => {
    setOpenJoinDialog(false);
  };
  const handleOnCreateRoom = (title) => {
    handleCloseCreateDialog();
    CreatePlayingRoom(socket, { title: title, creator: user });
    history.push({ pathname: "/game", state: { roomID: socket.id, turn: 1 } });
  };

  const handleOnChatSubmit = (e) => {
    e.preventDefault();
    ChatGlobalRoom(socket, { username: user.username, msg: chat });
    setChat("");
  };

  useEffect(() => {
    if (!state.isCheck && user) {
      JoinGlobalRoom(socket, { id: socket.id, _id: (user)? user._id : 0, username: user.username });
      GetGlobalUsers(socket, dispatch);
      GetChatGlobalRoom(socket, dispatch);
      GetListRoom(socket, dispatch);
      dispatch({ type: "Check-listener" });
    }
  }, []);

  return (
    <main>
      <Container className={classes.container} maxWidth="md">
        

      </Container>
    </main>
  );
};

export default DashBoard;
