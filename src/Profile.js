import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import UpdateModal from "./UpdateModal";
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      obj: {},
    };
  }

  componentDidMount = () => {
    this.props.getFavFlowers();
  };
  show = () => {
    this.setState({
      show: true,
    });
  };
  close = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <>
        <Row>
          {this.props.favFlowerArr.map((flower) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={flower.photo} />
                  <Card.Body>
                    <Card.Title>{flower.name}</Card.Title>
                    <Card.Text>{flower.instructions}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      onClick={() => {
                        this.props.delete(flower._id);
                      }}
                    >
                      delete
                    </Button>

                    <Button
                      onClick={() => {
                        this.show();
                        this.setState({ obj: flower });
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
            show={this.state.show}
            close={this.close}
            flowerObj={this.state.obj}
            update={this.props.update}
          />
        )}
      </>
    );
  }
}

export default Profile;
