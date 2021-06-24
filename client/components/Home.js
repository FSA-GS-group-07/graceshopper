import React from 'react';
import { connect } from 'react-redux';
import { Img, CenterContainer } from '../styled-components';

export const Home = (props) => {
  const { username } = props;
  return (
    <Img>
      <img src="https://i.postimg.cc/fLg7TvbW/pourdecisions.jpg" />
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
