import React from 'react';
import { createDispatchHook } from 'react-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { fetchCocktails } from '../store/allProduct';
import { createCart, fetchCart, addToCart } from '../store/cart';
import {
  Grid,
  CartButton,
  Wrapper,
  Text,
  GridContainer,
  SmallText,
  CenterContainer,
  AdminButton,
} from '../styled-components';

class AllProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCocktails();
    this.props.getCart();
  }

  async handleAddToCart(id, quantity = 1, cocktail) {
    if (this.props.cart.cocktails && this.props.cart.cocktails.length > 0) {
      await this.props.addToCart(id, quantity, cocktail);
    } else {
      await this.props.createCart(id, quantity, cocktail);
    }
  }

  render() {
    const { cocktails, isAdmin, cart } = this.props;

    return (
      <div className="all-cocktails">
        <CenterContainer>
          {isAdmin && (
            <Link to="/cocktails/create">
              <AdminButton>Create New Cocktail</AdminButton>
            </Link>
          )}
        </CenterContainer>
        <Grid>
          {cocktails &&
            cocktails.map((cocktail) => (
              // <React.Fragment key={index}>
              <Wrapper key={cocktail.id}>
                <img src={cocktail.imageUrl} alt={cocktail.name} />
                <CartButton
                  onClick={() => {
                    this.handleAddToCart(
                      cocktail.id,
                      cart.cocktails?.order_items?.quantity,
                      cocktail
                    );
                  }}
                >
                  Add to Cart
                </CartButton>
                <Link to={`/cocktails/${cocktail.id}`}>
                  <GridContainer>
                    <Text>{cocktail.name}</Text> <Text>${cocktail.price}</Text>
                  </GridContainer>
                </Link>
              </Wrapper>
              // </React.Fragment>
            ))}
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cocktails: state.cocktails,
    isAdmin: state.auth.admin,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => ({
  getCocktails: () => {
    dispatch(fetchCocktails());
  },
  getCart: () => dispatch(fetchCart()),
  createCart: (id, quantity, cocktail) => {
    dispatch(createCart(id, quantity, cocktail));
  },
  addToCart: (id, quantity, cocktail) =>
    dispatch(addToCart(id, quantity, cocktail)),
});

export default connect(mapState, mapDispatch)(AllProduct);
