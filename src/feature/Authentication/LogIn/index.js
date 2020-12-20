import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "../../../vendors/images/google.png";
import BackgroundImg from "../../../vendors/images/background-img.jpg";

// Components
import Footer from "../../../components/layouts/Footer/index";

// Constant && Services
import AuthService from "../../../services/auth.service";
import constant from "../../../Utils/index";
import { store } from "../../../context/socket-context";
import { loadingStore } from "../../../context/loading-context";
import {
  JoinGlobalRoom,
  GetGlobalUsers,
} from "../../../services/socket/base-socket";

const useStyles = makeStyles((theme) => ({
  bgImg: {
    width: "100%",
    height: "90%",
    position: "absolute",
    zIndex: "-1",
    backgroundImage: "url(" + BackgroundImg + ")",
    backgroundSize: "80% 100%",
  },
  title: {
    color: "#016310",
    zIndex: "1",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#016310",
  },
  formMessage: {
    textAlign: "center",
    fontSize: "1.1em",
  },
  googleBtn: {
    margin: theme.spacing(0, 0, 2, 0),
    border: "1.5px solid #dd4b39",
    color: "#dd4b39",
  },
  googleIcon: {
    marginRight: "10px",
  },
  facebookIcon: {
    fontSize: "24px !important",
  },
  anchor: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default function LogIn(props) {
  const history = useHistory();
  if (AuthService.getCurrentUser()) {
    history.push("/dashboard");
  }
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const { state, dispatch } = useContext(store);
  const [socket, setSocket] = useState(state.socket);
  const {loadingState, dispatchLoading} = useContext(loadingStore);

  function handleLogIn(event) {
    event.preventDefault();
    if (!username || !password) {
      return;
    }
    dispatchLoading({ type: "Set-Loading", isLoading: true });
    const fetch = AuthService.logIn(username, password).then(
      (result) => {
        if (result.isSuccess) {
          history.push({ pathname: "/dashboard" });
        } else {
          setPassword("");
          // Error message
          setErrMsg(result.message);
        }
        dispatchLoading({ type: "Set-Loading", isLoading: false });
      },
      (error) => {
        if (error) {
          dispatchLoading({ type: "Set-Loading", isLoading: false });
        }
      }
    );
  }

  function handleUsernameChange(evt) {
    setUsername(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <React.Fragment>
      <div className={classes.bgImg}></div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(evt) => handleLogIn(evt)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(evt) => handleUsernameChange(evt)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(evt) => handlePasswordChange(evt)}
            />
            <FormHelperText className={classes.formMessage} error={true}>
              {errorMsg}
            </FormHelperText>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item xs>
                <Link href="/forget-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <a
              href={constant.api + constant.userPath + constant.authGooglePath}
              className={classes.anchor}
            >
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.googleBtn}
              >
                <img src={GoogleIcon} className={classes.googleIcon} />
                Sign In With google
              </Button>
            </a>
            <a
              href={constant.api + constant.userPath + constant.authFbPath}
              className={classes.anchor}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon className={classes.facebookIcon} />}
              >
                Sign In With Facebook
              </Button>
            </a>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
