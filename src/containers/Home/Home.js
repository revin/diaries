import React, { Component } from 'react';

import EntriesList from '../../components/EntriesList/EntriesList';

import './Home.css';

function userEntries(entries, user) {
  if (entries && user) {
    return Object.keys(entries)
      .filter(key => entries[key].owner === user.uid)
      .map(key => { return {key: key, entry: entries[key]}; })
      .reverse();
  } else {
    return [];
  }
}

class HomePage extends Component {
  constructor() {
    super();
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(entry) {
    this.props.db.ref('entries/' + entry.key).remove().catch(err => {
      console.error('error deleting', err);
    })
  }

  renderEntries(entries, user) {
    if (!(entries && user)) {
      return null;
    }
    return (
      <EntriesList
        entries={userEntries(entries, user)}
        showUsers={false}
        loading={this.props.loading}
        deleteEntry={this.deleteEntry}
      />
    );
  }

  render() {
    if (!this.props.auth.isLoggedIn()) {
      return (
        <div className='app-page'>
          <h2>Welcome!</h2>
          <p>Please login with a Google account to write fabulous diary entries.</p>
        </div>
      );
    }
    return (
      <div className='app-page'>
        <h2>Your Diary</h2>
        { this.renderEntries(this.props.entries, this.props.auth.getUser()) }
      </div>
    );
  }
}

export default HomePage;
