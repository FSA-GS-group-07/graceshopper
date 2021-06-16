import axios from 'axios';

const GOT_ORDERS = 'GOT ORDERS';

const gotOrders = (orders) => ({
  type: GOT_ORDERS,
  orders,
});
