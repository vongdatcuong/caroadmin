import React from "react";

// Material UI Core
import Typography from "@material-ui/core/Typography";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

// Material UI Icon
import SendIcon from "@material-ui/icons/Send";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

// Services
import Utils from "../../../Utils";
import ListOnlineUser from "./components/ListGlobalChat";
import HeaderBox from "./components/HeaderBox";

const useStyles = makeStyles((theme) => ({
  box: {
    position: "relative",
    width: "90%",
    height: "325px",
    backgroundColor: "#F6F6F6",
    border: "2px solid #016310",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "5px",
    margin: "0 auto",
  },
  content: {
    display: "inline-block",
    "& span": {
      display: "inline-block",
    },
  },
}));

const CustomBox = ({
  data,
  ListComponent,
  ActionComponent,
  title,
  value,
  onType,
  onSubmit,
  isDisabled = false,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <HeaderBox title={title} />
      <ListComponent data={data} />
      {!isDisabled ? (
        <ActionComponent onSubmit={onSubmit} value={value} onType={onType} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default CustomBox;
