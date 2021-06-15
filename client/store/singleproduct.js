import axios from "axios";

const GET_PRODUCT = "GET_PRODUCT";

const gotProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    let { data: product } = await axios.get(`/api/products/${id}`);
    dispatch(gotProduct(product));
  } catch (error) {
    console.log(error);
  }
};

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
