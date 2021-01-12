import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { store } from "../../context/socket-context";

// Material UI Icon
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Card, Grid, Paper, Tab, Tabs } from "@material-ui/core";

import {
  GetGlobalUsers,
} from "../../services/socket/base-socket";
import authService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  box: {
    width: 300,
    height: "350px",

    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "5px",
    margin: "0 auto",
  },
  onlineUserWrapper: {
    height: "85%",
    textAlign: "center",
  },
  container: {
    overflow: "auto",
    height: "85%",
  },
  online: {
    color: "green",
  },
  bold: {
    fontWeight: "600",
  },
  more: {
    textAlign: "center",
    color: "#016310",
    fontWeight: "600",
    textDecoration: "underline",
  },
  button: {
    width: 140,
    marginBottom: 10,
  },
  tab: {
    minWidth: 142, // a number of your choice
    width: 142, // a number of your choice
  },
  tableRow: {
    cursor: 'pointer'
  },
  colorX: {
      color: '#ff0000'
  },
  colorO: {
    color: '#0000ff'
    }
}));

function ListMove({ moveData, onInvite, onRowClick, currentMoveIdx}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const [socket, setSocket] = useState(state.socket);
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const user = authService.getCurrentUser();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    if (!state.isCheck && user) {
      GetGlobalUsers(socket, dispatch);
      dispatch({ type: "Check-listener" });
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    {id: 'number', label: 'No.', minWidth: 10, align: 'center', format: (value) => value + "."},
    { id: 'player', label: 'Player', minWidth: 30, align: 'center' },
    { id: 'rowCol', label: '(Row, Col)', minWidth: 50, align: 'center'},
  ];
  
  const rows = moveData.map((move) => Object.assign({}, {
      number: move.number,
      player: move.type,
      rowCol: `(${move.row}, ${move.col})`
  }))
  
  return (
    <div style={{ width: 300 }}>
      <Card className={classes.box}>
        <div className={classes.onlineUserWrapper}>
          <Paper square>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              aria-label="disabled tabs example"
              onChange={handleChange}
            >
              <Tab className={classes.tab} label="History" />
              <Tab className={classes.tab} label="Global" />
            </Tabs>
          </Paper>
            {value === 0 ? (
            <React.Fragment>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, fontWeight: '600' }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                        <TableRow className={classes.tableRow} hover role="checkbox" tabIndex={-1} key={row.code} selected={row.number - 1 === currentMoveIdx} onClick={(evt) =>onRowClick(row.number - 1)}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                <span className={(row.player == "X")? classes.colorX : classes.colorO}>{column.format ? column.format(value) : value}</span>
                                </TableCell> 
                            );
                            })}
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage=""
                    page={page}
                    onChangePage={handleChangePage}
                />
            </React.Fragment>
          ) : (
            <List dense={true}>
              {state.globalUsers.map((user, index) => {
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
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onInvite(user.id)}
                      >
                        <FiberManualRecordIcon
                          fontSize="small"
                          className={classes.online}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ListMove;
