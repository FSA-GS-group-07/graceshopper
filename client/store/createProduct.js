import axios from "axios";
import { bindActionCreators } from "redux";

const CREATE_COCKTAIL = "CREATE_COCKTAIL";

export const createdCocktail = (cocktail) => ({
  type: CREATE_COCKTAIL,
  cocktail,
});

export const createCocktail = (cocktail, history) => async (dispatch) => {
  try {
    const { data: addCocktail } = await axios.post("/api/cocktails");
    dispatch(createdCocktail(addCocktail));
    history.push("/cocktails");
  } catch (error) {
    console.error(error);
  }
};

export default function createCocktailReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_COCKTAIL:
      return action.cocktail;
    default:
      return state;
  }
}
