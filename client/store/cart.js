import axios from 'axios';

const GET_CART = 'GET CART';

const gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

export const fetchCart = () => async (dispatch) => {
  try {
    let { data: cart } = await axios.get(`/api/cart/`);
    dispatch(gotCart(cart));
  } catch (error) {
    console.error(error);
  }
};

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
