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
    let total = 0;
    let subtotal = 0;
    // console.log(cart.cocktails)
    return (
      <div className="cart">
        {cart.cocktails &&
          cart.cocktails.map((cocktail) => (
            <Link
              key={cocktail.id || cocktail.cocktailId}
              to={`/cocktails/${cocktail.id}`}
            >
              <div className="cart-item">
                <span>
                  <h1>{cocktail.name}</h1>
                  <img src={cocktail.imageUrl} alt={cocktail.name} />
                  <h3>${cocktail.price}</h3>
                </span>
              </div>
            </Link>
          ))}
        <div className="subtotal">
          <h4>
            Subtotal:
          </h4>
            {cart.cocktails && cart.cocktails.map(cocktail => {
              subtotal = Number(cocktail.price * cocktail.order_items.quantity)
              total += Number(cocktail.price * cocktail.order_items.quantity)
              return (
                <div className="subtotal-item">
                  <span>
                    <h5>{cocktail.name}</h5>
                    <h6>{cocktail.order_items.quantity}</h6>
                    <h6>X</h6>
                    <h6>${cocktail.price}</h6>
                    <h6>=</h6>
                    <h6>${subtotal}</h6>
                  </span>
                </div>
              )
            }
            )}
          
        </div>
        <div className="total">
          <h4>
            Total: $
            {cart.cocktails && total}
          </h4>
        </div>
        <div className="checkout">
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
