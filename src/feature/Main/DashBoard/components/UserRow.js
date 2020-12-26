import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Switch,
} from "@material-ui/core";
import constant from "../../../../Utils";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
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
import PropTypes from "prop-types";
import React, { useState } from "react";
import { deepOrange } from "@material-ui/core/colors";
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
function UserRow(props) {
  const [row, setRow] = useState(props.row);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [isActive, setIsActive] = useState(props.row.isActive);
  const [isBlocked, setIsBlocked] = useState(props.row.isBlocked);

  const onChangeIsActive = (e) => {
    setIsActive(!isActive);
  };
  const onChangeIsBlocked = (e) => {
    setIsBlocked(!isBlocked);
  };
  const onReset = () => {
    setIsActive(row.isActive);
    setIsBlocked(row.isBlocked);
  };
  const onSave = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userUpdateData = {
      isActive: isActive,
      isBlocked: isBlocked,
    };
    console.log(userUpdateData);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        data: Buffer.from(JSON.stringify(userUpdateData)).toString("base64"),
      }),
    };
    fetch(constant.api + constant.userPath + "/" + row._id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.payload) {
          setRow(result.payload);
          setIsActive(result.payload.isActive);
          setIsBlocked(result.payload.isBlocked);
        }
        console.log(result);
      })
      .catch((error) => {
        if (error) {
          console.log("error");
        }
      });
  };
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.username}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">
          {row.isActive ? (
            <VerifiedUserIcon color="primary" />
          ) : (
            <RemoveCircleOutlineIcon color="secondary" />
          )}
        </TableCell>
        <TableCell align="right">
          {row.isBlocked ? (
            <BlockIcon color="secondary" />
          ) : (
            <CheckCircleIcon color="primary" />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Information
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item>
                  {row.avatar ? (
                    <Avatar
                      alt={row.name}
                      src={row.avatar}
                      className={classes.avatar}
                    />
                  ) : (
                    <Avatar
                      className={classes.orange}
                      className={classes.avatar}
                    >
                      {row.name ? row.name[0] : row.username[0]}
                    </Avatar>
                  )}
                </Grid>
              </Grid>

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
              <Grid container direction="row" justify="center">
                <Grid item alignItems="center" direction="row">
                  <FormControlLabel
                    style={{ width: 140, marginRight: 10, marginLeft: 10 }}
                    control={
                      <Switch checked={isActive} onChange={onChangeIsActive} />
                    }
                    label="Is Active"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item alignItems="center" direction="row">
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
              <Grid
                container
                style={{ marginTop: 10 }}
                direction="row"
                justify="center"
              >
                <Grid item>
                  <Button
                    title="Save"
                    variant="contained"
                    color="primary"
                    style={{ width: 140, marginRight: 10 }}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    title="Save"
                    variant="contained"
                    color="secondary"
                    style={{ width: 140 }}
                    onClick={onReset}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

UserRow.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isBlocked: PropTypes.bool.isRequired,
    win: PropTypes.number.isRequired,
    lose: PropTypes.number.isRequired,
    draw: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserRow;
