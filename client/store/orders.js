import axios from "axios";

const GET_ORDERS = "GET ORDERS";

const gotOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});

export const fetchOrders = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: orders } = await axios.get("/api/orders/", {
        headers: {
          authorization: token,
        },
      });

      if (orders != null && orders != "null") {
        dispatch(gotOrders(orders));
      } else {
        dispatch(gotOrders([]));
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
