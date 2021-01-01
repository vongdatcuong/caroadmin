import {
  Avatar,
  Badge,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Switch,
} from "@material-ui/core";
import constant from "../../../../Utils";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
// Material UI Core
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BlockIcon from "@material-ui/icons/Block";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { deepOrange } from "@material-ui/core/colors";
import authService from "../../../../services/auth.service";
import ChatTable from "./ChatTable";
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
  smallAvatar: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    background: 'lightgray',
    borderRadius: 11,
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 5,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));
function GameRow(props) {
  const [row, setRow] = useState(props.row);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const currentUser = authService.getCurrentUser();
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
        <TableCell component="th" scope="row" align="left">
          {row.player1 ? row.player1.name : ""}
        </TableCell>
        <TableCell align="left">
          {row.player2 ? row.player2.name : ""}
        </TableCell>
        <TableCell align="center">
          {row.winner == "X" ? (
            <CloseIcon color="secondary" />
          ) : (
            <RadioButtonUncheckedIcon color="primary" />
          )}
        </TableCell>
        <TableCell align="right">{Math.floor(row.totalTime / 1000)}s</TableCell>
        <TableCell align="center">{row.trophyTransferred}</TableCell>
        <TableCell align="center">{row.created_at.substring(0, 10)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container justify="center" direction="column">
                <Grid item>
                  <Grid container justify="space-around" direction="row">
                    <Grid item>
                      <Grid
                        container
                        justify="center"
                        direction="column"
                        alignItems="center"
                      >
                        <Grid item>
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <CloseIcon
                                color="secondary"
                                className={classes.smallAvatar}
                              />
                            }
                          >
                            {row.player1.avatar ? (
                              <Avatar
                                alt={row.player1.name}
                                src={row.player1.avatar}
                                className={classes.avatar}
                              />
                            ) : (
                              <Avatar
                                className={classes.orange}
                                className={classes.avatar}
                              >
                                {row.player1.name
                                  ? row.player1.name[0]
                                  : row.player1.username[0]}
                              </Avatar>
                            )}
                          </Badge>
                        </Grid>
                        <Grid item>{row.player1.name}</Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        justify="center"
                        direction="column"
                        alignItems="center"
                      >
                        <Grid item>
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <RadioButtonUncheckedIcon
                                color="primary"
                                className={classes.smallAvatar}
                              />
                            }
                          >
                            {row.player2.avatar ? (
                              <Avatar
                                alt={row.player2.name}
                                src={row.player2.avatar}
                                className={classes.avatar}
                              />
                            ) : (
                              <Avatar
                                className={classes.orange}
                                className={classes.avatar}
                              >
                                {row.player2.name
                                  ? row.player2.name[0]
                                  : row.player2.username[0]}
                              </Avatar>
                            )}
                          </Badge>
                        </Grid>
                        <Grid item>{row.player2.name}</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        href="#contained-buttons"
                      >
                        View
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row">
                    <Grid item>
                      <ChatTable chats={row.chats} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

GameRow.propTypes = {
  row: PropTypes.shape({
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    winner: PropTypes.string.isRequired,
    totalTime: PropTypes.number.isRequired,
    trophyTransferred: PropTypes.number.isRequired,
    totalO: PropTypes.number.isRequired,
    totalX: PropTypes.number.isRequired,
  }).isRequired,
};

export default GameRow;
