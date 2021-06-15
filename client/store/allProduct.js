import axios from "axios";

const SET_COCKTAILS = "SET_COCKTAILS";

export const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
});

export const fetchCocktails = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/cocktails");
    dispatch(setCocktails(data));
  } catch (err) {
    console.error(err);
  }
};

export default function cocktailsReducer(state = [], action) {
  switch (action.type) {
    case SET_COCKTAILS:
      return action.cocktails;
    default:
      return state;
  }
}
