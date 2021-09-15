import React from "react";
import { Card, Button, Col, Row, Modal, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";


class Books extends React.Component {
  


  render() {
    return (
      <><Row>
        {this.props.book.map((element) => {
          return (
            <Col>
            <Card style={{ width: '30rem' }}>
              <Card.Header>
                status:{element.status}
              </Card.Header>
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text>{element.description}</Card.Text>

                <Button variant="primary" onClick={()=> this.props.delete(element._id)}>Remove</Button>
                <Button variant="primary" onClick={()=> this.props.update(element)}>Update</Button>
              </Card.Body>
            </Card> 
            </Col>
          );
        })}
        </Row>
      </>
    );
  }
}

export default withAuth0(Books);
