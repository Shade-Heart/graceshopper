import axios from 'axios'

const initialState = {
  lineItem: {}
}

//ACTIONS
export const CREATE_LINE_ITEM = 'CREATE_LINE_ITEM'

//ACTION CREATORS
export const makeItem = function(product) {
  return {
    type: CREATE_LINE_ITEM,
    product
  }
}

export const postItem = (orderId, productId) => async dispatch => {
  try {
    const {data} = await axios.post('/api/order-hat', {
      orderId,
      hatId: productId
    })
    dispatch(makeItem(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCERS
export function lineItem(state = initialState, action) {
  switch (action.type) {
    case CREATE_LINE_ITEM: {
      return {
        ...state,
        lineItem: action.product
      }
    }

    default:
      return state
  }
}

export default lineItem
