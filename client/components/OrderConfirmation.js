import axios from "axios";
import { render } from "enzyme";
import React from "react";
import { connect } from "react-redux";
import { clearCart } from "../store/cart";

class Confirmation extends React.Component {
  async componentDidMount() {
    this.props.clearCart();
  }

  render() {
    return <h1>Your order is confirmed! Your cocktails are on their way!</h1>;
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapState, mapDispatch)(Confirmation);
