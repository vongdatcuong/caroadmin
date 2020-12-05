import React from 'react';
import { useHistory } from "react-router-dom";
import './Header.css';
// Material UI Core
import AppBar from '@material-ui/core/AppBar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

// Constant && Services
import AuthService from '../../services/auth.service';

const useStyles = makeStyles((theme) => ({
  logo: {
    fontSize: '30px',
    fontFamily: 'ThirstyScript',
    fontWeight: 'bold',
    color: '#ffffff',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  icon: {
    marginRight: theme.spacing(2),
    fontFamily: 'ThirstyScript',
    fontSize: '40px',
    cursor: 'pointer',
  },
  rightNavBar: {
    position: 'absolute',
    right: '3px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  navBarHeading: {
    fontFamily: 'Calibri',
    fontSize: '1.9em',
    marginRight: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: '#555555'
    }
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: '#555555',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const user = AuthService.getCurrentUser();
  const navHeadings = [];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOut(){
    AuthService.logOut();
    handleClose();
    history.push('/logIn');
  }

  if (user){
    navHeadings.push(<Typography variant="h6" color="inherit" noWrap className={classes.navBarHeading}>
                      Hello, {user.name} !!!
                    </Typography>)
    navHeadings.push(<div>
                    <AccountCircleIcon 
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      className={classes.icon}  />
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link href="/profile" className={classes.link}>
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                  </div>);
  }

  return (
    <AppBar position="relative" className="main-bg-green">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link href="/dashboard" className={classes.logo}>
              Caro Online
            </Link>
          </Typography>
          <div className={classes.rightNavBar}>
            {navHeadings}
            
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
