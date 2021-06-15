import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCoctails } from "../store/allProduct";

class AllProduct extends React.Component {
  componentDidMount() {
    this.props.getCocktails();
  }

  render() {
    return (
      <div className="all-cocktails">
        {this.props.cocktails.map((cocktail) => (
          <span key={cocktail.id}>
            <h1>{cocktail.name}</h1>
            <img src={cocktail.imageUrl} alt={cocktail.name} />
            <h3>{cocktail.price}</h3>
            <p>{cocktail.description}</p>
          </span>
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
    dispatch(fetchCoctails());
  },
});

export default connect(mapState, mapDispatch)(AllProduct);
