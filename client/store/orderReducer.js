import axios from 'axios'

const initialState = {
  allOrders: [],
  selectedOrder: {}
}

//ACTIONS
export const CREATE_ORDER = 'CREATE_ORDER'
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDER = 'GET_ORDER'
export const EDIT_ORDER = 'EDIT_ORDER'

//ACTION CREATORS
export const getOrders = function(order) {
  return {
    type: GET_ORDERS,
    order
  }
}
export const getOrder = function(oid) {
  return {
    type: GET_ORDER,
    oid
  }
}

export const makeOrder = function(order) {
  return {
    type: CREATE_ORDER,
    order
  }
}

export const editOrder = function(id) {
  return {
    type: EDIT_ORDER,
    id
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
export const gotOrder = oid => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/oid/${oid}`)
    dispatch(getOrder(data))
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

export const postOrderGuest = uid => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', {userId: uid, oid: uid})
    dispatch(makeOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrder = userId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${userId}`)
    dispatch(editOrder(data))
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

    case EDIT_ORDER: {
      return {
        ...state,
        allOrders: [
          ...state.allOrders.filter(order => order.userId !== action.id),
          action.item
        ]
      }
    }
    case GET_ORDER: {
      return {
        ...state,
        selectedOrder: action.oid
      }
    }
    default:
      return state
  }
}

export default orderReducer
