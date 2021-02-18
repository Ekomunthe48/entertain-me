import { makeStyles } from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
    root: {
      color: 'black',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginRight: 'auto',
      fontFamily: "'Orbitron', sans-serif"
    },
    listColor: {
      color: '#102c5c',
      textDecoration: 'none !important',
      fontFamily: "'Orbitron', sans-serif",
      '&:hover': {
        color: "#43548a",
      },
    },
  }));

export const cardStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 10
    },
    media: {
      width: 345,
      height: 500,
      padding: 5,
    },
    content: {
      height: 300
    },
    action: {
      display: 'flex',
      justifyContent: 'center'
    },
    listColor: {
      color: '#102c5c',
      textDecoration: 'none !important',
      '&:hover': {
        color: "#43548a",

      },
    },
  });

export const homeStyles = makeStyles((theme) => ({
    root: {
      marginTop: 20
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      marginBottom: 10
    },
    addButton: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: 20
    }
  }));

  export const formStyles = makeStyles((theme) => ({
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flexDirection: 'col',
      overflow: 'hidden',
    },
    root: {
      margin: '20px 0px',
    }
  }));

export const detailStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));