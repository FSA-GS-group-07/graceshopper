import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h1>PourDecisions</h1>
        <nav> 
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/cocktails">Shop</Link>
              <Link to="/cart">Cart</Link>
              {this.props.isAdmin ? (<Link to="/users">Users</Link>) : null }
              <a href="#" onClick={this.handleClick}>
                Logout
              </a>
            </div>
          ) : (
          <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/home">Home</Link>
              <Link to="/cocktails">Shop</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
