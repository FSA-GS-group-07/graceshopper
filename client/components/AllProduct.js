import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../store/allProduct";

class AllProduct extends React.Component {
  componentDidMount() {
    this.props.getCocktails();
  }

  render() {
    const { cocktails } = this.props;
    return (
      <div className="all-cocktails">
        {cocktails &&
          cocktails.map((cocktail) => (
            <Link to={`/cocktails/${cocktail.id}`}>
              <span key={cocktail.id}>
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

const mapState = (state) => {
  return { cocktails: state.cocktails };
};

const mapDispatch = (dispatch) => ({
  getCocktails: () => {
    dispatch(fetchCocktails());
  },
});

export default connect(mapState, mapDispatch)(AllProduct);
