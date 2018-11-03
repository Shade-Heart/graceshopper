import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleHat from './singleHatReducer'
import allHats from './allHatsReducer'
import orderReducer from './orderReducer'
import lineItem from './lineItem'
import cartReducer from './cartReducer'

const reducer = combineReducers({
  user,
  allHats,
  singleHat,
  orderReducer,
  lineItem,
  cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
