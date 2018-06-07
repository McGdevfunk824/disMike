
import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class ChannelForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    this.props.clearErrors();
    this.setState(this.props.currentState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = Object.assign({}, this.state);

    this.props.processForm(channel)
    .then(() => this.props.fetchAServer(this.props.currentServerId))
        .then(() => {this.props.closeModal()});
  }

  handleInput(input) {
    return (e) => {
      this.setState({
        [input]: e.currentTarget.value
      });
    };
  }

  render() {

    return (
      <div className='server-form-container'>
        <div>Update Channel</div>
        <form onSubmit={this.handleSubmit} className="server-form">
          <div className='input-container'>
            <label className='server-label'>Name</label>
            <input className='server-input-field' autoFocus type='text' onChange={this.handleInput('name')} value={this.state.name}></input>
          </div>
          <button className='submit-form' type='submit'>Update Channel</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ChannelForm);
