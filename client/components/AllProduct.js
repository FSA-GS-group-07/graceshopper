import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../store/allProduct";
class AllProduct extends React.Component {
  componentDidMount() {
    this.props.getCocktails();
  }

  render() {
    const { cocktails, isAdmin } = this.props;
    return (
      <div className="all-cocktails">
        {isAdmin && <button type="button">Create new cocktail </button>}
        {cocktails &&
          cocktails.map((cocktail) => (
            <Link key={cocktail.id} to={`/cocktails/${cocktail.id}`}>
              <span>
                <h1>{cocktail.name}</h1>
                <img src={cocktail.imageUrl} alt={cocktail.name} />
                <h3>{cocktail.price}</h3>
                <p>{cocktail.description}</p>
              </span>
            </Link>
          ))}
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
