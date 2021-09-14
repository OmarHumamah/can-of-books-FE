import React from "react";
import Form from "react-bootstrap/Form";

class AddForm extends React.Component {
  render() {
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="options">
            {/* <Form.Select aria-label="Floating label select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select> */}
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default AddForm;
