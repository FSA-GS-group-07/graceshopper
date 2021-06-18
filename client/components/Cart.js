import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="cart">
        {cart.cocktails &&
          cart.cocktails.map((cocktail) => (
            <Link key={cocktail.id} to={`/cocktails/${cocktail.id}`}>
              <div className="cart-item">
                <span>
                  <h1>{cocktail.name}</h1>
                  <img src={cocktail.imageUrl} alt={cocktail.name} />
                  <h3>${cocktail.price}</h3>
                </span>
              </div>
            </Link>
          ))}
        <div id="checkout">
          <button>Checkout</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(Cart);
