import React from 'react';
import { LargeText, CenterContainer } from '../styled-components';

class NotFound extends React.Component {
  render() {
    return (
      <CenterContainer>
        <LargeText>404 Not Found :(</LargeText>
      </CenterContainer>
    );
  }
}

export default NotFound;
