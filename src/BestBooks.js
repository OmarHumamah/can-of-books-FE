import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Books from "./Books";
import { Button, Modal } from "react-bootstrap";
import ModalForm from "./components/ModalForm";
import UpdateModal from "./components/UpdateModal";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBooks: [],
      showModal: false,
      showUpdate: false,
      bookUpdate: {},
    };
  }
  showUpdateHandler = (element) => {
    console.log("hi");
    this.setState({
      bookUpdate : element,
      showUpdate: true,
    });
    // console.log(element);
  };

  closeUpdateHandler = () => {
    console.log("hi");
    this.setState({
      showUpdate: false,
    });
  };

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
  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };
  newBook = (newData) => {
    this.setState({
      userBooks: newData,
    });
  };
  delete = (id) => {
    let { user } = this.props.auth0;
    let email = user.email;

    axios
      .delete(
        `https://can-of-books-a.herokuapp.com/deletebook/${id}?email=${email}`
      )
      .then((result) => {
        this.setState({
          userBooks: result.data,
        });
      });
  };
  updateBook = (obj) =>{
    console.log(obj);
    console.log(this.state.bookUpdate._id);
    axios
    .put(`https://can-of-books-a.herokuapp.com/updatebook/${this.state.bookUpdate._id}`,obj)
    .then(result =>{
      this.setState({
        userBooks : result.data,
        showUpdate : false
      })
    })
    .catch(err=> console.log(err))
  }
  
  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
          <Button variant="primary" onClick={this.handleShow}>
            Add book
          </Button>
          {this.state.userBooks.length > 0 && (
            <Books
              update={this.showUpdateHandler}
              delete={this.delete}
              book={this.state.userBooks}
            />
          )}

          <ModalForm
            newBook={this.newBook}
            show={this.state.showModal}
            close={this.handleClose}
          />
          {this.state.showUpdate && 
          <UpdateModal
            close={this.closeUpdateHandler}
            open={this.state.showUpdate}
            update= {this.updateBook}
            data={this.state.bookUpdate}
          />}
        </Jumbotron>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
