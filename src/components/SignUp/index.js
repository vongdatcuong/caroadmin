import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import BackgroundImg from '../../vendors/images/background-img.jpg';

// Components
import Footer from '../../layouts/Footer';

// Constant && Services
import AuthService from '../../services/auth.service';

const useStyles = makeStyles((theme) => ({
  bgImg: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    zIndex: '-1',
    backgroundImage: "url(" + BackgroundImg + ")",
    backgroundSize: '80% 100%'
  },
  title: {
    color: '#016310',
    zIndex: '1'
  },
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    backgroundColor: '#016310'
  },
  formMessageSuccess: {
    textAlign: 'center',
    fontSize: '1.1em',
    color: '#4BB543'
  },
  formMessageFail: {
    textAlign: 'center',
    fontSize: '1.1em',
    color: '#ff1500'
  },
}));

export default function SignUp(props) {
  const history = useHistory();
  if (AuthService.getCurrentUser()){
      history.push('/dashboard');
  }
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMsg, setErrMsg] = useState('');

  function handleUsernameChange(evt){
    setUsername(evt.target.value);
  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value);
  }

  function handleRePasswordChange(evt){
    setRePassword(evt.target.value);
  }

  function handleNameChange(evt){
    setName(evt.target.value);
  }

  function handleEmailChange(evt){
    setEmail(evt.target.value);
  }

  function handleSignUp(event){
    event.preventDefault()
    if (!username || !password || !repassword || (password != repassword) || !name || !email){
        return;
    }
    props.setIsLoading(true);
    const fetch = AuthService.signUp(username, password, name, email).then(result => {
        setIsSuccess(result.isSuccess);
        setErrMsg(result.message);
        props.setIsLoading(false);
    }, (error) => {
      if (error) {
        props.setIsLoading(false);
      }
    });
  }

  return (
    <React.Fragment>
      <div className={classes.bgImg}></div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={(evt) => handleSignUp(evt)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  error={username === ""}
                  helperText={username === "" ? 'Enter Username' : ' '}
                  onChange={(evt) => handleUsernameChange(evt)}
                />
              </Grid>
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
                  error={(password === "" || repassword === "" || password !== repassword)}
                  helperText={(password === "" || repassword === "" || password !== repassword)? 'Confirm Password incorrect' : ' '}
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
                  error={(password === "" || repassword === "" || password !== repassword)}
                  helperText={(password === "" || repassword === "" || password !== repassword)? 'Confirm Password incorrect' : ' '}
                  onChange={(evt) => handleRePasswordChange(evt)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fullName"
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full name"
                  error={name === ""}
                  helperText={name === "" ? 'Enter Name' : ' '}
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
                  error={email === ""}
                  helperText={email === "" ? 'Enter Email' : ' '}
                  onChange={(evt) => handleEmailChange(evt)}
                />
              </Grid>
            </Grid>
            <FormHelperText className={(isSuccess)? classes.formMessageSuccess : classes.formMessageFail} error={!isSuccess}>
                {errorMsg}
            </FormHelperText>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/logIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
