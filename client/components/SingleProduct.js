import React from "react";
import { connect } from "react-redux";
import { fetchCocktail } from "../store/singleproduct";

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

        <button type="button">Add to Cart</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cocktail: state.cocktail,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCocktail: (id) => dispatch(fetchCocktail(id)),
    addToCart: (id, quantity) => dispatch(thunk(id, quantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
