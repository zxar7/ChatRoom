import React, { Component } from 'react';
import UserChat from './components/UserChat';
import SelectAvatar from './components/SelectAvatar';

import './App.css';
import { checkActiveUser, confirmUserPresence, selectActiveUser } from './services';

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
      const activeUser = await checkActiveUser();
      this.setState({ activeUser, firstCheck: true })
    }, 1000);
  }

  setupUser = async (selectedUser) => {
    const activeUser = await selectActiveUser({ userData: selectedUser });
    if (activeUser?.userId)
      this.setState({ activeUser, currentUser: true }, () => {
        clearInterval(this.activeUserInterval);
        this.activeUserInterval = setInterval(async () => {
          await confirmUserPresence();
        }, 1000);
      })
  }

  componentWillUnmount = () => {
    clearInterval(this.userPresentInterval);
    clearInterval(this.activeUserInterval)
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
