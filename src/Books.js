import React from "react";
import { Carousel } from "react-bootstrap";

class Books extends React.Component {
  render() {
    return (
      <>
        <Carousel variant="dark">
          {this.props.book.map((element) => {
           return( <Carousel.Item >
              <img
                className="d-block w-100"
                src="https://ak.picdn.net/shutterstock/videos/24223843/thumb/1.jpg"
                style= {{height : '300px'}}
                alt="First slide"
              />
              <Carousel.Caption>
                <h5 style= {{color : 'black'}}>{element.title}</h5>
                <p style= {{color : 'black'}}>
                 {element.description}
                </p>
                <p style= {{color : 'black'}}>status: {element.status === "true" ? 'available': 'unavailable'} </p>
              </Carousel.Caption>
            </Carousel.Item>)
          })}
        </Carousel>
      </>
    );
  }
}

export default Books;
