import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCocktails } from '../store/allProduct';
import styled from 'styled-components';

//CSS STYLES
const Grid = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  margin: 60px auto;
  max-width: 1000px;
`;

const Button = styled.button`
  & {
    display: none;
    position: absolute;
    top: 45%;
    left: 23%;
    background-color: transparent;
    border: 2px solid white;
    padding: 0.5rem 1rem 0.5rem 1rem;
    color: white;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.75em;
    /* height: 20%;
    width: 80%; */
  }
`;

//change text to "+" when media is too small
//css content, after element "::after ::before"

const Wrapper = styled.div`
  & {
    position: relative;
  }

  &:hover img {
    filter: brightness(70%);
  }
  &:hover button {
    display: block;
  }
`;

const Text = styled.span`
  font-family: 'Bebas Neue', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0 5px 0;
`;

const SmallText = styled.span`
  padding: 3rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75em;
`;

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
                  <Button>Add to Cart</Button>
                </Wrapper>
                <Container>
                  <Text>{cocktail.name}</Text> <Text>${cocktail.price}</Text>
                </Container>
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
