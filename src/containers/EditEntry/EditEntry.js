import React, { Component } from 'react';

import './EditEntry.css';

class EditEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      entryId: null,
      entry: null
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.db.ref('entries/' + this.props.match.params.id).once('value', snapshot => {
      this.setState({
        loading: false,
        entryId: this.props.match.params.id,
        entry: snapshot.val()
      });
    });
  }

  handleCancel(evt) {
    evt.preventDefault();
    this.props.history.goBack();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    let entryRef = this.props.db.ref('entries/' + data.get('id'));

    const fields = {
      owner: this.props.auth.getUser().uid,
      text: data.get('entryText'),
      is_public: !!data.get('is_public')
    };

    entryRef.set(fields).then(result => {
      this.props.history.push('/');
    }).catch(err => {
      console.error('Error saving entry', err);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <form className='app-page entry-form'>
          <h2>Edit Entry</h2>
          <p>Loading...</p>
        </form>
      );
    }
    return (
      <form className='app-page entry-form' onSubmit={ this.handleSubmit }>
        <h2>Edit Entry</h2>
        <textarea name='entryText' defaultValue={this.state.entry.text}></textarea>
        <input type='hidden' name='id' value={this.state.entryId} />
        <label className='public-checkbox'><input type='checkbox' name='is_public' defaultChecked={this.state.entry.is_public} />&nbsp;make this entry public</label>
        <div className='buttons'>
          <button onClick={ this.handleCancel }>Cancel</button>
          <button type='submit'>Save</button>
        </div>
      </form>
    );
  }
}

export default EditEntryPage;
