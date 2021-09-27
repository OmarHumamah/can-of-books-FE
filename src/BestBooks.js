import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class BestBooks extends React.Component {
  render() {
    return (
      <><Row>
        {this.props.flowersArr.map((flower) => {
         return( <Col><Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={flower.photo} />
            <Card.Body>
              <Card.Title>{flower.name}</Card.Title>
              <Card.Text>
                {flower.instructions}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={()=>{this.props.addToFav(flower)}} >Add to favorite</Button>
            </Card.Footer>
          </Card></Col>)
        })}</Row>
      </>
    );
  }
}

export default withAuth0(BestBooks);
