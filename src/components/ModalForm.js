import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: "",
    };
  }

  addBook = () => {
    this.props.close();
    let { user } = this.props.auth0;
    let email = user.email;
    const bookObj = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      email: email,
    };
    console.log(bookObj);
    axios
    .post('https://can-of-books-a.herokuapp.com/addbook',bookObj)
      .then( (result)=>{
        this.props.newBook(result.data)
      })
      .catch(err=>{
        console.log('Error on adding data');
      })
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="title"
                  type="text"
                  placeholder="Enter Title"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="options">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Floating label select example"
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  <option value="Favorite">Favorite</option>
                  <option value="Life-changing">Life-changing</option>
                  <option value="For-fun">For-fun</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.close}>
              Close
            </Button>
            <Button onClick={this.addBook} variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withAuth0(ModalForm);
