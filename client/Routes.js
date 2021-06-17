import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProduct from './components/AllProduct';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} exact />
          <Route
            path="/login"
            render={() => (isLoggedIn ? <Redirect to="/home" /> : <Login />)}
          />
          <Route
            path="/signup"
            render={() => (isLoggedIn ? <Redirect to="/home" /> : <Signup />)}
          />
          <Route exact path="/cocktails" render={() => <AllProduct />} />
          <Route
            exact
            path="/cocktails/:id"
            render={(props) => <SingleProduct {...props} />}
          />
          <Route exact path="/cart" render={() => <Cart />} />
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
