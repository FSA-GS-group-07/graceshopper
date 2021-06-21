import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleCocktail from './singleproduct';
import cocktailsReducer from './allProduct';
import createReducer from "./createProduct";
import cartReducer from './cart';


const reducer = combineReducers({
  auth,
  cocktail: singleCocktail,
  cocktails: cocktailsReducer,
  updateCocktail: singleCocktail,
  deleteCocktail: singleCocktail,
  newCocktail: createReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
