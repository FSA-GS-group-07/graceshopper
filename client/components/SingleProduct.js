import React from "react";
import { connect } from "react-redux";
import { fetchCart, createCart, addToCart } from "../store/cart";
import { Link } from "react-router-dom";
import {
  fetchCocktail,
  updateCocktail,
  deleteCocktail,
} from "../store/singleproduct";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      edit: false,
      name: "",
      price: 0,
      description: "",
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.props.cart.cocktails.length > 0) {
      await this.props.addToCart(
        this.props.match.params.id,
        this.state.quantity,
        this.props.cocktail
      );
    } else {
      await this.props.createCart(
        this.props.match.params.id,
        this.state.quantity,
        this.props.cocktail
      );
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateCocktail({ ...this.props.cocktail, ...this.state });
    this.setState({
      edit: false,
    });
  }

  render() {
    const { cocktail, history, isAdmin, deleteCocktail } = this.props;
<<<<<<< HEAD
    const { edit, name, price, description, quantity } = this.state;
=======
    const { edit, name, price, description, imageUrl, quantity } = this.state;
>>>>>>> 8bdb71fdf54b21166a83f2fefdb468fb56015a99
    const {
      handleChange,
      handleSubmit,
      handleSubtract,
      handleAdd,
      handleAddToCart,
    } = this;

    return (
      <div>
        {isAdmin && (
          <button
            onClick={() =>
              this.setState((prevState) => ({ edit: !prevState.edit }))
            }
          >
            Edit Cocktail
          </button>
        )}

        {isAdmin && (
          <button onClick={() => deleteCocktail(cocktail.id, history)}>
            X
          </button>
        )}

        {edit ? (
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={name}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={description}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                onChange={handleChange}
                value={price}
              />
            </label>
            <button type="submit" onClick={(event) => handleSubmit(event)}>
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h1>{cocktail.name}</h1>
            <h3>{cocktail.price}</h3>
            <p>{cocktail.description}</p>
            <img src={cocktail.imageUrl} />

            <button type="button" onClick={handleSubtract}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={handleAdd}>
              +
            </button>

            <button type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        )}
        <Link to="/cocktails">
          <button type="button">Back</button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cocktail: state.cocktail,
    cart: state.cart,
    auth: state.auth,
    isAdmin: state.auth.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
    getCocktail: (id) => dispatch(fetchCocktail(id)),
    addToCart: (id, quantity, cocktail) =>
      dispatch(addToCart(id, quantity, cocktail)),
    createCart: (id, quantity, cocktail) =>
      dispatch(createCart(id, quantity, cocktail)),
    updateCocktail: (cocktail) => dispatch(updateCocktail(cocktail)),
    deleteCocktail: (id, history) => dispatch(deleteCocktail(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
