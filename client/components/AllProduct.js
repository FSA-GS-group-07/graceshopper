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
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  margin: 60px auto;
  max-width: 1000px;
`;

const CocktailName = styled.span``;

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
            <button type="button">Create new cocktail </button>
          </Link>
        )}
        <Grid>
          {cocktails &&
            cocktails.map((cocktail) => (
              <Link key={cocktail.id} to={`/cocktails/${cocktail.id}`}>
                <span>
                  <img src={cocktail.imageUrl} alt={cocktail.name} />
                  {cocktail.name}
                  <br />${cocktail.price}
                </span>
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
