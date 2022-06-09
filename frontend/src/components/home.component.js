import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        {
          AuthService.getCurrentUser() ? (
            <header className="jumbotron">
              <h3>{this.state.content}</h3>
            </header>
          )
          : <Redirect to="/login" />
          
        }
      </div>
    );
  }
}
