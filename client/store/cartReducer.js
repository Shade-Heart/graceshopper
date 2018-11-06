import axios from 'axios'

const initialState = {
  lineItems: []
}

//ACTIONS
export const GET_CART = 'GET_CART'

//ACTION CREATORS

export const getCart = function(items) {
  return {
    type: GET_CART,
    items
  }
}

//REDUCERS

export const gotItems = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order-hat/lineItems/${orderId}`)
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        lineItems: action.items
      }
    default:
      return state
  }
}

export default cartReducer
