import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, removeFromCart } from "../store/cart";

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentDidMount() {
    this.props.getCart();
  }

  async handleDelete(id) {
    await this.props.deleteFromCart(id);
    this.props.getCart()
  }

  render() {
    const { cart } = this.props;
    let total = 0;
    let subtotal = 0;
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
        <button type="button" onClick={() => this.handleDelete(cocktail.id)}>
          {" "}
        Delete
        </button> 
              </div>
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
    deleteFromCart: (id) => dispatch(removeFromCart(id))
  };
};

export default connect(mapState, mapDispatch)(Cart);
