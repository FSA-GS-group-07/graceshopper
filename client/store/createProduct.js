import axios from "axios";

const CREATE_COCKTAIL = "CREATE_COCKTAIL";

export const createdCocktail = (cocktail) => ({
  type: CREATE_COCKTAIL,
  cocktail,
});

export const createCocktail = (cocktail, history) => async (dispatch) => {
  try {
    console.log(cocktail);
    const { data: addCocktail } = await axios.post("/api/cocktails", cocktail);
    dispatch(createdCocktail(addCocktail));
    history.push("/cocktails");
  } catch (error) {
    console.error(error);
  }
};

export default function createReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_COCKTAIL:
      return action.cocktail;
    default:
      return state;
  }
}
