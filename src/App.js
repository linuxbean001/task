import React, { Component } from 'react';
import AddUser from './AddUser';

class App extends Component {
  state = {
    users: []
  }

  addUser = (newUser) => {
    let users = [...this.state.users, newUser];
    this.setState({
      users
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Activity</h1>
        <AddUser addUser={this.addUser} />
      </div>
    );
  }
}

export default App;

