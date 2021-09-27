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
      flowersArr: [],
      favFlowerArr: [],
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:3001/getflowers")
      .then((result) => {
        this.setState({
          flowersArr: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  addToFav = (flower) => {
    let { user, isAuthenticated } = this.props.auth0;
    let email = user.email;
    console.log(email);
    axios
      .post(`http://localhost:3001/addtofav?email=${email}`, flower)
      .then((result) => {
        console.log(result.data);
        this.setState({
          favFlowerArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getFavFlowers = () => {
    let { user, isAuthenticated } = this.props.auth0;
    let email = user.email;
    console.log(email);
    axios
      .get(`http://localhost:3001/getfavflowers?email=${email}`)
      .then((result) => {
        console.log(result.data);
        this.setState({
          favFlowerArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  delete = (id) => {
    let { user, isAuthenticated } = this.props.auth0;
    let email = user.email;
    console.log(email);
    axios
      .delete(`http://localhost:3001/delete/${id}?email=${email}`)
      .then((result) => {
        console.log(result.data);
        this.setState({
          favFlowerArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  update = (obj, id) => {
    let { user, isAuthenticated } = this.props.auth0;
    let email = user.email;
    console.log(email);
    axios
      .put(`http://localhost:3001/update/${id}?email=${email}`, obj)
      .then((result) => {
        console.log(result.data);
        this.setState({
          favFlowerArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { user, isAuthenticated } = this.props.auth0;
    console.log(this.state.favFlowerArr);
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
                    flowersArr={this.state.flowersArr}
                    addToFav={this.addToFav}
                  />
                ) : (
                  <Login />
                )}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/profile">
                {isAuthenticated && (
                  <Profile
                    favFlowerArr={this.state.favFlowerArr}
                    getFavFlowers={this.getFavFlowers}
                    delete={this.delete}
                    update={this.update}
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
