import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { store } from "../../context/socket-context";
import { loadingStore } from "../../context/loading-context";
// Components
import BackgroundGameImg from "../../vendors/images/background-game.jpg";

// Constant && Services
import Utils from "../../Utils";
import AuthService from "../../services/auth.service";
import {
  GetGlobalUsers,
} from "../../services/socket/base-socket";
import Board from "../Main/Game/components/board";
import SettingDialog from "../../components/dialogs/SettingDialog/index";
import UserInfo from "../Main/Game/components/user-info";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";

import { JoinGlobalRoom } from "../../services/socket/base-socket";
import "./index.css";
import ListMove from "./list-move";
import CustomBox from "../../components/custom-components/CustomBox";
import ListGlobalChat from "../../components/custom-components/CustomBox/components/ListGlobalChat";

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
  },
}));

export default function History(props) {
  const { gameID } = useParams();
  const user = AuthService.getCurrentUser();
  const historyPages = useHistory();
  if (!user || !gameID) {
    historyPages.push("/player");
  }
  const boardSize = Utils.boardSize;
  const location = useLocation();
  const { state, dispatch } = useContext(store);
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const [socket, setSocket] = useState(state.socket);

  const classes = useStyles();
  const nameRef = useRef();

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [board, setBoard] = useState({ squares: [] });
  const [roomChat, setRoomChat] = useState([]);
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [moves, setMoves] = useState([]);
  const [winner, setWinner] = useState("");
  const [openSetting, setOpenSetting] = useState(false);
  const [openConfirmLeaveDialog, setOpenConfirmLeaveDialog] = useState(false);

  const handleOnPlayerLeave = (player) => {
    //setRoomUsers(roomUsers.filter((e) => e.user._id !== player));
  };

  const handleOnLeave = () => {
    setOpenConfirmLeaveDialog(true);
  };

  const handleLeave = () => {
    setOpenSetting(false);
    historyPages.goBack();
  };

  useEffect(() => {
    JoinGlobalRoom(socket, {
      id: socket.id,
      _id: user ? user._id : 0,
      username: user.username,
    });
    getGame();
    GetGlobalUsers(socket, dispatch);
  }, []);

  const getGame = () => {
    dispatchLoading({ type: "Set-Loading", isLoading: true });
    const token = JSON.parse(localStorage.getItem("token"));
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return fetch(
      Utils.api +
        Utils.gamePath +
        Utils.historyPath +
        "?" +
        Utils.queryParams({
          userID: user._id,
          gameID: gameID,
        }),
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatchLoading({ type: "Set-Loading", isLoading: false });
        if (result.success) {
          setWinner(result.game.winner);
          setPlayer1(result.game.player1);
          setPlayer2(result.game.player2);
          setMoves(result.game.moves);
          setRoomChat(result.game.chats);
          // Handle Board
          const newBoard = { squares: Array(boardSize * boardSize).fill(null) };
          result.game.moves.forEach((move, index) => {
            newBoard.squares[(move.row - 1) * boardSize + move.col - 1] =
              move.type;
          });
          setBoard(newBoard);
          setCurrentMoveIndex(result.game.moves.length - 1);
        } else {
          historyPages.push("/dashboard");
        }
      })
      .catch((err) => {
        dispatchLoading({ type: "Set-Loading", isLoading: false });
      });
  };

  const handleOnSetting = () => {
    setOpenSetting(true);
  };

  const handleOnCloseSetting = () => {
    setOpenSetting(false);
  };

  const fakeOnClick = (evt) => {};

  const handleHistoryRowClick = (idx) => {
    const newBoard = { squares: Array(boardSize * boardSize).fill(null) };
    moves.forEach((move, index) => {
      if (index > idx) {
        return;
      }
      newBoard.squares[(move.row - 1) * boardSize + move.col - 1] = move.type;
    });
    setBoard(newBoard);
    setCurrentMoveIndex(idx);
  };

  return (
    <Container className={classes.main} component="main" maxWidth="xl">
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
                  user={player1}
                  playerNum={1}
                  type="X"
                  onSetting={handleOnSetting}
                  time={-1}
                  isWinner={winner === "X"}
                />
              </Grid>
              <div className="row" style={{ width: 300 }}>
                <div className={classes.boxChatWrapper}>
                  <CustomBox
                    title="ROOM"
                    data={roomChat}
                    value=""
                    isDisabled={true}
                    ListComponent={ListGlobalChat}
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
                  currentIndex={
                    moves.length === 0
                      ? -1
                      : (moves[currentMoveIndex].row - 1) * boardSize +
                        moves[currentMoveIndex].col -
                        1
                  }
                  winnerList={winner.winnerList}
                  onClick={fakeOnClick}
                />
              </div>
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
                  user={player2}
                  playerNum={2}
                  type="O"
                  time={-1}
                  isWinner={winner === "O"}
                />
              </Grid>
              <Grid item>
                <ListMove
                  moveData={moves}
                  onInvite={fakeOnClick}
                  currentMoveIdx={currentMoveIndex}
                  onRowClick={(i) => handleHistoryRowClick(i)}
                />
              </Grid>
            </Grid>
          </Grid>
          <ConfirmDialog
            open={openConfirmLeaveDialog}
            action={handleLeave}
            setOpen={setOpenConfirmLeaveDialog}
          >
            <div align="center">
              Do you want to <b>Leave</b>
            </div>
          </ConfirmDialog>
          <SettingDialog
            value={openSetting}
            onClose={handleOnCloseSetting}
            onLeave={handleOnLeave}
          />
        </Grid>
      </div>
    </Container>
  );
}
