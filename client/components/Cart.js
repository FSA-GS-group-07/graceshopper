import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { cart } = this.props;
    console.log(this.props);
    return (
      <div className="cart">
        am i loading?
        {/* {cocktails &&
          cocktails.map((cocktail) => (
            <Link key={cocktail.id} to={`/cocktails/${cocktail.id}`}>
              <span>
                <h1>{cocktail.name}</h1>
                <img src={cocktail.imageUrl} alt={cocktail.name} />
                <h3>{cocktail.price}</h3>
                <p>{cocktail.description}</p>
              </span>
            </Link>
          ))} */}
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
