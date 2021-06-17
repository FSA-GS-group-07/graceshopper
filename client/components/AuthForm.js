import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const renderLogin = () => {
    return (
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" required />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" required />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        <br />
        <small>First Time?</small>
        <br />
        <small>
          <Link to="/signup">Sign up here</Link>
        </small>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    );
  };

  const renderSignup = () => {
    return (
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="fname" type="text" required />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lname" type="text" required />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" required />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" required />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        <br />
        <small>Already have an account?</small>
        <br />
        <small>
          <Link to="/login">log in here</Link>
        </small>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    );
  };

  return <div>{name === "signup" ? renderSignup() : renderLogin()}</div>;
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.loginError,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.signupError,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();

      const formName = evt.target.name;
      const firstName = evt.target.fname?.value;
      const lastName = evt.target.lname?.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value;
      dispatch(authenticate(firstName, lastName, password, email, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
