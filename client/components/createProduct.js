import React, { Component } from "react";
import { connect } from "react-redux";
import { createCocktail } from "../store/index";

class CreateCocktail extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageUrl: this.props.cocktail.imageUrl,
      price: 0,
      description: "",
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
    const { name, imageUrl, price, description } = this.state;
    const { handleChange, handlSubmit } = this;
    return (
      <div>
        <h1>Create New Cocktail</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" onChange={handleChange} value={name} />

          <label htmlFor="imageUrl">Image Url:</label>
          <input type="text" onChange={handleChange} value={imageUrl} />

          <label htmlFor="description">Description: </label>
          <input type="text" onChange={handleChange} value={description} />

          <label htmlFor="price">Price: </label>
          <input type="text" onChange={handleChange} value={price} />

          <button type="submit" onClick={(event) => handleSubmit(event)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createCocktail: (cocktail) => dispatch(createCocktail(cocktail, history)),
});

export default connect(null, mapDispatch)(CreateCocktail);
