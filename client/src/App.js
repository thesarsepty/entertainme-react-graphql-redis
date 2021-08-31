import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import Details from './pages/Details'
import Navbar from './components/Navbar'
import UpdateMovie from './pages/UpdateMovie'
import { ApolloProvider } from '@apollo/client'
import client from './config'
import { 
  BrowserRouter as Router,
  Switch,
  Route 
} from 'react-router-dom'
import Favourite from './pages/Favourite'

function App() {
  return (
  <ApolloProvider client = { client }>
    <Router>
        <Navbar />
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route path = "/addMovie">
            <AddMovie />
          </Route>
          <Route path = "/details/:id">
            <Details />
          </Route>
          <Route path = "/update">
            <UpdateMovie />
          </Route>
          <Route path = "/favourite">
            <Favourite />
          </Route>
        </Switch>
    </Router>
  </ApolloProvider>
  );
}

export default App;
