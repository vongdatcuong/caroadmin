import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { store } from "../../../context/socket-context";
import { loadingStore } from "../../../context/loading-context";
// Components
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import BackgroundGameImg from "../../../vendors/images/background-game.jpg";

// Constant && Services
import Utils from "../../../Utils";
import AuthService from "../../../services/auth.service";
import {
  GetBoard,
  GetChatPrivateRoom,
  LeaveRoom,
  LeaveRoomPlayer,
  MakeAMove,
  DeclareWinner,
  GetGlobalUsers,
  InviteUser,
  GetInviteRequest,
  WithDraw,
  GetRoomOwner,
  ReadyGame,
  ReadyGameRes,
  RestartGame,
  RestartGameRes,
  UpdateUserRes,
  LoadingRes,
  PlayerDisconnectRes,
  PlayerReconnectRes,
  DisconnectedPlayerLose,
  SpecRoomRes,
} from "../../../services/socket/base-socket";
import Board from "./components/board";
import Chatbox from "./components/chatbox";
import Settings from "./components/settings";
import SettingDialog from "../../../components/dialogs/SettingDialog/index";
import UserInfo from "./components/user-info";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import JoinPlaying from "./components/join-playing";

import {
  GetSecondPlayer,
  GetFirstPlayer,
  ChatPrivateRoom,
  CloseRoom,
  JoinGlobalRoom,
} from "../../../services/socket/base-socket";
import "./index.css";
import { Typography } from "@material-ui/core";
import ListUser from "./components/list-user";
import CustomBox from "../../../components/custom-components/CustomBox";
import ListGlobalChat from "../../../components/custom-components/CustomBox/components/ListGlobalChat";
import ChatBox from "../../../components/custom-components/CustomBox/components/ChatBox";
import PlayerDisconnect from "../../Main/PlayerDisconnect";
import { config } from "../../../config";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: "url(" + BackgroundGameImg + ")",
    backgroundSize: "contain",
    minHeight: "100vh",
  },
  paper: {
    display: "flex",
    alignItems: "center",
  },
  root: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(3),
    color: "#ffffff",
    backgroundColor: theme.palette.secondary.main,
    fontSize: "60px",
    padding: "5px",
  },
  game: {
    position: "relative",
  },
  controlWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    textAlign: "center",
    zIndex: "999",
  },
  start: {
    position: "absolute",
    top: "40%",
    left: "45%",
    fontSize: "1.5em",
    color: "#016310",
    backgroundColor: fade("#ffffff", 1),
    border: "3px solid #016310",
    borderRadius: "5px",
    textAlign: "center",
  },
  startBtn: {
    marginTop: theme.spacing(30),
    display: "inline block",
    textAlign: "center",
    fontSize: "1.5em",
    color: "#016310",
    backgroundColor: fade("#ffffff", 1),
    border: "3px solid #016310",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  restartBtn: {
    marginTop: theme.spacing(5),
  },
  waitBtn: {
    marginTop: theme.spacing(30),
    display: "inline-block",
    textAlign: "center",
    fontSize: "1.5em",
    color: "#016310",
    backgroundColor: fade("#ffffff", 1),
    border: "3px solid #016310",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  waitAnotherBtn: {
    marginTop: theme.spacing(30),
    display: "inline-block",
    textAlign: "center",
  },
  waitAnotherBtn2: {
    marginTop: theme.spacing(5),
  },
  winnerWrapper: {
    marginTop: theme.spacing(25),
  },
  winner: {
    textAlign: "center",
    color: "red",
    backgroundColor: fade("#000000", 0.3),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    border: "2px solid red",
    borderRadius: "5px",
    textAlign: "center",
  },
  leaveClosedRoomWrapper: {
    backgroundColor: fade("#000000", 0.4),
    zIndex: "1000",
  },
  leaveClosedRoomBtn: {
    marginTop: theme.spacing(40),
    display: "inline-block",
    textAlign: "center",
    fontSize: "1.5em",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: "inline-block",
    textAlign: "center",
  }
}));

