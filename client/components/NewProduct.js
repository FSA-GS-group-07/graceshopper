import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCocktail } from '../store/createProduct';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import {
  SmallText,
  Input,
  Button,
  CreateContainer,
} from '../styled-components';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      price: 0,
      description: '',
      ingredients: '',
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
      <CreateContainer>
        <Link to="/cocktails">
          <SmallText>
            <IoChevronBack /> Back to all cocktails
          </SmallText>
        </Link>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <SmallText>
            <label>
              Name:
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                value={name}
              />
            </label>
            <br />
            <label>
              Image Url:
              <Input
                type="text"
                name="imageUrl"
                onChange={handleChange}
                value={imageUrl}
              />
            </label>
            <br />
            <label>
              Description:
              <Input
                type="text"
                name="description"
                onChange={handleChange}
                value={description}
              />
            </label>
            <br />
            <label>
              ingredients:
              <Input
                type="text"
                name="ingredients"
                onChange={handleChange}
                value={ingredients}
              />
            </label>
            <br />
            <label>
              Price:
              <Input
                type="text"
                name="price"
                onChange={handleChange}
                value={price}
              />
            </label>
            <br />
            <Button type="submit" onClick={(event) => handleSubmit(event)}>
              Submit
            </Button>
          </SmallText>
        </form>
      </CreateContainer>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createCocktail: (cocktail) => dispatch(createCocktail(cocktail, history)),
});

export default connect(null, mapDispatch)(NewProduct);
