
import React from 'react';
import { connect } from 'react-redux';
import { Img, CenterContainer } from '../styled-components';

export const Home = (props) => {
  const { username } = props;
  console.log(props);
  return (
    <Img>
      <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" />
      {/* {username && <h3>Welcome back, {username}</h3>} */}
    </Img>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
