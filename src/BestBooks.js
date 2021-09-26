import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesArr: [],
    };
  }

  componentDidMount = () => {
    this.setState({ moviesArr: this.props.moviesArr });
  };

  render() {
    return (
      <>
        <Row>
          {this.state.moviesArr.map((movie) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Header>{movie.title}</Card.Header>
                  <Card.Body>
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    />
                    <Card.Text>{movie.overview}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      onClick={() => {
                        this.props.gitFav(
                          movie.title,
                          movie.poster_path,
                          movie.overview
                        );
                      }}
                    >
                      Add to favorite
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
}

export default withAuth0(BestBooks);
