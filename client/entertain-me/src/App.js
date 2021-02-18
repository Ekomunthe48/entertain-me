import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "@apollo/client";
import client from './config/apolloclient'
import { ThemeProvider } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import AddMovies from './pages/addMovie';
import EditMovie from './pages/editMovie';
import DetailMovies from './pages/DetailMovies';
import theme from './theme'
import FavMovies from './pages/favMovies';
import Footer from './components/Footer'
import DetailSeries from './pages/DetailSeries';
import AddSeries from './pages/addSerie';
import EditSerie from './pages/editSerie';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navigation />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/series'>
                <TvSeries />
              </Route>
              <Route exact path='/series/create'>
                <AddSeries />
              </Route>
              <Route exact path='/series/:id'>
                <DetailSeries />
              </Route>
              <Route exact path='/series/edit/:id'>
                <EditSerie />
              </Route>
              <Route exact path='/movies'>
                <Movies />
              </Route>
              <Route exact path='/movies/create'>
                <AddMovies />
              </Route>
              <Route exact path='/movies/:id'>
                <DetailMovies />
              </Route>
              <Route exact path='/movies/edit/:id'>
                <EditMovie />
              </Route>
              <Route exact path='/favorite/'>
                <FavMovies />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
