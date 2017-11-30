import React, { Component } from 'react';

import './NewEntry.css';

class NewEntryPage extends Component {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCancel(evt) {
    evt.preventDefault();
    this.props.history.goBack();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    let entriesDb = this.props.db.ref('entries');

    const entry = {
      owner: this.props.auth.getUser().uid,
      text: data.get('entryText'),
      is_public: !!data.get('is_public')
    };

    entriesDb.push(entry).then(result => {
      this.props.history.push('/');
    }).catch(err => {
      console.error('Error saving entry', err);
    });
  }

  render() {
    return (
      <form className='app-page entry-form' onSubmit={ this.handleSubmit }>
        <h2>New Entry</h2>
        <textarea name='entryText'></textarea>
        <label className='public-checkbox'><input type='checkbox' name='is_public' />&nbsp;make this entry public</label>
        <div className='buttons'>
          <button onClick={ this.handleCancel }>Cancel</button>
          <button type='submit'>Save</button>
        </div>
      </form>
    );
  }
}

export default NewEntryPage;
