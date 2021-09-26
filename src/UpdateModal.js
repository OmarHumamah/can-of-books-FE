import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class UpdateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
    };
  }

  componentDidMount = () => {
    const { user,isAuthenticated } = this.props.auth0;
    let email = user.email;
    this.setState({
      title: this.props.selectedM.title,
      description: this.props.selectedM.description,
      email: email
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
          <Modal.Header>Update</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>title</Form.Label>
              <Form.Control
                defaultValue={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              ></Form.Control>
              <br />
              <Form.Label>description</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              ></Form.Control>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button  onClick={() => {
                this.props.update(this.state, this.props.selectedM._id);
                this.props.close();
              }}>submit</Button>
            <Button
              onClick={() => {
                this.props.close();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateModal);
