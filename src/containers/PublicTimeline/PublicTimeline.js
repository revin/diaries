import React, { Component } from 'react';

import EntriesList from '../../components/EntriesList/EntriesList';

import './PublicTimeline.css';

function publicEntries(entries) {
  if (entries) {
    return Object.keys(entries)
      .filter(key => entries[key].is_public)
      .map(key => { return {key: key, entry: entries[key]}; })
      .reverse();
  } else {
    return [];
  }
}

class PublicTimelinePage extends Component {
  renderEntries(entries, users) {
    if (!entries) {
      return null;
    }
    return (
      <EntriesList readOnly={true} entries={publicEntries(entries)} users={users} loading={this.props.loading} />
    );
  }

  render() {
    if (!this.props.auth.isLoggedIn()) {
      return (
        <div className='app-page'>
          <h2>Welcome!</h2>
          <p>Please login with a Google account to view the public timeline.</p>
        </div>
      );
    }
    return (
      <div className='app-page'>
        <h2>Public Diaries</h2>
        { this.renderEntries(this.props.entries, this.props.users) }
      </div>
    );
  }
}

export default PublicTimelinePage;

