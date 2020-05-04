import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import CreateData from './components/createData/createData';
import GetResults from './components/getResults/getResults';
import './App.css';


class App extends PureComponent {
  state = {
    loggedIn: false,
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/home' exact component={LandingPage} />
          <Route path = '/createdata' exact component = {CreateData} />
          <Route path = '/getresults' exact component = {GetResults} />
        </Switch>
      </Router>
    )
  }
}

export default App;
