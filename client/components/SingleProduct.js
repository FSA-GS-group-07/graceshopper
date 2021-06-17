import React from "react";
import { connect } from "react-redux";
import { fetchCocktail } from "../store/singleproduct";
import { updateCocktail } from "../store/singleproduct";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      edit: false,
      name: "",
      imageUrl: this.props.cocktail.imageUrl,
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.cocktail);
    this.props.updateCocktail({ ...this.props.cocktail, ...this.state });
    this.setState({
      edit: false,
    });
  }

  render() {
    const { cocktail, isAdmin } = this.props;
    const { edit, name, price, description, imageUrl } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        {isAdmin && (
          <button
            onClick={() =>
              this.setState((prevState) => ({ edit: !prevState.edit }))
            }
          >
            Edit
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
              Image Url:
              <input
                type="text"
                name="imageUrl"
                placeholder={cocktail.imageUrl}
                onChange={handleChange}
                value={imageUrl}
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

            <button type="button" onClick={this.handleSubtract}>
              -
            </button>
            <span>{this.state.quantity}</span>
            <button type="button" onClick={this.handleAdd}>
              +
            </button>

            <button type="button">Add to Cart</button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cocktail: state.cocktail,
    isAdmin: state.auth.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCocktail: (id) => dispatch(fetchCocktail(id)),
    addToCart: (id, quantity) => dispatch(thunk(id, quantity)),
    updateCocktail: (cocktail) => dispatch(updateCocktail(cocktail, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
