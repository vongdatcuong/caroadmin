import { Grid, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {loadingStore} from "../../../context/loading-context";
// Material UI Icon
// Components
// Service
import AuthService from "../../../services/auth.service";
import constant from "../../../Utils";
import TablePaginationActions from "../../../components/TablePaginationActions";
import GameRow from "./components/GameRow";
import Utils from "../../../Utils";
const useStyles = makeStyles((theme) => ({
  root1: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(6),
    maxWidth: "1400px",
  },
  search: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const GameManager = (props) => {
  const history = useHistory();
  if (!AuthService.getCurrentUser()) {
    history.push("/logIn");
  }
  const classes = useStyles();
  const {loadingState, dispatchLoading} = useContext(loadingStore);
  const [allGameData, setAllGameData] = React.useState([]);
  const [gameData, setGameData] = React.useState([]);
  const user = AuthService.getCurrentUser();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [title, setTitle] = React.useState("Game Management");
  const { userid } = useParams();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value == "") {
      setGameData(allGameData);
      return;
    }
    const value = e.target.value.toLowerCase().trim();
    let data = allGameData.filter(
      (n) =>
        n.winner.toLowerCase().includes(value) ||
        n.player1.username.toLowerCase().includes(value) ||
        n.player2.username.toLowerCase().includes(value) ||
        n.player1.name.toLowerCase().includes(value) ||
        n.player2.name.toLowerCase().includes(value) ||
        n.trophyTransferred == parseInt(value) ||
        n.created_at.toString().includes(value) ||
        Math.floor(n.totalTime / 1000) == parseInt(value)
    );
    setGameData(data);
  };
  const fetchAllGame = () => {
    dispatchLoading({ type: "Set-Loading", isLoading: true });
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(constant.api + constant.gamePath, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setAllGameData(result.data);
          setGameData(result.data);
        }
        dispatchLoading({ type: "Set-Loading", isLoading: false });
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          console.log("error");
        }
        dispatchLoading({ type: "Set-Loading", isLoading: false });
      });
  };
  const fetchUserGame = (user_id) => {
    dispatchLoading({ type: "Set-Loading", isLoading: true });
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = constant.api + constant.userPath + "/" + user_id;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.data) {
          setAllGameData(result.data.games);
          setGameData(result.data.games);
          setTitle(`Games of ${result.data.name} (${result.data.username})`);
        }
        dispatchLoading({ type: "Set-Loading", isLoading: false });
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          console.log("error");
        }
        dispatchLoading({ type: "Set-Loading", isLoading: false });
      });
  }
  useEffect(() => {
    setTitle("Game Management");
    if (userid) {
      fetchUserGame(userid);
    }
    else {
      fetchAllGame();
    }
  }, []);

  return (
    <main>
      <Container className={classes.container} maxWidth="md">
        <Grid container justify="center">
          <Grid item>
            <h1 style={{ marginBottom: 20 }}>{title}</h1>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <form className={classes.search} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Search"
                value={searchText}
                onChange={onChangeSearch}
              />
            </form>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Player X</TableCell>
                <TableCell align="left">Player O</TableCell>
                <TableCell align="center">Winner</TableCell>
                <TableCell align="right">Total Time</TableCell>
                <TableCell align="center">Trophy</TableCell>
                <TableCell align="center">At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <GameRow key={row._id} row={row} />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  colSpan={7}
                  count={gameData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </main>
  );
};

export default GameManager;
