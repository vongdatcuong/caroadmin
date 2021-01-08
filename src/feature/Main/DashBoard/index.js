import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import constant from "../../../Utils";
// Material UI Core
import { makeStyles, rgbToHex, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
// Material UI Icon

// Components

// Service
import AuthService from "../../../services/auth.service";
import { Button, Checkbox, FormControlLabel, Grid, Switch } from "@material-ui/core";
import TablePaginationActions from "../../../components/TablePaginationActions"
import UserRow from "../PlayerManager/components/UserRow"
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
}));
const rows = [
  createData("Frozen yoghurt", "159", "aaa", "bbb", true, true),
  createData("Ice cream sandwich", "237", "aaa", "bbb", false, false),
  createData("Eclair", "262", "aaa", "bbb", false, false),
  createData("Cupcake", "305", "aaa", "bbb", true, false),
  createData("Gingerbread", "356", "aaa", "bbb", true, false),
];
function createData(username, name, email, rank, isActive, isBlocked) {
  return {
    username,
    name,
    email,
    rank,
    isActive,
    isBlocked,
    win: 0,
    lose: 0,
    draw: 0,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

const DashBoard = (props) => {
  const history = useHistory();
  if (!AuthService.getCurrentUser()) {
    history.push("/logIn");
  }
  const classes = useStyles();
  const [playerData, setPlayerData] = React.useState([]);
  const user = AuthService.getCurrentUser();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let emptyRows =
    rowsPerPage - Math.min(rowsPerPage, playerData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    fetch(constant.api + constant.userPath, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success === true) {
          emptyRows =
            rowsPerPage -
            Math.min(rowsPerPage, result.users.length - page * rowsPerPage);
          setPlayerData(result.users);
          console.log(playerData);
        }
      })
      .catch((error) => {
        if (error) {
          console.log("error");
        }
      });
  }, []);

  return (
    <main>
      <Container className={classes.container} maxWidth="md">
        <Grid container justify="center">
          <Grid item>
            <h1 style={{ marginBottom: 20 }}>Player Management</h1>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Active</TableCell>
                <TableCell align="right">Blocked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playerData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserRow key={row.name} row={row} />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={playerData.length}
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

export default DashBoard;
