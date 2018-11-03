import axios from 'axios'

const initialState = {
  allOrders: [],
  selectedOrder: {}
}

//ACTIONS
export const CREATE_ORDER = 'CREATE_ORDER'
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDER = 'GET_ORDER'

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

// export const getOrder = function(order) {
//     return {
//         type: GET_ORDER,
//         order
//     }
// }

export const gotOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
  }
}

// export const fetchOrder = uid => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/orders/cart/${uid}`)
//     console.log('HELLO', data[0])
//     dispatch(getOrder(data[0]))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const postOrder = uid => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', {userId: uid})
    dispatch(makeOrder(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCERS
export function orderReducer(state = initialState, action) {
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
    // case GET_ORDER:
    //   return {
    //       ...state,
    //       selectedOrder: action.order
    //   }
    default:
      return state
  }
}

export default orderReducer
