import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Card extends Component {

  render() {
    return (
      <div className="github-profile">
        <img src={this.props.avatar_url} alt={this.props.login} width={200} />
        <div>
          <h3> {this.props.login} </h3>
          <p> {this.props.company} </p>
        </div>
      </div>
    );
  }
}

const CardList = (props) => (
  <div>
    {props.userInfos.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Form extends Component {

  state = {
    userName: ''
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get("https://api.github.com/users/"+this.state.userName);
    this.props.onSubmit(response.data);
    this.setState({ userName: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          placeholder="Github username"
          value={this.state.userName}
          onChange={(e) => this.setState({ userName: e.target.value })}
          required />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends Component {

  state = {
    userInfos: [
      { id: 1, login: "Dan Abramov", company: "Facebook", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4" }
    ]
  }

  addCard = (user) => {
    console.log(user);
    this.setState({
      userInfos: [...this.state.userInfos, user]
    });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.addCard} />
        <CardList userInfos={this.state.userInfos} />
      </>
    );
  }
}

export default App;
