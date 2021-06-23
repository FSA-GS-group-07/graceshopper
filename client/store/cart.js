/* eslint-disable no-case-declarations */
import axios from "axios";

const GET_CART = "GET CART";
const CREATE_CART = "CREATE CART";
const ADD_TO_CART = "ADD TO CART";
const REMOVE_FROM_CART = "DELETE_FROM_CART"

const gotCart = (cart) => ({
  type: GET_CART,
  cart,
});

const createdCart = (cart) => {
  return {
    type: CREATE_CART,
    cart,
  };
};

const addedToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item,
  };
};

const removedFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id
  }
}

export const fetchCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: cart } = await axios.get("/api/cart/", {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotCart(cart));
    }
  } catch (error) {
    console.error(error);
  }
};

export const createCart = (cocktailId, quantity) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: cart } = await axios.post("/api/cart/", {
        headers: {
          authorization: token,
        },
        body: {
          cocktailId,
          quantity,
        },
      });
      dispatch(createdCart(cart));
    }
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (cocktailId, quantity) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: item } = await axios.put("/api/cart/", {
        headers: {
          authorization: token,
        },
        body: {
          cocktailId,
          quantity,
        },
      });
      dispatch(addedToCart(item));
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/cocktail/${id}`)
    dispatch(removedFromCart(id))
  } catch (error) {
    console.error(error)
  }
}

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case CREATE_CART:
      return action.cart;
    case ADD_TO_CART:
      let updatedItem = false;
      let updatedCocktails = state.cocktails.map((cocktail) => {
        if (cocktail.id === action.item.cocktailId) {
          cocktail.order_items.quantity = action.item.quantity;
          updatedItem = true;
        }
        return cocktail;
      });
      if (!updatedItem) {
        updatedCocktails.push(action.item);
      }
      return { ...state, cocktails: updatedCocktails };
    case REMOVE_FROM_CART:
      return {...state, cocktails: [...state.cocktails].filter((cocktail) => cocktail.id !== action.cocktailId)}
    default:
      return state;
  }
}
