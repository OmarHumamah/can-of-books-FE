import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import UpdateModal from "./UpdateModal";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      UpdateObj: {},
    };
  }

  componentDidMount = () => {
    this.props.get();
  };

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
        {console.log(this.props.favMovies)}
        <Row>
          {this.props.favMovies.map((movie) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Header>{movie.title}</Card.Header>
                  <Card.Body>
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.img}`}
                    />
                    <Card.Text>{movie.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      onClick={() => {
                        this.props.delete(movie._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        this.setState({
                          show: true,
                          UpdateObj: movie,
                        });
                      }}
                    >
                      Update
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
        {this.state.show && (
          <UpdateModal
            update={this.props.update}
            selectedM={this.state.UpdateObj}
            close={() => {
              this.setState({ show: false });
            }}
            show={this.state.show}
          />
        )}
      </>
    );
  }
}

export default withAuth0(Profile);
