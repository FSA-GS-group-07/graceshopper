/* eslint-disable no-case-declarations */
import axios from "axios";
import history from "../history";

const GET_CART = "GET CART";
const CREATE_CART = "CREATE CART";
const ADD_TO_CART = "ADD TO CART";
const CLEAR_CART = "CLEAR CART";
const REMOVE_FROM_CART = "DELETE_FROM_CART";
const TOKEN = "token";

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
    id,
  };
};

const clearedCart = (cart) => {
  return {
    type: CLEAR_CART,
    cart,
  };
};

export const fetchCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: cart } = await axios.get("/api/cart/", {
        headers: {
          authorization: token,
        },
      });

      if (cart != null && cart != "null") {
        dispatch(gotCart(cart));
      } else {
        dispatch(gotCart({ order: {}, cocktails: [] }));
      }
    } else {
      let cart = window.localStorage.getItem("cart");
      if (cart != null && cart != "null") {
        cart = JSON.parse(cart);
      } else {
        cart = {
          order: {},
          cocktails: [],
        };
      }
      dispatch(gotCart(cart));
    }
  } catch (error) {
    console.error(error);
  }
};

export const createCart = (cocktailId, quantity, singleCocktail) => async (
  dispatch
) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: cart } = await axios.post(
        "/api/cart/",
        {
          cocktailId,
          quantity,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(createdCart(cart));
    } else {
      singleCocktail.order_items = {
        quantity,
      };
      const cartObj = {
        order: {},
        cocktails: [singleCocktail],
      };
      const cartString = JSON.stringify(cartObj);
      window.localStorage.setItem("cart", cartString);
      dispatch(gotCart(cartObj));
    }
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (cocktailId, quantity, cocktail) => async (
  dispatch
) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: item } = await axios.put(
        "/api/cart/",
        { cocktailId, quantity },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(addedToCart(item));
    } else {
      let cart = JSON.parse(window.localStorage.getItem("cart")) || {
        order: {},
        cocktails: [cocktail],
      };

      let updatedItem = false;
      let updatedCocktails = cart.cocktails.map((drink) => {
        if (drink.id == cocktailId) {
          drink.order_items.quantity += quantity;
          updatedItem = true;
        }
        return drink;
      });
      if (!updatedItem) {
        cocktail.order_items = {
          quantity,
        };
        updatedCocktails.push(cocktail);
      }
      const cartObj = {
        order: {},
        cocktails: updatedCocktails,
      };
      const cartString = JSON.stringify(cartObj);
      window.localStorage.setItem("cart", cartString);
      dispatch(gotCart(cartObj));
    }
  } catch (error) {
    console.error(error);
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      await axios.put("/api/cart/completed", {
        headers: {
          authorization: token,
        },
      });
    } else {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      if (cart) {
        cart.order.status = "complete";
        await axios.post("/api/cart", cart);
        window.localStorage.setItem("cart", null);
      }
    }
    dispatch(
      clearedCart({
        order: {},
        cocktails: [],
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    await axios.delete(`/api/cart/cocktail/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(removedFromCart(id));
    history.push("/cart");
  } catch (error) {
    console.error(error);
  }
};

export default function cartReducer(
  state = { order: {}, cocktails: [] },
  action
) {
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
      return {
        ...state,
        cocktails: [...state.cocktails].filter(
          (cocktail) => cocktail.id !== action.cocktailId
        ),
      };
    case CLEAR_CART:
      return action.cart;
    default:
      return state;
  }
}
