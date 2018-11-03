import axios from 'axios'

const initialState = {
  lineItems: []
}

//ACTIONS
export const GET_CART = 'GET_CART'
// export const ADD_CART = 'ADD_HATS'
// export const UPDATE_CART = 'UPDATE_CART'
// export const REMOVE_CART = 'REMOVE_HATS'
// export const CLEAR_CART = 'CLEAR_CART'

//ACTION CREATORS

export const getCart = function(items) {
  return {
    type: GET_CART,
    items
  }
}

// export const addCart = function(item) {
//     return {
//       type: ADD_CART,
//       item // {productNameOrId: 5}
//     }
//   }

//REDUCERS

export const gotItems = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order-hat/lineItems/${orderId}`)
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

// case GET_CART: {
//     return {
//         ...state,

//     }
// }
// case ADD_CART: {
//     if ()
//     localStorage.setItem('cart', initialState)
//     action.item

//     return {
//         ...state,

//     }
// }
// case REMOVE_CART: {
//     return {
//         ...state,

//     }
// }
// case UPDATE_CART: {
//     return {
//         ...state,

//     }
// }
// case CLEAR_CART: {
//     return {
//         ...state,

//     }
// }
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
