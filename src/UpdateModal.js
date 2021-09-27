import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "someValue",
      instructions: "",
      photo: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      name: this.props.flowerObj.name,
      instructions: this.props.flowerObj.instructions,
      photo: this.props.flowerObj.photo,
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={() => {
            this.props.close();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>UPDATE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>name</Form.Label>
                <Form.Control
                  defaultValue={this.props.flowerObj.name}
                  type="text"
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>instructions</Form.Label>
                <Form.Control
                  defaultValue={this.props.flowerObj.instructions}
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    this.setState({ instructions: e.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.props.close();
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                this.props.update(this.state, this.props.flowerObj._id);
                this.props.close();
              }}
              variant="primary"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UpdateModal;
