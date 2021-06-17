import axios from "axios";

const GET_COCKTAIL = "GET_COCKTAIL";
const UPDATE_COCKTAIL = "UPDATE_COCKTAIL";

const gotCocktail = (cocktail) => {
  return {
    type: GET_COCKTAIL,
    cocktail,
  };
};

const _updatedCocktail = (cocktail) => {
  return {
    type: UPDATE_COCKTAIL,
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

export const updateCocktail = (cocktail) => async (dispatch) => {
  try {
    let { data: revisedCocktail } = await axios.put(
      `/api/cocktails/${cocktail.id}`,
      cocktail
    );
    // console.log(revisedCocktail);
    dispatch(_updatedCocktail(revisedCocktail));
  } catch (error) {
    console.error(error);
  }
};

export default function cocktailReducer(state = {}, action) {
  switch (action.type) {
    case GET_COCKTAIL:
      return action.cocktail;
    case UPDATE_COCKTAIL:
      return action.cocktail;
    default:
      return state;
  }
}
