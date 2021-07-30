import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProduct from "./components/AllProduct";
import SingleProduct from "./components/SingleProduct";
import NewProduct from "./components/NewProduct";
import Cart from "./components/Cart";
import Users from "./components/Users";
import Confirmation from "./components/OrderConfirmation";
import Orders from "./components/Orders";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/login"
            render={() => (isLoggedIn ? <Redirect to="/" /> : <Login />)}
          />
          <Route
            path="/signup"
            render={() => (isLoggedIn ? <Redirect to="/" /> : <Signup />)}
          />
          <Route exact path="/cocktails" render={() => <AllProduct />} />
          <Route
            exact
            path="/cocktails/create"
            render={(props) => <NewProduct {...props} />}
          />
          <Route
            exact
            path="/cocktails/:id"
            render={(props) => <SingleProduct {...props} />}
          />
          <Route
            path="/users"
            render={() => (isAdmin && isLoggedIn ? <Users /> : null)}
          />
          <Route exact path="/cart" render={() => <Cart />} />
          <Route exact path="/orders" render={() => <Orders />} />
          <Route exact path="/confirmation" render={() => <Confirmation />} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
