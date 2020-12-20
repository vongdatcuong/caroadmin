import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import BoxChat from "../../../components/layouts/BoxChat";
import { store } from "../../../context/socket-context";
// Components

// Constant && Services
import AuthService from "../../../services/auth.service";
import {
  GetBoard,
  GetChatPrivateRoom,
  LeaveRoom,
  LeaveRoomPlayer,
  MakeAMove,
  DeclareWinner
} from "../../../services/socket/base-socket";
import Board from "./components/board";
import Chatbox from "./components/chatbox";
import Settings from "./components/settings";
import UserInfo from "./components/user-info";

import {
  GetSecondPlayer,
  GetFirstPlayer,
  ChatPrivateRoom,
  CloseRoom,
  JoinGlobalRoom
} from "../../../services/socket/base-socket";
import "./index.css";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    color: "#ffffff",
    backgroundColor: theme.palette.secondary.main,
    fontSize: "60px",
    padding: "5px",
  },
  winner: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
    color: 'red'
  }
}));
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

export default function Game(props) {
  const boardSize = 15;
  const historyPages = useHistory();
  const location = useLocation();
  const { state, dispatch } = useContext(store);
  const [socket, setSocket] = useState(state.socket);
  const user = AuthService.getCurrentUser();
  if (!user) {
    historyPages.push("/login");
  }
  const classes = useStyles();
  const nameRef = useRef();
  const [history, setHistory] = useState([
    {
      col: 0,
      row: 0,
      total: 0,
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAsc, setIsAsc] = useState(true);

  const [board, setBoard] = useState({squares: []});
  const [roomChat, setRoomChat] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState({});
  const [chatText, setChatText] = useState("");
  const [winner, setWinner] = useState("");

  const handleOnLoadSecondPlayer = (value) => {
    setSecondPlayer(value);
  };

  const handleOnLeave = () => {
    LeaveRoom(socket, location.state.roomID, user);
    historyPages.push("/dashboard");
  };

  const handleClick = (i) => {
    if (winner || board.turn != user._id || board.squares[i]) {
      return;
    }
    //const history_t = history.slice(0, stepNumber + 1);
    //const current = history_t[history_t.length - 1];
    //const squares = current.squares.slice();
    const col = (i % boardSize) + 1;
    const row = Math.floor(i / boardSize) + 1;
    const total = board.total;
    MakeAMove(socket, location.state.roomID, user, {idx: i, col: col, row: row});
    //if (calculateWinner(squares) || squares[i]) {
    //  return;
    //}
    //squares[i] = xIsNext ? "X" : "O";

    /*setHistory(
      history_t.concat([
        {
          col: col,
          row: row,
          total: total + 1,
          squares: squares,
        },
      ])
    );
    setStepNumber(history_t.length);
    setXIsNext(!xIsNext);
    setIsAsc(isAsc);*/
  };
  const current = history[stepNumber];
  /*const winner = calculateWinner(current.squares);
  const totalMoves = current.total;
  let status;
  if (winner) {
    const winnerValue = current.squares[winner[0]];
    status = "Winner: " + winnerValue;
  } else if (totalMoves === current.squares.length) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }*/
  const currentLocation = { row: current.row, col: current.col };

  useEffect(() => {
    GetSecondPlayer(socket, handleOnLoadSecondPlayer);
    GetFirstPlayer(socket, handleOnLoadSecondPlayer);
    GetChatPrivateRoom(socket, handleOnGetRoomChat);
    LeaveRoomPlayer(
      socket,
      handleOnLoadSecondPlayer,
      location.state.roomID,
      handleOnLeave
    );
    GetBoard(socket, setBoard);
    DeclareWinner(socket, handleWinner);
    CloseRoom(socket, location.state.roomID, handleOnCloseRoomRes);
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
    const newChat = { _id: user._id, username: user.username, msg: chatText, time: Date.now() };
    temp.push(newChat);
    setRoomChat(temp);
    ChatPrivateRoom(socket, location.state.roomID, newChat);
    setChatText("");
  };

  const handleWinner = (winner) => {
    setWinner(winner);
  }

  const handleOnCloseRoomRes = () => {
    historyPages.push("/dashboard");
    JoinGlobalRoom(socket, user);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
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
                />
              </Grid>
              <div className="row" style={{ width: 300 }}>
                <div className={classes.boxChatWrapper}>
                  <BoxChat
                    title="ROOM"
                    data={roomChat}
                    value={chatText}
                    onType={handleOnChangeChat}
                    onSubmit={handleOnSubmitChat}
                  ></BoxChat>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid key={1} item>
            <div className="game">
              <div className="game-board">
                <Board
                  boardSize={boardSize}
                  squares={board.squares}
                  onClick={(i) => handleClick(i)}
                  currentLocation={currentLocation}
                  winnerList={winner}
                />
              </div>
            </div>
            {(winner)? 
              <div className={classes.winner}>
                <Typography variant="h5" component="h5">Winner {winner}</Typography>
              </div> 
              : 
              ''
            }
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
                />
              </Grid>
              <Grid item>
                <Settings onLeave={handleOnLeave} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
