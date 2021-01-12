import {
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from "@material-ui/core";
// Material UI Icon
import SendIcon from "@material-ui/icons/Send";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import React from "react";
import { config } from "../../../../config";

const useStyles = makeStyles((theme) => ({
  inputChat: {
    position: "absolute",
    bottom: "10px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "95%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  sendBtn: {
    color: "#016310",
  },
  emojiIcon: {
    color: "#FBBC05",
  },
}));

function ChatBox({ onSubmit, value, onType }) {
  const classes = useStyles();
  return (
    <Paper className={classes.inputChat}>
      <form onSubmit={onSubmit}>
        <InputBase
          value={value}
          onChange={onType}
          className={classes.input}
          placeholder={config.string.PH_SEND_MESSAGE}
          inputProps={{ "aria-label": "send message" }}
        />
      </form>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="send"
        onClick={onSubmit}
      >
        <SendIcon className={classes.sendBtn} />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" flexItem />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="emoji"
      >
        <EmojiEmotionsIcon className={classes.emojiIcon} />
      </IconButton>
    </Paper>
  );
}

export default ChatBox;
