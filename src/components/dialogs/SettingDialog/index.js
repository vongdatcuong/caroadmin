import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Settings from "../../../feature/Main/Game/components/settings";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../../../config";

const useStyles = makeStyles((theme) => ({
  withDrawBtn: {
    flex: 1,
    width: 290,
    background: "#FBBC05",
    color: "white",
    alignItems: "flex-end",
    display: "block",
    marginBottom: theme.spacing(2),
  },
  timeButton: {
    flex: 1,
    width: 290,
    background: "red",
    color: "white",
    alignItems: "flex-end",
  },
}));

export default function SettingRoomDialog({
  value,
  onWithdraw,
  onLeave,
  onClose,
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={value}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <div style={{ height: 300 }}>
          <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
            {config.string.MT_SETTING}
          </DialogTitle>
          <DialogContent>
            {onWithdraw ? (
              <Button onClick={onWithdraw} className={classes.withDrawBtn}>
                {config.string.MT_WITHDRAW}
              </Button>
            ) : (
              ""
            )}
            <Button onClick={onLeave} className={classes.timeButton}>
              {config.string.MT_LEAVE_ROOM}
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
