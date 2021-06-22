import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, addToCart } from "../store/cart";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };
  }
  componentDidMount() {
    this.props.getCart();
  }

  handleAdd(cocktailId, currQty, cocktail) {
    this.props.updatedQuantity(cocktailId, 1, cocktail);
  }

  handleSubtract(cocktailId, currQty, cocktail) {
    this.props.updatedQuantity(cocktailId, -1, cocktail);
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="cart">
        {cart.cocktails &&
          cart.cocktails.map((cocktail) => (
            <div className="cart-item" key={cocktail.id || cocktail.cocktailId}>
              <Link to={`/cocktails/${cocktail.id}`}>
                <span>
                  <h1>{cocktail.name}</h1>
                  <img src={cocktail.imageUrl} alt={cocktail.name} />
                </span>
              </Link>

              <h3>${cocktail.price}</h3>

              <h3>
                Quantity: {cocktail.order_items.quantity}
                {this.state.edit && (
                  <button
                    type="button"
                    onClick={() => this.handleAdd(cocktail.id, 1, cocktail)}
                  >
                    +
                  </button>
                )}
                {this.state.edit && (
                  <button
                    type="button"
                    onClick={() =>
                      this.handleSubtract(cocktail.id, 1, cocktail)
                    }
                  >
                    -
                  </button>
                )}
              </h3>
              <button
                onClick={() =>
                  this.setState((prevState) => ({ edit: !prevState.edit }))
                }
              >
                Edit
              </button>
            </div>
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
    updatedQuantity: (cocktailId, quantity, cocktail) =>
      dispatch(addToCart(cocktailId, quantity, cocktail)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
