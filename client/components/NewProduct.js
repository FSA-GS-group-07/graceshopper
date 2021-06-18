import React, { Component } from "react";
import { connect } from "react-redux";
import { createCocktail } from "../store/createProduct";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      price: 0,
      description: "",
      ingredients: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createCocktail({ ...this.state });
  }

  render() {
    const { name, imageUrl, price, description, ingredients } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} value={name} />
        </label>

        <label>
          Image Url:
          <input
            type="text"
            name="imageUrl"
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
          ingredients:
          <input
            type="text"
            name="ingredients"
            onChange={handleChange}
            value={ingredients}
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
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createCocktail: (cocktail) => dispatch(createCocktail(cocktail, history)),
});

export default connect(null, mapDispatch)(NewProduct);
