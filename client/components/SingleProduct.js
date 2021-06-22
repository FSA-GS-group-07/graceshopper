import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, createCart, addToCart } from '../store/cart';
import { Link } from 'react-router-dom';
import {
  fetchCocktail,
  updateCocktail,
  deleteCocktail,
} from '../store/singleproduct';
import { IoChevronBack } from 'react-icons/io5';
import styled from 'styled-components';

//CSS STYLES
const SmallText = styled.span`
  padding: 3rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75em;
`;

const LargeText = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 3rem;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 1rem;
  display: flex;
`;

const LeftColumn = styled.div`
  width: 60%;
  position: relative;
  padding: 3rem;
`;

const RightColumn = styled.div`
  width: 40%;
  margin-top: 3rem;
  padding: 3rem;
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
  margin-right: 1em;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: 2px solid black;
  padding: 0 5px 0 5px 0;
  color: black;
  font-size: 1em;
`;

const AdminControls = styled.div`
  max-width: 1200px;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
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

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      edit: false,
      name: '',
      imageUrl: this.props.cocktail.imageUrl,
      price: 0,
      description: '',
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
    const { edit, name, price, description, imageUrl, quantity } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleSubtract,
      handleAdd,
      handleAddToCart,
    } = this;

    return (
      <div>
        <Link to="/cocktails">
          <SmallText>
            <IoChevronBack /> Back to all cocktails
          </SmallText>
        </Link>
        <AdminControls>
          {isAdmin && (
            <>
              <br />
              <Button
                onClick={() =>
                  this.setState((prevState) => ({ edit: !prevState.edit }))
                }
              >
                Edit Cocktail
              </Button>
            </>
          )}

          {isAdmin && (
            <>
              <br />
              <Button onClick={() => deleteCocktail(cocktail.id, history)}>
                Delete Cocktail
              </Button>
            </>
          )}
        </AdminControls>
        {edit ? (
          <form>
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
                  placeholder={cocktail.imageUrl}
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
        ) : (
          <div>
            <Container>
              <LeftColumn>
                <img src={cocktail.imageUrl} />
              </LeftColumn>
              <RightColumn>
                <LargeText>{cocktail.name}</LargeText>
                <h3>${cocktail.price}</h3>
                <p>{cocktail.description}</p>

                <QuantityButton onClick={handleSubtract}>-</QuantityButton>
                {quantity}
                <QuantityButton onClick={handleAdd}>+</QuantityButton>

                <br />
                <br />
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </RightColumn>
            </Container>
          </div>
        )}
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
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    createCart: (id, quantity) => dispatch(createCart(id, quantity)),
    updateCocktail: (cocktail) => dispatch(updateCocktail(cocktail)),
    deleteCocktail: (id, history) => dispatch(deleteCocktail(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
