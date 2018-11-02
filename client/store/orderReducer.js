import axios from 'axios'

const initialState = {
  allOrders: []
}

//ACTIONS
export const CREATE_ORDER = 'CREATE_ORDER'
export const GET_ORDERS = 'GET_ORDER'

//ACTION CREATORS
export const getOrders = function(order) {
  return {
    type: GET_ORDERS,
    order
  }
}

export const makeOrder = function(order) {
  return {
    type: CREATE_ORDER,
    order
  }
}

export const gotOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const postOrder = uid => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', {userId: uid})
    dispatch(makeOrder(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCERS
export function allHats(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS: {
      return {
        ...state,
        allOrders: action.order
      }
    }
    case CREATE_ORDER:
      return {
        ...state,
        allOrders: [...state.allOrders, action.order]
      }
    default:
      return state
  }
}

export default allHats
