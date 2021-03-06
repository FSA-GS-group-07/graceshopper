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
import {
  SmallText,
  LargeText,
  Button,
  Input,
  QuantityButton,
  ContainerSingle,
  LeftColumnSingle,
  RightColumnSingle,
  AdminButton,
  CartContainer,
  CenterContainer,
  Container,
} from '../styled-components';
import NotFound from './NotFound';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      edit: false,
      name: '',
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
    if (this.state.quantity < 10) {
      this.setState({ quantity: this.state.quantity + 1 });
    }
  }

  handleSubtract() {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }

  async handleAddToCart() {
    if (this.props.cart.cocktails && this.props.cart.cocktails.length > 0) {
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
    const { edit, name, price, description, quantity } = this.state;

    const {
      handleChange,
      handleSubmit,
      handleSubtract,
      handleAdd,
      handleAddToCart,
    } = this;

    if (cocktail.error) {
      return <NotFound />;
    }

    return (
      <div>
        <CartContainer>
          <Link to="/cocktails">
            <SmallText>
              <IoChevronBack /> Back to all cocktails
            </SmallText>
          </Link>
        </CartContainer>
        <CenterContainer>
          {isAdmin && (
            <>
              <br />
              <AdminButton
                onClick={() =>
                  this.setState((prevState) => ({ edit: !prevState.edit }))
                }
              >
                Edit Cocktail
              </AdminButton>
            </>
          )}

          {isAdmin && (
            <>
              <br />
              <AdminButton onClick={() => deleteCocktail(cocktail.id, history)}>
                Delete Cocktail
              </AdminButton>
            </>
          )}
        </CenterContainer>

        {edit ? (
          <Container>
            <form>
              <SmallText>
                <label>Name</label>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={name}
                />
                <br />
                <label>Description</label>
                <Input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={description}
                />
                <br />
                <label>Price:</label>
                <Input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={price}
                />
                <br />
                <br />
                <Button type="submit" onClick={(event) => handleSubmit(event)}>
                  Submit
                </Button>
              </SmallText>
            </form>
          </Container>
        ) : (
          <div>
            <ContainerSingle>
              <LeftColumnSingle>
                <img src={cocktail.imageUrl} />
              </LeftColumnSingle>
              <RightColumnSingle>
                <LargeText>{cocktail.name}</LargeText>
                <h3>${cocktail.price}</h3>
                <p>{cocktail.description}</p>
                {<QuantityButton onClick={handleSubtract}>-</QuantityButton>}
                {quantity}
                <QuantityButton onClick={handleAdd}>+</QuantityButton>
                <br />
                <br />
                <Button onClick={handleAddToCart}>Add to Cart</Button>
              </RightColumnSingle>
            </ContainerSingle>
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
    addToCart: (id, quantity, cocktail) =>
      dispatch(addToCart(id, quantity, cocktail)),
    createCart: (id, quantity, cocktail) =>
      dispatch(createCart(id, quantity, cocktail)),
    updateCocktail: (cocktail) => dispatch(updateCocktail(cocktail)),
    deleteCocktail: (id, history) => dispatch(deleteCocktail(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