export default function Game(props) {
  const boardSize = Utils.boardSize;
  const historyPages = useHistory();
  const location = useLocation();
  const { state, dispatch } = useContext(store);
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const [socket, setSocket] = useState(state.socket);
  const user = AuthService.getCurrentUser();
  if (!user) {
    historyPages.push(config.route.login);
  }
  const classes = useStyles();
  const nameRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(-1);

  // board.squares.length === 0 => Chưa start game
  const [board, setBoard] = useState({ squares: [] });
  const [roomChat, setRoomChat] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState({});
  const [chatText, setChatText] = useState("");
  const [winner, setWinner] = useState("");
  const [openSetting, setOpenSetting] = useState(false);
  const [openConfirmWithdrawDialog, setOpenConfirmWithdrawDialog] = useState(
    false
  );
  const [openConfirmLeaveDialog, setOpenConfirmLeaveDialog] = useState(false);
  const [roomOwner, setRoomOwner] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isRoomClosed, setIsRoomClosed] = useState(false);
  const [turnTime, setTurnTime] = useState(location.state.time); // Millisecond
  const [player1Time, setPlayer1Time] = useState(location.state.time);
  const [player2Time, setPlayer2Time] = useState(location.state.time);
  let countDownInterval = null;

  const [isOtherDis, setIsOtherDis] = useState(false);
  const [timeout, setTimeout] = useState(Utils.disconnectTimeout);

  const initializeRoomUser = [
    {
      user: user,
      role: location.state.roomID === user._id ? "Player 1" : "Player 2",
    },
  ];
  const [roomUsers, setRoomUsers] = useState(initializeRoomUser);
  const [spectators, setSpectators] = useState([]);

  const handleOnLoadSecondPlayer = (value) => {
    setRoomUsers([
      ...roomUsers,
      {
        user: value,
        role: location.state.roomID === user._id ? "Player 2" : "Player 1",
      },
    ]);
    setSecondPlayer(value);
  };

  const handleOnPlayerLeave = (player) => {
    setRoomUsers(roomUsers.filter((e) => e.user._id !== player));
    setIsReady(false);
  };

  const handleOnWithDraw = () => {
    setOpenConfirmWithdrawDialog(true);
  };

  const handleWithDraw = () => {
    WithDraw(socket, location.state.roomID, user);
    setOpenSetting(false);
  };

  const handleOnLeave = () => {
    setOpenConfirmLeaveDialog(true);
  };

  const handleLeave = () => {
    setOpenSetting(false);
    LeaveRoom(socket, location.state.roomID, user);
    JoinGlobalRoom(socket, user);
    historyPages.push("/dashboard");
  };

  const handleClick = (i) => {
    if (
      board.squares.length === 0 ||
      winner.winner ||
      board.turn != user._id ||
      board.squares[i]
    ) {
      return;
    }

    const col = (i % boardSize) + 1;
    const row = Math.floor(i / boardSize) + 1;
    MakeAMove(socket, location.state.roomID, user, {
      idx: i,
      col: col,
      row: row,
    });
  };

  useEffect(() => {
    GetSecondPlayer(socket, handleOnLoadSecondPlayer);
    GetFirstPlayer(socket, handleOnLoadSecondPlayer);
    GetChatPrivateRoom(socket, handleOnGetRoomChat);
    GetGlobalUsers(socket, dispatch);
    LeaveRoomPlayer(socket, handleOnLoadSecondPlayer, handleOnPlayerLeave);
    GetBoard(socket, handleSetBoardVsCount);
    DeclareWinner(socket, handleWinner);
    CloseRoom(socket, location.state.roomID, handleOnCloseRoomRes);
    GetRoomOwner(socket, setRoomOwner);
    ReadyGameRes(socket, handleReadyGameRes);
    //RestartGameRes(socket, handleRestartGameRes);
    UpdateUserRes(socket, handleUpdateUserRes);
    LoadingRes(socket, dispatchLoading);
    PlayerDisconnectRes(socket, handlePlayerDisRes);
    PlayerReconnectRes(socket ,handlePlayerRecon);
    SpecRoomRes(socket, setSpectators);
  }, []);

  const handleOnGetRoomChat = (msg) => {
    setRoomChat(msg);
  };

  const handleOnChangeChat = (e) => {
    setChatText(e.target.value);
  };

  const handleOnSubmitChat = (e) => {
    e.preventDefault();
    const temp = [...roomChat];
    const newChat = {
      _id: user._id,
      username: user.username,
      content: chatText,
      //time: Date.now(),
    };
    temp.push(newChat);
    setRoomChat(temp);
    ChatPrivateRoom(socket, location.state.roomID, newChat);
    setChatText("");
  };

  const handleWinner = (winner) => {
    setWinner(winner);
    setIsReady(false);
    setCurrentIndex(-1);
    clearCountDown();
    setPlayer1Time(turnTime);
    setPlayer2Time(turnTime);
  };

  const handleOnCloseRoomRes = () => {
    setIsRoomClosed(true);
  };

  const handleCloseRoom = () => {
    historyPages.replace("/dashboard");
    JoinGlobalRoom(socket, user);
  };

  const handleOnSetting = () => {
    setOpenSetting(true);
  };

  const handleOnCloseSetting = () => {
    setOpenSetting(false);
  };

  const handleOnInviteUser = (socketID) => {
    InviteUser(socket, {
      id: socketID,
      room: {
        id: location.state.roomID,
        title: location.state.title,
        creator: location.state.creator,
        time: location.state.time,
        password: location.state.password,
      },
    });
  };

  const handleOnReadyGame = () => {
    ReadyGame(socket, location.state.roomID, user);
    setIsReady(true);
    setWinner("");
    setCurrentIndex(-1);
  };

  const handleReadyGameRes = (_id) => {
    if (user._id === _id) {
      setIsReady(true);
    }
  };

  const handleOnRestartGame = () => {
    ReadyGame(socket, location.state.roomID, user);
    setIsReady(true);
    setBoard({ squares: [] });
    setWinner("");
    setCurrentIndex(-1);
  };

  /*const handleRestartGameRes = (emptyBoard) => {
    setBoard(emptyBoard);
  }*/

  const handleSetBoardVsCount = (board) => {
    setBoard(board);
    setCurrentIndex((board.row - 1) * boardSize + (board.col - 1));
    clearCountDown();
    // Player 1 Turn
    if (board.turn === user._id) {
      // Reset other player time
      setPlayer2Time(turnTime);
      const timeLeft = player1Time - ((board.turnTimeUsed)? board.turnTimeUsed: 0);
      countDown(timeLeft, setPlayer1Time).then((value) => {
        WithDraw(socket, location.state.roomID, user);
      });
    }
    // Player 2 Turn (board.turn != 0)
    else if (board.turn) {
      // Reset other player time
      setPlayer1Time(turnTime);
      const timeLeft = player2Time - ((board.turnTimeUsed)? board.turnTimeUsed: 0);
      countDown(timeLeft, setPlayer2Time).then((value) => {});
    }
  };

  const countDown = (time, setTime) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        time -= 1000; // Millisecond
        setTime(time);
        if (time <= 0) {
          clearInterval(interval);
          resolve(1);
        }
      }, 1000);
      countDownInterval = interval;
    });
  };

  const clearCountDown = () => {
    // Clear interval
    if (countDownInterval) {
      clearInterval(countDownInterval);
    }
  };

  const handleUpdateUserRes = (newUser) => {
    if (user._id === newUser._id) {
      // Intialize Room users khong biet lam sao
      delete newUser.id;
      delete newUser.isReady;
      AuthService.updateCurrentUser(newUser);
    } else {
      handleOnLoadSecondPlayer(newUser);
    }
  };

  let timeoutInterval;
  const handlePlayerDisRes = () => {
    setIsOtherDis(true);
    clearCountDown();
    timeoutCountDown(timeout, setTimeout).then((result) => {
      handleDisTimeout();
    })
  }

  const handleDisTimeout = () => {
    DisconnectedPlayerLose(socket, location.state.roomID, user)
    setIsOtherDis(false);
    clearTimeoutCountDown();
  }

  const handlePlayerRecon = () => {
    setIsOtherDis(false);
    clearTimeoutCountDown();
  }

  const timeoutCountDown = (time, setTime) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        time -= 1000; // Millisecond
        setTime(time);
        if (time === 0) {
          clearInterval(interval);
          resolve(1);
        }
      }, 1000);
      timeoutInterval = interval;
    });
  }

  const clearTimeoutCountDown = () => {
    clearInterval(timeoutInterval);
    setTimeout(Utils.disconnectTimeout);
  }

  return (
    <Container className={classes.main} component="main" maxWidth="xl">
      <CssBaseline />
      <PlayerDisconnect display={isOtherDis} time={timeout}/>
      <div className={classes.paper}>
        <Grid container justify="center" spacing={2} className={classes.root}>
          <Grid key={0} item>
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                  <UserInfo
                  user={user}
                  playerNum={1}
                  type={location.state.turn === 1 ? "X" : "O"}
                  onSetting={handleOnSetting}
                  time={player1Time}
                  />
              </Grid>
              <div className="row" style={{ width: 300 }}>
                <div className={classes.boxChatWrapper}>
                  <CustomBox
                    title={config.string.MT_ROOM}
                    data={roomChat}
                    value={chatText}
                    ListComponent={ListGlobalChat}
                    ActionComponent={ChatBox}
                    onType={handleOnChangeChat}
                    onSubmit={handleOnSubmitChat}
                  ></CustomBox>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid key={1} item>
            <div className={classes.game}>
              <div className="game-board">
                <Board
                  boardSize={boardSize}
                  squares={board.squares}
                  onClick={(i) => handleClick(i)}
                  currentIndex={currentIndex}
                  winnerList={winner.winnerList}
                />
              </div>
              {isRoomClosed ? (
                <div
                  className={`${classes.controlWrapper} + ${classes.leaveClosedRoomWrapper}`}
                >
                  <Button
                    className={classes.leaveClosedRoomBtn}
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseRoom}
                  >
                    {config.string.D_LEAVE_ROOM}
                  </Button>
                </div>
              ) : (
                ""
              )}
              {
                // When game hasn't been started
                board.squares.length === 0 ? (
                  <div className={classes.controlWrapper}>
                    {
                      // If there are enough players
                      roomUsers.length >= 2 ? (
                        !isReady ? (
                          <Button
                            startIcon={<PlayCircleFilledWhiteIcon />}
                            className={classes.startBtn}
                            onClick={handleOnReadyGame}
                          >
                            {config.string.D_READY}
                          </Button>
                        ) : (
                          <Button
                            className={`${classes.waitBtn} ${classes.waitAnotherBtn}`}
                          >
                            {config.string.D_WAITING_READY}
                          </Button>
                        )
                      ) : (
                        // Waiting another player message
                        <Button
                          className={`${classes.waitBtn} ${classes.waitAnotherBtn}`}
                        >
                          {config.string.D_WAITING_PLAYER}
                        </Button>
                      )
                    }
                  </div>
                ) : // when game has already been started
                winner.winner ? (
                  <div className={classes.controlWrapper}>
                    <div className={classes.winnerWrapper}>
                      <Typography
                        variant="h5"
                        component="span"
                        className={classes.winner}
                      >
                        {winner.winner != config.string.MT_NONE
                          ? `${config.string.MT_WINNER} ` + winner.winner
                          : config.string.MT_DRAW}
                      </Typography>
                    </div>
                    {
                      // If there are enough players
                      roomUsers.length >= 2 ? (
                        !isReady ? (
                          <Button
                            startIcon={<PlayCircleFilledWhiteIcon />}
                            className={`${classes.startBtn} + ${classes.restartBtn}`}
                            onClick={handleOnRestartGame}
                          >
                            {config.string.D_READY}
                          </Button>
                        ) : (
                          <Button
                            className={`${classes.waitBtn} ${classes.waitAnotherBtn2}`}
                          >
                            {config.string.D_WAITING_READY}
                          </Button>
                        )
                      ) : (
                        // Waiting another player message
                        <Button
                          className={`${classes.waitBtn} ${classes.waitAnotherBtn2}`}
                        >
                          {config.string.D_WAITING_PLAYER}
                        </Button>
                      )
                    }
                  </div>
                ) : (
                  ""
                )
              }
            </div>
          </Grid>
          <Grid key={2} item>
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="flex-end"
              spacing={2}
            >
              <Grid item>
                <UserInfo
                  user={secondPlayer}
                  playerNum={2}
                  type={location.state.turn === 1 ? "O" : "X"}
                  time={player2Time}
                />
              </Grid>
              <Grid item>
                <ListUser roomData={roomUsers} spectators={spectators} onInvite={handleOnInviteUser} />
              </Grid>
            </Grid>
          </Grid>
          <ConfirmDialog
            open={openConfirmWithdrawDialog}
            action={handleWithDraw}
            setOpen={setOpenConfirmWithdrawDialog}
          >
            <div align="center">
              {config.string.D_ASKING} <b>{config.string.MT_WITHDRAW}</b>
            </div>
          </ConfirmDialog>
          <ConfirmDialog
            open={openConfirmLeaveDialog}
            action={handleLeave}
            setOpen={setOpenConfirmLeaveDialog}
          >
            <div align="center">
              {config.string.D_ASKING} <b>{config.string.MT_LEAVE_ROOM}</b>
            </div>
          </ConfirmDialog>
          <SettingDialog
            value={openSetting}
            onWithdraw={
              (board.squares.length > 0 && !winner) ? handleOnWithDraw : null
            }
            onClose={handleOnCloseSetting}
            onLeave={handleOnLeave}
          />
        </Grid>
      </div>
    </Container>
  );
}
