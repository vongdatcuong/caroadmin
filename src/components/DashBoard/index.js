import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './DashBoard.css';
// Material UI Core
import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Material Icons

// Components
import ConfirmDialog from '../../dialogs/ConfirmDialog';

// Service
import authHeader from '../../services/auth-header.js';
import AuthService from '../../services/auth.service';
import constant from '../../Utils';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    maxWidth: '1400px'
  }
}));


const DashBoard = (props) => {
  const history = useHistory();
  if (!AuthService.getCurrentUser()){
      //history.push('/logIn');
  }

  const classes = useStyles();
  const user = AuthService.getCurrentUser();
  
  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Typography gutterBottom variant="h4" component="h2" className="title-green" style={{fontWeight: '500'}}>
          Go Go Go !!!
        </Typography>            
            </Container>
    </main>
  );
}

export default DashBoard;
