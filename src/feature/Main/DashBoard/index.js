import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import constant from "../../../Utils";
// Material UI Core
import { makeStyles, rgbToHex, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BlockIcon from "@material-ui/icons/Block";
import authHeader from "../../../services/auth-header.js";
// Material UI Icon

// Components

// Service
import AuthService from "../../../services/auth.service";
import { Button, Checkbox, FormControlLabel, Grid, Switch } from "@material-ui/core";
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
function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root1}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
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
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [isActive, setIsActive] = useState(row.isActive);
  const [isBlocked, setIsBlocked] = useState(row.isBlocked);
  const onChangeIsActive = (e) => {
    setIsActive(!isActive);
  }
  const onChangeIsBlocked = (e) => {
    setIsBlocked(!isBlocked);
  };
  const onReset = () => {
    setIsActive(row.isActive);
    setIsBlocked(row.isBlocked);
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.isActive ? "a" : "i"}</TableCell>
        <TableCell align="right">{row.isBlocked ? "a" : "i"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell align="right">Win</TableCell>
                    <TableCell align="right">Lose</TableCell>
                    <TableCell align="right">Draw</TableCell>
                    <TableCell align="right">Total match</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.rank}>
                    <TableCell component="th" scope="row">
                      {row.rank}
                    </TableCell>
                    <TableCell align="right">{row.win}</TableCell>
                    <TableCell align="right">{row.lose}</TableCell>
                    <TableCell align="right">{row.draw}</TableCell>
                    <TableCell align="right">
                      {row.win + row.lose + row.draw}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant="h6" gutterBottom component="div">
                Account
              </Typography>
              <Grid container>
                <Grid item alignItems="center" direction="row">
                  <Grid item>
                    <FormControlLabel
                      style={{ width: 140 }}
                      control={
                        <Switch
                          checked={isActive}
                          onChange={onChangeIsActive}
                        />
                      }
                      label="Is Active"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
                <Grid item alignItems="center" direction="row">
                  <Grid item>
                    <FormControlLabel
                      style={{ width: 140 }}
                      control={
                        <Switch
                          title="Is Blocked"
                          checked={isBlocked}
                          onChange={onChangeIsBlocked}
                        />
                      }
                      label="Is Blocked"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{marginTop: 10}}>
                <Button
                  title="Save"
                  variant="contained"
                  color="primary"
                  style={{ width: 120, marginRight: 10 }}
                >
                  Save
                </Button>
                <Button
                  title="Save"
                  variant="contained"
                  color="secondary"
                  style={{ width: 120 }}
                  onClick={onReset}
                >
                  Reset
                </Button>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
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
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
        if (!result.success) {
        } else {
          setPlayerData(result.users);
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
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Username</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Active</TableCell>
                <TableCell align="right">Blocked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row key={row.name} row={row} />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2, 4, 6, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
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
