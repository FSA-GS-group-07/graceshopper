import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';
import styled from 'styled-components';

//CSS STYLES
const Container = styled.div`
  width: 75%;
  padding: 1rem 4rem 3rem 4rem;
  display: flex;
  flex-direction: column;
`;
const List = styled.div`
  padding: 1rem;
  margin-left: 3rem;
  display: flex;
`;

const LeftColumn = styled.div`
  width: 40%;
  position: relative;
`;

const RightColumn = styled.div`
  width: 60%;
  margin-left: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const LargeText = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 3rem;
`;

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="cart">
        <Container>
          {cart.cocktails &&
            cart.cocktails.map((cocktail) => (
              <Link
                key={cocktail.id || cocktail.cocktailId}
                to={`/cocktails/${cocktail.id}`}
              >
                <List>
                  <LeftColumn>
                    <img src={cocktail.imageUrl} alt={cocktail.name} />
                  </LeftColumn>
                  <RightColumn>
                    <LargeText>{cocktail.name}</LargeText>
                    <h3>${cocktail.price}</h3>
                  </RightColumn>
                </List>
              </Link>
            ))}
          <ButtonContainer>
            <Button>Checkout</Button>
          </ButtonContainer>
        </Container>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(Cart);
