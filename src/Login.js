import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./Login.css";
import LoginButton from "./LoginButton";

class Login extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem", margin : '50px auto', background : 'gray'}}>
        <Card.Header>Log In</Card.Header>
        <Card.Body>
          <Card.Text>Click Below to Log In</Card.Text>
          <LoginButton />
        </Card.Body>
      </Card>
    );
  }
}

export default Login;
