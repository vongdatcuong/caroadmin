import React from "react";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 320,
    flex: 1,
    justifyContent: "center",
  },
  media: {
    padding: theme.spacing(1),
  },
  timeButton: {
    flex: 1,
    background: "green",
    color: "white",
    width: 139,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    borderRadius: "50%",
    height: 130,
    width: 130,
    margin: '0 auto'
  },
  content: {
    padding: theme.spacing(1),
    justifyContent: "center",
  }
}));

export default function UserInfo(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {props.user !== null ? (
        <div>
          <CardContent className={classes.media}>
            <CardMedia
              className={classes.avatar}
              component="img"
              alt="Contemplative Reptile"
              image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
              title={props.user.username}
            />
          </CardContent>
          <CardContent className={classes.content}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ textAlign: "center", color: '#016310' }}
            >
              {props.user.username || '...'}
            </Typography>
            <Grid container align="left">
              <Grid item md={6}>
                <Typography style={{ fontSize: 16 }}>
                  Rank: {props.user.rank || 'NA'}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography style={{ fontSize: 16 }}>
                  Point: {props.user.point || 0}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography style={{ fontSize: 16 }}>
                  Win: {props.user.win || 0}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography style={{ fontSize: 16 }}>
                  Lose: {props.user.lose || 0}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ alignSelf: "flex-end" }}>
            <IconButton
              children={
                (props.playerNum == 2)? 
                props.type === "X" ? (
                  <CloseIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                ) : ''
              }
              color="primary"
            />
            <Button
              className={classes.timeButton}
              endIcon={<QueryBuilderIcon />}
            >
              20:00
            </Button>
            <IconButton
              children={
                (props.playerNum == 1)? 
                props.type === "X" ? (
                  <CloseIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                ) : ''
              }
              color="primary"
            />
          </CardActions>
        </div>
      ) : null}
    </Card>
  );
}
