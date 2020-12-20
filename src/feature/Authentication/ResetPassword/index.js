import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
// Constant && Services
import AuthService from "../../../services/auth.service";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formMessage: {
    textAlign: "center",
    fontSize: "1.1em",
    color: "#4BB543",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    backgroundColor: "#016310",
  },
}));
export default function ForgetPassword(props) {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const classes = useStyles();
  const history = useHistory();
  let { token } = useParams();
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleRePasswordChange = (evt) => {
    setRePassword(evt.target.value);
  };
  const handleSendEmail = (evt) => {
    evt.preventDefault();
    AuthService.resetPassword(token, password)
    .then(res => res.json())
    .then(response => {
      if (response.message) {
        setErrMsg(response.message);
      }
    });
  };
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={(evt) => handleSendEmail(evt)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="re-password"
                  label="Confirm Password"
                  type="password"
                  id="re-password"
                  autoComplete="re-password"
                  value={repassword}
                  error={password !== repassword}
                  helperText={
                    password !== repassword ? "Confirm Password incorrect" : " "
                  }
                  onChange={(evt) => handleRePasswordChange(evt)}
                />
              </Grid>
            </Grid>
            <FormHelperText className={classes.formMessage} error={true}>
              {errorMsg}
            </FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
