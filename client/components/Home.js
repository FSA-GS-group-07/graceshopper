import React from 'react';
import { connect } from 'react-redux';
import { Img, CenterContainer } from '../styled-components';

export const Home = (props) => {
  const { username } = props;
  return (
    <Img>
      <img src="https://lh3.googleusercontent.com/Edcz7YwbqYl3guKjMbq1gN_oGmbMa58yguthjJwdKGKXjsxNBIHhQkFPETZkrT9CXZYOj89h7gK0f2cuisOZK8U6T0IZCOF7DvKVWEkCC7Owz4uXP9pWDXoNd37PjOvUCp537TXCKf5mBEBfMplncz9oH9zM8h9RKbEIZbzhOGq6nIQPxXV25G7kHdJeO3oPf_K-eQ-dYOGPzsewYIcl898EG2z3RMy73x9e8WsDlce87v0Gkx-lecjewtVgabKolffvjlAQR7CQzd7GyWkZW2AThrlcof-u6FwV2apP4aj7sQdJBgDFbnvFojz0EhnEQ62VGRpOhs01wbFvjgtthvxtJV02IDow1xaJdEQCVgNkE9K2BjkDZHYFWdZxPGY9XSBnNZB0XEUHbFuC_MUw0bH_XZ_A0mL-cEzk_hhxOIeQYrUw8PlQr7-Z2t0R67KRKSilbC7pgKGO9hUL_gxetJhnmGou7vE_0e5QXBsl8g8A1gR3CCBJ_SE5_IfTeylyR93D-YVEax0yHPyLVVc5M2arAxir_mnqVeZw5gr50pjUV8SMmXUJ0_h2sS7p1qT1wobmRgSc2DCnC7m4JJB61k64owYTcBdIQjUgHJ_uxpvw3AAA6ygQf7_nyb18btVfahO2xWIJmWJVbGP4glo-eKP3_L91qyOBixVeHGFltTl_l9zpuRUJE9XOKWPWctDw8IRJ4mhAbfNbljmWjiE4TvRK=w1725-h834-no" />
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
