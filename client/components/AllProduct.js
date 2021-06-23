import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCocktails } from '../store/allProduct';
import {
  Grid,
  CartButton,
  Wrapper,
  Text,
  GridContainer,
  SmallText,
} from '../styled-components';

class AllProduct extends React.Component {
  componentDidMount() {
    this.props.getCocktails();
  }

  render() {
    const { cocktails, isAdmin } = this.props;
    return (
      <div className="all-cocktails">
        {isAdmin && (
          <Link to="/cocktails/create">
            <SmallText>
              <b>Admin Controls: </b>Create new cocktail{' '}
            </SmallText>
          </Link>
        )}
        <Grid>
          {cocktails &&
            cocktails.map((cocktail) => (
              <Link key={cocktail.id} to={`/cocktails/${cocktail.id}`}>
                <Wrapper>
                  <img src={cocktail.imageUrl} alt={cocktail.name} />
                  <CartButton>Add to Cart</CartButton>
                </Wrapper>
                <GridContainer>
                  <Text>{cocktail.name}</Text> <Text>${cocktail.price}</Text>
                </GridContainer>
              </Link>
            ))}
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  cocktails: state.cocktails,
  isAdmin: state.auth.admin,
});

const mapDispatch = (dispatch) => ({
  getCocktails: () => {
    dispatch(fetchCocktails());
  },
});

export default connect(mapState, mapDispatch)(AllProduct);
