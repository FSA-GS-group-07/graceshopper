import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//CSS STYLES
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 3rem;
`;

const SmallText = styled.span`
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75em;
`;

const Input = styled.input.attrs({
  type: 'text',
})`
  background-color: white;
  color: black;
  margin-bottom: 0;
  /* width: 20%; */
  border-color: 2px solid black;
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid black;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: black;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1em;
  &:hover {
    background-color: black;
    border: 2px solid black;
    color: white;
  }
`;

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  const errorHandler = (error) => {
    if (error === 'Validation error: Validation isEmail on email failed') {
      return 'Invalid email entry';
    }
    if (error === 'User already exists') {
      return 'User already exists';
    }
  };

  const renderLogin = () => {
    return (
      <Container>
        <form onSubmit={handleSubmit} name={name}>
          <label htmlFor="email">
            <SmallText>Email</SmallText>
          </label>
          <Input name="email" type="text" required />
          <br />
          <label htmlFor="password">
            <SmallText>Password</SmallText>
          </label>
          <Input name="password" type="password" required />
          <br />
          <br />
          <Button type="submit">{displayName}</Button>
          <br />
          <br />
          <SmallText>First Time?</SmallText>
          <br />
          <SmallText>
            <Link to="/signup">Sign up here</Link>
          </SmallText>
          {error?.response && <div> {error.response.data} </div>}
        </form>
      </Container>
    );
  };

  const renderSignup = () => {
    return (
      <Container>
        <form onSubmit={handleSubmit} name={name}>
          <label htmlFor="firstName">
            <SmallText>First Name</SmallText>
          </label>
          <Input name="fname" type="text" required />
          <br />
          <label htmlFor="lastName">
            <SmallText>Last Name</SmallText>
          </label>
          <Input name="lname" type="text" required />
          <br />
          <label htmlFor="email">
            <SmallText>Email</SmallText>
          </label>
          <Input name="email" type="text" required />
          <br />
          <label htmlFor="password">
            <SmallText>Password</SmallText>
          </label>
          <Input name="password" type="password" required />
          <br />
          <br />
          <Button type="submit">{displayName}</Button>
          <br />
          <br />
          <SmallText>Already have an account?</SmallText>
          <br />
          <SmallText>
            <Link to="/login">log in here</Link>
          </SmallText>
          {error?.response && <div>{errorHandler(error.response.data)}</div>}
        </form>
      </Container>
    );
  };

  return <div>{name === 'signup' ? renderSignup() : renderLogin()}</div>;
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
    name: 'login',
    displayName: 'Login',
    error: state.auth.loginError,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
