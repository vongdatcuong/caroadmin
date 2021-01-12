import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SettingIcon from "@material-ui/icons/Settings";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Grid from "@material-ui/core/Grid";
import Constant from "../../../../Utils/index";
import WinnerIcon from "../../../../vendors/images/winner.svg";
import {config} from "../../../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 320,
    
    justifyContent: "center",
  },
  media: {
    padding: theme.spacing(1),
    position: 'relative'
  },
  avatar: {
    borderRadius: "50%",
    height: 130,
    width: 130,
    margin: "0 auto",
  },
  content: {
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  playNowBtn: {
    backgroundColor: "#EA4335",
    margin: '0 auto',
    display: 'block'
  },
}));

export default function JoinPlaying(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <CardContent className={classes.media}>
          <CardMedia
            className={classes.avatar}
            component="img"
            alt="Contemplative Reptile"
            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            
          />
        </CardContent>
        <CardContent className={classes.content}>
          <Button
            variant="contained"
            color="primary"
            className={classes.playNowBtn}
            onClick={props.onClick}
          >
            {config.string.MT_JOINPLAY}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
