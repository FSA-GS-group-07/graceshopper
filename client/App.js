import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import { FixedHeightContainer, Content } from './styled-components';

const App = () => {
  return (
    <FixedHeightContainer>
      <Navbar />
      <Content>
        <Routes />
      </Content>
    </FixedHeightContainer>
  );
};

export default App;
