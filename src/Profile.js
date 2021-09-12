import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Row, Col, Image } from "react-bootstrap";

class Profile extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <>
        {isAuthenticated && (
          <>
            <Card style={{ margin: "50px 20px", background: "gray" }}>
              <Card.Header>Profile</Card.Header>
              <Row>
                <Col>
                  <Card.Title>Hi {user.name}</Card.Title>
                  <Card.Text>Here is your profile</Card.Text>
                </Col>
                <Col>
                  <Image src={user.picture} roundedCircle />
                </Col>
              </Row>
            </Card>
          </>
        )}
        {console.log(user)}
      </>
    );
  }
}

export default withAuth0(Profile);
