import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function JoinRoomDialog({ value, onJoin, onClose }) {
  const [roomID, setRoomID] = useState("");

  const handleOnChange = (e) => {
    setRoomID(e.target.value);
  };

  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={value}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Join Room</DialogTitle>
        <DialogContent>
          <TextField
            style={{ width: 300 }}
            autoFocus
            margin="dense"
            id="roomID"
            label="Room ID"
            type="text"
            fullWidth
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onJoin(roomID)} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
