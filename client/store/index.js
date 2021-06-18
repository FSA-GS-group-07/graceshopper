import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleCocktail from "./singleproduct";
import cocktailsReducer from "./allProduct";
import usersReducer from "./user";

const reducer = combineReducers({
  auth,
  cocktail: singleCocktail,
  cocktails: cocktailsReducer,
  users: usersReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
