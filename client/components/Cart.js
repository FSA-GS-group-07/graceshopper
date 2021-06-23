import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, addToCart } from '../store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import {
  CartContainer,
  List,
  LeftColumn,
  RightColumn,
  ButtonContainer,
  Button,
  LargeText,
} from '../styled-components';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };
    this.handleCheckout = this.handleCheckout.bind(this);
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

  async handleCheckout() {
    const stripe = await loadStripe(
      'pk_test_51J5C3LFT1yAmNlTZXfbIlPdca9y7GD8DILU77uUVH1AO844xp0B9UxdzJSGetlpYe4uRpRoH16hKtRyZ8aWPUeYz00RV42ERF5'
    );
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.props.cart),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  }

  render() {
    const cart = this.props.cart || { order: {}, cocktails: [] };
    let total = 0;
    let subtotal = 0;
    return (
      <div className="cart">
        <CartContainer>
          {cart.cocktails &&
            cart.cocktails.map((cocktail) => (
              <Link
                key={cocktail.id || cocktail.cocktailId}
                to={`/cocktails/${cocktail.id}`}
              >
                <List>
                  <LeftColumn>
                    <img src={cocktail.imageUrl} alt={cocktail.name} />
                  </LeftColumn>
                  <RightColumn>
                    <LargeText>{cocktail.name}</LargeText>
                    <h3>${cocktail.price}</h3>
                    <div className="subtotal">
                      <h4>Subtotal:</h4>

                      <h3>${cocktail.price}</h3>
                      <h3>
                        Quantity: {cocktail.order_items.quantity}
                        {this.state.edit && (
                          <button
                            type="button"
                            onClick={() =>
                              this.handleAdd(cocktail.id, 1, cocktail)
                            }
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
                          this.setState((prevState) => ({
                            edit: !prevState.edit,
                          }))
                        }
                      >
                        Edit
                      </button>
                    </div>

                    <div className="subtotal">
                      <h4>Subtotal:</h4>
                      {cart.cocktails &&
                        cart.cocktails.map((cocktail) => {
                          subtotal = Number(
                            cocktail.price * cocktail.order_items.quantity
                          );
                          total += Number(
                            cocktail.price * cocktail.order_items.quantity
                          );
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
                          );
                        })}
                    </div>
                  </RightColumn>
                </List>
              </Link>
            ))}

          <div className="total">
            <h4>Total: ${cart.cocktails && total}</h4>
          </div>
          {cart.cocktails && cart.cocktails.length > 0 ? (
            <ButtonContainer className="checkout" role="link">
              <Button onClick={this.handleCheckout}>Checkout</Button>
            </ButtonContainer>
          ) : (
            <h1>
              Oh no! Your cart is empty :/ would you like to browse a bit more?
            </h1>
          )}
        </CartContainer>
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
