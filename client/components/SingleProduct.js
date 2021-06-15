import React from "react";
import { connect } from "react-redux";
import fetchProduct from "../store/singleproduct";

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
    await this.props.getProduct(this.props.match.params.id);
  }

  handleAdd() {
    this.setState({ quantity: this.state.quantity + 1 });
  }

  handleSubtract() {
    this.setState({ quantity: this.state.quantity - 1 });
  }

  async handleAddToCart() {
    await this.props.addToCart(this.props.match.params.id, this.state.quantity);
  }

  render() {
    const { product } = this.props;

    return (
      <div>
        <h1>{product.name}</h1>
        <h3>{product.price}</h3>
        <p>{product.description}</p>
        <img src={product.imageUrl} />

        <button type="button" onClick={this.handleSubtract}>
          -
        </button>
        <span>{this.state.quantity}</span>
        <button type="button" onClick={this.handleAdd}>
          +
        </button>

        <button type="button">Add to Cart</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    addToCart: (id, quantity) => dispatch(thunk(id, quantity)),
  };
};

export default connect(null, mapDispatch)(SingleProduct);
