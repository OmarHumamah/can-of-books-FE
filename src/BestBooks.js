import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Books from './Books'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBooks: [],
    };
  }

  componentDidMount = () => {
    let { user } = this.props.auth0;
    let email = user.email;
    console.log(email);
    let url = `http://localhost:3001/books?email=${email}`;
    axios
      .get(url)
      .then((result) => {
        this.setState({
          userBooks: result.data,
        });
        console.log(result.data);
        console.log(this.state.userBooks[0].title);
      })
      .catch((err) => {
        console.log("error");
      });
  };
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {
          this.state.userBooks.length > 0 &&  <Books book={this.state.userBooks} />
        }
          
        
       
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
