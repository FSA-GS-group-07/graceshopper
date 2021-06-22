import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

//CSS STYLES

const Img = styled.div`
  width: 100%;
  height: fixed;
  max-width: 1300px;
`;

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <Img>
      <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1725&q=80" />
      {username && <h3>Welcome, {username}</h3>}
    </Img>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
