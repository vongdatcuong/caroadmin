import React from "react";
import "./DashBoard.css";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import GameAvatar from "../../../vendors/images/game-avatar.png";

// Material UI Icon
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import StarsIcon from "@material-ui/icons/Stars";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMediaWrapper: {
    padding: "10px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  gameID: {
    fontSize: '16px'
  },
  iconHeader: {
    marginRight: "5px",
    verticalAlign: "text-bottom",
  },
  icon: {
    marginRight: "5px",
    verticalAlign: "bottom",
  },
  roomName: {
    height: "50px",
    marginBottom: "5px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: '20px'
  },
  username: {
    color: "#666666",
  },
}));

const GameEntrance = ({ onClick, data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.cardMediaWrapper}>
        <CardMedia
          className={classes.cardMedia}
          image={GameAvatar}
          title="Image title"
        />
      </div>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.roomName}>
          <VideogameAssetIcon className={classes.icon} />
          <b>{data.title}</b>
        </Typography>
        <Typography gutterBottom className={classes.gameID} component="h6">
          <VpnKeyIcon className={classes.iconHeader} />
          <b>{data.roomID}</b>
        </Typography>
        <Typography className={classes.username}>
          <StarsIcon className={classes.icon} />
          {data.creator.username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ width: 100 }}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => onClick(data.roomID)}
        >
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameEntrance;
