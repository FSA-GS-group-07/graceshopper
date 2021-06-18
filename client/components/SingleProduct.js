import React from "react";
import { connect } from "react-redux";
import { fetchCocktail } from "../store/singleproduct";
import { fetchCart, createCart, addToCart } from "../store/cart";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getCocktail(this.props.match.params.id);
    this.props.getCart();
  }

  handleAdd() {
    this.setState({ quantity: this.state.quantity + 1 });
  }

  handleSubtract() {
    this.setState({ quantity: this.state.quantity - 1 });
  }

  async handleAddToCart() {
    if (this.props.cart.order.id) {
      await this.props.addToCart(
        this.props.match.params.id,
        this.state.quantity
      );
    } else {
      await this.props.createCart(
        this.props.match.params.id,
        this.state.quantity
      );
    }
  }

  render() {
    const { cocktail } = this.props;

    return (
      <div>
        <h1>{cocktail.name}</h1>
        <h3>{cocktail.price}</h3>
        <p>{cocktail.description}</p>
        <img src={cocktail.imageUrl} />

        <button type="button" onClick={this.handleSubtract}>
          -
        </button>
        <span>{this.state.quantity}</span>
        <button type="button" onClick={this.handleAdd}>
          +
        </button>

        <button type="button" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cocktail: state.cocktail,
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
    getCocktail: (id) => dispatch(fetchCocktail(id)),
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    createCart: (id, quantity) => dispatch(createCart(id, quantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
