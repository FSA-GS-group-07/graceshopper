import axios from "axios";

const GET_CART = "GET CART";
const CREATE_CART = "CREATE CART";

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

export const fetchCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: cart } = await axios.get("/api/cart", {
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

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case CREATE_CART:
      return action.cart;
    default:
      return state;
  }
}
