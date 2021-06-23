import axios from 'axios';

const GET_COCKTAIL = 'GET_COCKTAIL';
const UPDATE_COCKTAIL = 'UPDATE_COCKTAIL';
const DELETE_COCKTAIL = 'DELETE_COCKTAIL';

const gotCocktail = (cocktail) => ({
  type: GET_COCKTAIL,
  cocktail,
});

const _updatedCocktail = (cocktail) => ({
  type: UPDATE_COCKTAIL,
  cocktail,
});

const _deleteCocktail = (cocktail) => ({
  type: DELETE_COCKTAIL,
  cocktail,
});

export const fetchCocktail = (id) => async (dispatch) => {
  try {
    const { data: cocktail } = await axios.get(`/api/cocktails/${id}`);
    dispatch(gotCocktail(cocktail));
  } catch (error) {
    console.error(error);
  }
};

export const updateCocktail = (cocktail) => async (dispatch) => {
  try {
    const { data: revisedCocktail } = await axios.put(
      `/api/cocktails/${cocktail.id}`,
      cocktail
    );
    dispatch(_updatedCocktail(revisedCocktail));
  } catch (error) {
    console.error(error);
  }
};

export const deleteCocktail = (id, history) => async (dispatch) => {
  try {
    const { data: removedCocktail } = await axios.delete(
      `/api/cocktails/${id}`
    );
    if (dispatch(_deleteCocktail(removedCocktail))) {
      history.push('/cocktails');
    }
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
    case DELETE_COCKTAIL:
      return action.cocktail;
    default:
      return state;
  }
}
