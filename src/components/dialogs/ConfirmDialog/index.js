import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

// Service
import constant from "../../../Utils/index";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.5em",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    minWidth: "350px",
    textAlign: "center",
  },
  action: {
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  contentText: {
    textAlign: "left",
    wordWrap: "break-word",
  },
}));

export default function ConfirmDialog(props) {
  const classes = useStyles();

  const handleOK = async () => {
    await props.action();
    props.setOpen(false);
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          className={classes.title}
          component="h1"
          id="form-dialog-title"
        >
          Confirmation
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.contentText}>
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={handleOK}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            OK
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
