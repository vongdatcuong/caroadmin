import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// Constant && Services
import AuthService from "../../../services/auth.service";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
export default function AccountValidation(props) {
  const [errorMsg, setErrMsg] = useState("");
  const classes = useStyles();
  let { token } = useParams();
  AuthService.activeAccount(token)
    .then((res) => res.json())
    .then((response) => {
      if (response.message) {
        setErrMsg(response.message);
      }
    });
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h1>{errorMsg} </h1>
          <h2>
            <Link to="/logIn">Sign In Now</Link>
          </h2>
        </div>
      </Container>
    </React.Fragment>
  );
}
