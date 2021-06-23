import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, addToCart } from '../store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import {
  CartContainer,
  List,
  LeftColumn,
  RightColumn,
  ButtonContainer,
  Button,
  LargeText,
  QuantityButton,
  SmallText,
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
    const { cart } = this.props;
    let total = 0;
    let subtotal = {};
    {
      cart.cocktails &&
        cart.cocktails.map((cocktail) => {
          subtotal[cocktail.id] = Number(
            cocktail.price * cocktail.order_items.quantity
          );
          total += Number(cocktail.price * cocktail.order_items.quantity);
        });
    }

    return (
      <div className="cart">
        <CartContainer>
          {cart.cocktails &&
            cart.cocktails.map((cocktail) => (
              <div
                className="cart-item"
                key={cocktail.id || cocktail.cocktailId}
              >
                <List>
                  <Link to={`/cocktails/${cocktail.id}`}>
                    <LeftColumn>
                      <img src={cocktail.imageUrl} alt={cocktail.name} />
                    </LeftColumn>
                  </Link>
                  <RightColumn>
                    <LargeText>{cocktail.name}</LargeText>
                    <h3>
                      ${cocktail.price} x{' '}
                      {this.state.edit && cocktail.order_items?.quantity > 0 && (
                        <QuantityButton
                          type="button"
                          onClick={() =>
                            this.handleSubtract(cocktail.id, 1, cocktail)
                          }
                        >
                          -
                        </QuantityButton>
                      )}
                      {cocktail.order_items?.quantity}
                      {this.state.edit && cocktail.order_items?.quantity <= 10 && (
                        <QuantityButton
                          type="button"
                          onClick={() =>
                            this.handleAdd(cocktail.id, 1, cocktail)
                          }
                        >
                          +
                        </QuantityButton>
                      )}
                    </h3>
                    <div className="subtotal">
                      <h3>Subtotal: ${subtotal[cocktail.id]}</h3>

                      <Button
                        onClick={() =>
                          this.setState((prevState) => ({
                            edit: !prevState.edit,
                          }))
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  </RightColumn>
                </List>
              </div>
            ))}

          {cart.cocktails && cart.cocktails.length > 0 ? (
            <>
              <ButtonContainer>
                <LargeText>Total: ${cart.cocktails && total}</LargeText>
              </ButtonContainer>
              <br />
              <ButtonContainer>
                <Button onClick={this.handleCheckout}>Checkout</Button>
              </ButtonContainer>
            </>
          ) : (
            <CartContainer>
              <Link to="/cocktails">
                <SmallText>
                  <IoChevronBack /> Back to all cocktails
                </SmallText>
              </Link>
              <br />
              <LargeText>
                Oh no! Your cart is empty :/
                <br />
                Would you like to browse a bit more?
              </LargeText>
            </CartContainer>
          )}
        </CartContainer>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  updatedQuantity: (cocktailId, quantity, cocktail) =>
    dispatch(addToCart(cocktailId, quantity, cocktail)),
});

export default connect(mapState, mapDispatch)(Cart);
