import axios from "axios";

const GET_COCKTAIL = "GET_COCKTAIL";

const gotCocktail = (cocktail) => {
  return {
    type: GET_COCKTAIL,
    cocktail,
  };
};

export const fetchCocktail = (id) => async (dispatch) => {
  try {
    let { data: cocktail } = await axios.get(`/api/cocktails/${id}`);
    dispatch(gotCocktail(cocktail));
  } catch (error) {
    console.error(error);
  }
};

export default function cocktailReducer(state = {}, action) {
  switch (action.type) {
    case GET_COCKTAIL:
      return action.cocktail;
    default:
      return state;
  }
}
