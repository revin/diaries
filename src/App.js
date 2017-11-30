import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import firebase from 'firebase';

import Header from './components/Header/Header';
import HomePage from './containers/Home/Home';
import PublicTimelinePage from './containers/PublicTimeline/PublicTimeline';
import NewEntryPage from './containers/NewEntry/NewEntry';
import EditEntryPage from './containers/EditEntry/EditEntry';

import auth from './auth';

import './App.css';

window.a = auth;
const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.database();
    this.entriesDb = firebase.database().ref('entries');
    this.usersDb = firebase.database().ref('users');
    this.state = {
      entries: null,
      loading: true
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentWillMount() {
    let entries = this.entriesDb.orderByKey();
    entries.on('value', snapshot => {
      this.setState({
        entries: snapshot.val(),
        loading: false
      });
    });

    let users = this.usersDb;
    users.on('value', snapshot => {
      this.setState({
        users: snapshot.val()
      });
    });
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout().then(() => {
      this.forceUpdate();
    });
  }

  isLoggedIn() {
    return auth.isLoggedIn();
  }

  render() {
    const appProps = {
      auth,
      history,
      db: firebase.database(),
      entries: this.state.entries,
      users: this.state.users,
      loading: this.state.loading
    };

    return (
      <Router history={history} auth={auth}>
        <div className='app'>
          <Header isLoggedIn={this.isLoggedIn} login={this.login} logout={this.logout} />
          <Route exact path='/' render={(props) => <HomePage {...props} {...appProps} />} />
          <Route path='/public' render={(props) => <PublicTimelinePage {...props} {...appProps} />} />
          <Route path='/new' render={(props) => <NewEntryPage {...props} {...appProps} />} />
          <Route path='/edit/:id' render={(props) => <EditEntryPage {...props} {...appProps} />} />
        </div>
      </Router>
    );
  }
}

export default App;
