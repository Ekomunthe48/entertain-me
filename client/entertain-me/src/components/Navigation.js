import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { navStyles } from '../config/styleUI'
import { Link } from 'react-router-dom';

const Navigation = () => {
    const classes = navStyles();

    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" className={classes.title} color='primary'>
            <Link to='/' className={classes.listColor}>
              Entertain-Me
            </Link>
          </Typography>
          <Link to='/movies' className={classes.listColor}>
            <Button color="inherit">Movies</Button>
          </Link>
          <Link to='/series' className={classes.listColor}>
            <Button color="inherit">Series</Button>
          </Link>
          <Link to='/favorite' className={classes.listColor}>
            <Button color="inherit">Favorite</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
    );
};

export default Navigation;