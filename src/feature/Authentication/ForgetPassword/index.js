import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
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
  const [email, setEmail] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handleSendEmail = async (evt) => {
    evt.preventDefault();
    AuthService.sendRequestResetEmail(email)
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          setErrMsg(response.message + " Please check your email.");
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
              Forget Password
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
