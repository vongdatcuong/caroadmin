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
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// Material UI Icon
// Components
// Service
import AuthService from "../../../services/auth.service";
import constant from "../../../Utils";
import TablePaginationActions from "../../../components/TablePaginationActions";
import StaffRow from "./components/GameRow";
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
  const [allGameData, setAllGameData] = React.useState([]);
  const [gameData, setGameData] = React.useState([]);
  const user = AuthService.getCurrentUser();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    /*let data = allGameData.filter(
      (n) =>
        n.name.toLowerCase().includes(value) ||
        n.username.toLowerCase().includes(value) ||
        n.email.toLowerCase().includes(value) ||
        n.created_at.toString().toLowerCase().includes(value) ||
        (value.startsWith("block") && n.isBlocked) ||
        (value.startsWith("verif") && n.isActive) ||
        n.user_type.toLowerCase().includes(value)
    );
    setGameData(data);*/
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    console.log(constant.api + constant.gamePath);
    fetch(constant.api + constant.gamePath, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.data) {
          setAllGameData(result.data);
          setGameData(result.data);
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          console.log("error");
        }
      });
  }, []);

  return (
    <main>
      <Container className={classes.container} maxWidth="md">
        <Grid container justify="center">
          <Grid item>
            <h1 style={{ marginBottom: 20 }}>Staff Management</h1>
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
                  <StaffRow key={row._id} row={row} />
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
