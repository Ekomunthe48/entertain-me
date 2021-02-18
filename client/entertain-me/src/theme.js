import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#B5E2FA',
      light: '#e8ffff',
      dark: '#84b0c7'
    },
    secondary: {
      main: '#102c5c',
      light: '#43548a',
      dark: '#000032',
    },
    third: {
      main: '#cfd8dc',
      light: '#ffffff',
      dark: '#9ea7aa',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F9F7F3',
    },
  },
});

export default theme;