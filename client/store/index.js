import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleCocktail from "./singleproduct";
import cocktailsReducer from "./allProduct";
import createReducer from "./createProduct";
import cartReducer from "./cart";
import usersReducer from "./user";
import ordersReducer from "./orders";

const reducer = combineReducers({
  auth,
  cocktail: singleCocktail,
  cocktails: cocktailsReducer,
  updateCocktail: singleCocktail,
  deleteCocktail: singleCocktail,
  newCocktail: createReducer,
  cart: cartReducer,
  users: usersReducer,
  orders: ordersReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
