import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
class UpdateModal extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          title : props.data.title,
          description : props.data.description,
          status : props.data.status,
          email : props.data.email 
      }
  }
 
  
  render() {
      console.log(this.state);
      
    return (<>
    <Modal show={this.props.open} onHide={()=> this.props.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Update book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={console.log("hi")}>
              <Form.Group controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="title"
                  type="text"
                  placeholder="Enter Title"
                  onChange={(e) => this.setState({ title: e.target.value })}
                  defaultValue = {this.props.data.title}
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
                  defaultValue = {this.props.data.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="options">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  aria-label="Floating label select example"
                  onChange={(e) => this.setState({ status: e.target.value })}
                  defaultValue = {this.props.data.status}
                >
                  <option value="Favorite">Favorite</option>
                  <option value="Life-changing">Life-changing</option>
                  <option value="For-fun">For-fun</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> this.props.close()}>
              Close
            </Button>
            <Button onClick={()=> this.props.update(this.state)} variant="primary" >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
    </>);
  }

  
  
}

export default UpdateModal;
