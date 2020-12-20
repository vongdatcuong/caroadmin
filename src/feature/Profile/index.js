import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// Material Icons
import BorderColorIcon from "@material-ui/icons/BorderColor";

// Components
import Footer from "../../components/layouts/Footer";

// Constant && Services
import authHeader from "../../services/auth-header.js";
import AuthService from "../../services/auth.service";
import constant from "../../Utils/index";
import { loadingStore } from "../../context/loading-context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    color: "#ffffff",
    backgroundColor: theme.palette.secondary.main,
    fontSize: "60px",
    padding: "5px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
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
  formControl: {
    color: "#555555 !important",
  },
  updateIcon: {
    marginLeft: "10px",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

export default function SignUp(props) {
  const history = useHistory();
  const user = AuthService.getCurrentUser();
  if (!user) {
    history.push("/logIn");
  }
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const nameRef = useRef();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMsg, setErrMsg] = useState("");
  const {loadingState, dispatchLoading} = useContext(loadingStore);

  const toggleUpdate = (evt) => {
    setDisabled(!disabled);
    const timeout = setTimeout(() => {
      nameRef.current.focus();
    }, 100);
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleGenderChange = (evt) => {
    setGender(evt.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!name || !email || !gender) {
      return;
    }
    dispatchLoading({ type: "Set-Loading", isLoading: true });
    const requestOptions = {
      method: "POST",
      headers: Object.assign(
        {
          "Content-Type": "application/json",
        },
        authHeader()
      ),
      body: JSON.stringify({
        name: name,
        email: email,
        gender: gender,
      }),
    };
    return fetch(
      constant.api + constant.userPath + constant.updateProfilePath,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.isSuccess) {
            AuthService.updateCurrentUser({
              name: name,
              email: email,
              gender: gender,
            });
          }
          setIsSuccess(result.isSuccess);
          setErrMsg(result.message);
          dispatchLoading({ type: "Set-Loading", isLoading: false });
        },
        (error) => {
          if (error) {
            dispatchLoading({ type: "Set-Loading", isLoading: false });
          }
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <AccountBoxIcon className={classes.avatar}></AccountBoxIcon>
        <Typography component="h1" variant="h5">
          Your Profile
          <BorderColorIcon
            className={classes.updateIcon}
            onClick={(evt) => toggleUpdate(evt)}
          />
        </Typography>
        <form className={classes.form} onSubmit={(evt) => handleUpdate(evt)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fullName"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full name"
                autoFocus
                inputRef={nameRef}
                InputProps={{
                  className: classes.formControl,
                }}
                disabled={disabled}
                value={name}
                error={name === ""}
                helperText={name === "" ? "Enter Name" : " "}
                onChange={(evt) => handleNameChange(evt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Email"
                InputProps={{
                  className: classes.formControl,
                }}
                disabled={disabled}
                value={email}
                error={email === ""}
                helperText={email === "" ? "Enter Email" : " "}
                onChange={(evt) => handleEmailChange(evt)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel
                    disabled={disabled}
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    disabled={disabled}
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <FormHelperText
            className={
              isSuccess ? classes.formMessageSuccess : classes.formMessageFail
            }
            error={!isSuccess}
          >
            {errorMsg}
          </FormHelperText>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabled}
            className={classes.submit}
          >
            Update
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/dashBoard" variant="body2">
                {"Back to Dashboard"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
