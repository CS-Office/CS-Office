import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      error: '',
    };

    this.setUser = this.setUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setError = this.setError.bind(this);
  }

  setUser({ user, isUser }) {
    if (isUser) {
      this.setError('User name taken');
    } else {
      this.setError('');
      this.props.setUser(user);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  }

  handleChange(e) {
    const newState = Object.assign({}, this.state);
    newState.nickname = e.target.value;
    this.setState(newState);
  }

  setError(error) {
    this.setState({ error });
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2 className='chat-greeting'>Please enter chat room</h2>
          </label>
          <input
            ref={(input) => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder="Enter full name..."
          />
          <div className="error">{error || null}</div>
        </form>
      </div>
    );
  }
}
