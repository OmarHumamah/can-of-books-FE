import React from "react";
import Profile from "./Profile";
import Header from "./Header";
import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BestBooks from "./BestBooks";
import Login from "./Login";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesArr: [],
      favMoviesArr: [],
    };
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/movies`).then((result) => {
      this.setState({ moviesArr: result.data });
      console.log(this.state.moviesArr);
    });
  };

  addToFav = (t, img, des) => {
    const { user, isAuthenticated } = this.props.auth0;
    let email = user.email;

    let movieObj = {
      title: t,
      img: img,
      description: des,
      email: email,
    };
    console.log(movieObj);

    axios
      .post(`http://localhost:3001/addFav`, movieObj)
      .then((result) => {
        this.setState({
          favMoviesArr: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  gitFavMovies = () => {
    const { user, isAuthenticated } = this.props.auth0;
    let email = user.email;
    axios
      .get(`http://localhost:3001/getFav?email=${email}`)
      .then((result) => {
        this.setState({
          favMoviesArr: result.data,
        });
        console.log(this.state.favMoviesArr);
      })
      .catch((err) => console.log(err));
  };

  deleteMovie = (id) => {
    const { user, isAuthenticated } = this.props.auth0;
    let email = user.email;
    axios
      .delete(`http://localhost:3001/delete/${id}?email=${email}`)
      .then((result) => {
        this.setState({
          favMoviesArr: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  update = (obj, id) => {
    console.log(obj, id);
    axios
      .put(`http://localhost:3001/update/${id}`, obj)
      .then((result) => {
        this.setState({
          favMoviesArr: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log("app", this.props);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? (
                  <BestBooks
                    moviesArr={this.state.moviesArr}
                    gitFav={this.addToFav}
                  />
                ) : (
                  <Login />
                )}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/profile">
                {isAuthenticated && (
                  <Profile
                    update={this.update}
                    delete={this.deleteMovie}
                    get={this.gitFavMovies}
                    favMovies={this.state.favMoviesArr}
                  />
                )}
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
