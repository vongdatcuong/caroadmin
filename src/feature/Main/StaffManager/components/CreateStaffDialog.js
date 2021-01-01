import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import { Switch, FormControlLabel } from "@material-ui/core";
import FullScreenDialog from "../../../../components/FullScreenDialog";
import { loadingStore } from "../../../../context/loading-context";
// Constant && Services
import AuthService from "../../../../services/auth.service";
import BackgroundImg from "../../../../vendors/images/background-img.jpg";

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
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    backgroundColor: "#016310",
  },
  formMessageSuccess: {
    textAlign: "center",
    fontSize: "1.1em",
    color: "#4BB543",
  },
  formMessageFail: {
    textAlign: "center",
    fontSize: "1.1em",
    color: "#ff1500",
  },
}));
export default function CreateStaffDialog(props) {
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMsg, setErrMsg] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(
    false
  );
  const onChangeIsAdmin = (e) => {
    setIsAdmin(!isAdmin);
  };
  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };
  const onChangeIsActive = () => {
    setIsActive(!isActive);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handleSave = (event) => {
    event.preventDefault();
    if (
      !username ||
      !password ||
      !name ||
      !email
    ) {
      return;
    }
    dispatchLoading({ type: "Set-Loading", isLoading: true });
    const fetch = AuthService.signUp(username, password, name, email, isAdmin, isActive).then(
      (result) => {
        setIsSuccess(result.isSuccess);
        if (result.isSuccess) {
          props.onSave();
        }
        setErrMsg(result.message);
        dispatchLoading({ type: "Set-Loading", isLoading: false });
        setUsername("");
        setPassword("");
        setIsActive(true);
        setIsAdmin(false);
        setIsSuccess(false);
        setName("")
        setEmail("");
      },
      (error) => {
        if (error) {
          dispatchLoading({ type: "Set-Loading", isLoading: false });
        }
      }
    );
  };
  return (
    <FullScreenDialog
      title="CREATE NEW STAFF"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form className={classes.form} onSubmit={(evt) => handleSave(evt)}>
        <Grid
          container
          justify="center"
          alignContent="center"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Grid item style={{ width: "100%" }}>
            <Grid
              container
              spacing={2}
              justify="center"
              alignContent="center"
              style={{ width: "100%" }}
              direction="column"
            >
              <Grid item>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={(evt) => handleUsernameChange(evt)}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="fullName"
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full name"
                  value={name}
                  onChange={(evt) => handleNameChange(evt)}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  type="email"
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(evt) => handleEmailChange(evt)}
                />
              </Grid>
              <Grid item justify="center">
                <FormControlLabel
                  control={
                    <Switch checked={isActive} onChange={onChangeIsActive} />
                  }
                  label="Is Active"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item justify="center">
                <FormControlLabel
                  control={
                    <Switch
                      title="Is Admin"
                      checked={isAdmin}
                      onChange={onChangeIsAdmin}
                    />
                  }
                  label="Is Admin"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item>
                <FormHelperText
                  className={
                    isSuccess
                      ? classes.formMessageSuccess
                      : classes.formMessageFail
                  }
                  error={!isSuccess}
                >
                  {errorMsg}
                </FormHelperText>
              </Grid>

              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Staff
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FullScreenDialog>
  );
}
