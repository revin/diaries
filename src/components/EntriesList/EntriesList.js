import React from 'react';
import { Link } from 'react-router-dom';

import './EntriesList.css';

function renderAuthor(entryAuthor, showUsers, users) {
  if (showUsers || users) {
    return <span className='entry-author'>{ users ? users[entryAuthor] : 'Loading...' }</span>
  } else {
    return null;
  }
}

function renderControls(entry, readOnly, deleteEntry) {
  if (readOnly) {
    return null;
  }
  return (
    <span className='edit-controls'>
      <Link to={'/edit/' + entry.key}>Edit</Link>
      <button onClick={() => deleteEntry(entry)}>Delete</button>
    </span>
  );
}

class EntriesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {entries, users, showUsers, readOnly} = this.props;
    return (
      <section className='timeline'>
        { (this.props.loading && !entries) ?
          <div>Loading&hellip;</div>
        :
          <ul className='entries-list'>
            { entries.map(entry => {
              return (
                <li key={entry.key}>
                  <span className='entry-text'>{ entry.entry.text }</span>
                  { renderAuthor(entry.entry.owner, showUsers, users) }
                  { renderControls(entry, readOnly, this.props.deleteEntry) }
                </li>
              );
            }) }
          </ul>
        }
      </section>
    );
  }
}

export default EntriesList;
