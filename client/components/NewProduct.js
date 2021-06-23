import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCocktail } from '../store/createProduct';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

//CSS STYLES
const SmallText = styled.span`
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75em;
`;

const Container = styled.div`
  max-width: 800px;
  padding: 1rem 4rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input.attrs({
  type: 'text',
})`
  background-color: white;
  color: black;
  margin-bottom: 0;
  width: 20%;
  border-color: 2px solid black;
  margin-left: 1rem;
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid black;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: black;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1em;
`;

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
      <Container>
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
      </Container>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createCocktail: (cocktail) => dispatch(createCocktail(cocktail, history)),
});

export default connect(null, mapDispatch)(NewProduct);
