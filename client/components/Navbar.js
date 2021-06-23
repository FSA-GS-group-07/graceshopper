import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Nav, Logo, NavItems, NavItemsRed } from '../styled-components';

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
      <Nav>
        <Logo>
          <Link to="/">Pour Decisions</Link>
        </Logo>
        {this.props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            <NavItems>
              <Link to="/cocktails">Shop</Link>
            </NavItems>
            <NavItems>
              <Link to="/cart">Cart</Link>
            </NavItems>
            {this.props.isAdmin ? (
              <NavItemsRed>
                <Link to="/users">Users</Link>
              </NavItemsRed>
            ) : null}
            <NavItems>
              <a href="#" onClick={this.handleClick}>
                Logout
              </a>
            </NavItems>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <NavItems>
              <Link to="/cocktails">Shop</Link>
            </NavItems>
            <NavItems>
              <Link to="/cart">Cart</Link>
            </NavItems>
            <NavItems>
              <Link to="/login">Login</Link>
            </NavItems>
            <NavItems>
              <Link to="/signup">Sign Up</Link>
            </NavItems>
          </div>
        )}
      </Nav>
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
