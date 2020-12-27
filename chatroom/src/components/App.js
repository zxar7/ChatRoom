import React, { Component } from 'react';
import './App.css';
import UserChat from './UserChat';
import SelectAvatar from './SelectAvatar';


class App extends Component {

  constructor() {
    super()
    this.state = {
      activeUser: null,
      currentUser: false,
      firstCheck: false
    }
    this.userPresentInterval = null;
    this.activeUserInterval = null;
  }

  componentDidMount = () => {
    this.userPresentInterval = setInterval(async () => {
      const activeUser = await fetch(`/api/user/`).then(res => res.json());
      this.setState({ activeUser, firstCheck: true })
    }, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.userPresentInterval);
    clearInterval(this.activeUserInterval)
  }

  setupUser = async (selectedUser) => {
    const activeUser = await fetch('/api/selectUser', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ userData: selectedUser })
    }).then(res => res.json());
    if (activeUser?.userId)
      this.setState({ activeUser, currentUser: true }, () => {
        clearInterval(this.activeUserInterval);
        this.activeUserInterval = setInterval(async () => {
          await fetch(`/api/confirmUserPresence`).then(res => res.text());
        }, 1000);
      })
  }

  render() {
    const { activeUser, currentUser, firstCheck } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          Welcome to iTalk, Hey {currentUser ? activeUser?.name || 'Stranger' : 'Stranger'}!
      </header>
        {firstCheck && (activeUser ?
          <UserChat
            activeUser={activeUser}
            currentUser={currentUser}
          /> :
          <SelectAvatar
            setupUser={this.setupUser}
          />
        )}
      </div>
    );
  }
}

export default App;
