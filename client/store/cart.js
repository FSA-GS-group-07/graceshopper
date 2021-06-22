/* eslint-disable no-case-declarations */
import axios from "axios";

const GET_CART = "GET CART";
const CREATE_CART = "CREATE CART";
const ADD_TO_CART = "ADD TO CART";

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
    } else {
      let cart = window.localStorage.getItem("cart");
      if (cart) {
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

export const createCart =
  (cocktailId, quantity, singleCocktail) => async (dispatch) => {
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

export const addToCart =
  (cocktailId, quantity, cocktail) => async (dispatch) => {
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
      } else {
        const cart = JSON.parse(window.localStorage.getItem("cart"));
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
    default:
      return state;
  }
}
