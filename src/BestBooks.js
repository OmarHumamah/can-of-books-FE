import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Books from './Books'
import { Button } from "react-bootstrap";
import ModalForm from "./components/ModalForm";


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBooks: [],
      showModal: false
    };
  }

  componentDidMount = () => {
    let { user } = this.props.auth0;
    let email = user.email;
    console.log(email);
    let url = `https://can-of-books-a.herokuapp.com/books?email=${email}`;
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
  handleShow = (e)=>{
    e.preventDefault();
   this.setState({
     showModal: true
   })
  }
  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  newBook = (newData) =>{
    this.setState({
      userBooks : newData
    })
  } 
  delete = (id) => {
    let { user } = this.props.auth0;
    let email = user.email;
      
    axios
    .delete(`https://can-of-books-a.herokuapp.com/deletebook/${id}?email=${email}`)
    .then(result=>{
      this.setState({
        userBooks : result.data
      })
    })
  }
 
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <Button variant="primary" onClick={this.handleShow}>
        Add book
      </Button>
        {
          this.state.userBooks.length > 0 &&  <Books delete={this.delete} book={this.state.userBooks} />
        }
          
        <ModalForm newBook={this.newBook} show={this.state.showModal} close={this.handleClose}/>
       
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
