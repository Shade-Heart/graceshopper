import axios from 'axios'

const initialState = {
  order: {}
}

//ACTIONS
export const CREATE_ORDER = 'CREATE_ORDER'

//ACTION CREATORS

export const makeOrder = function(order) {
  return {
    type: CREATE_ORDER,
    order
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
    case CREATE_ORDER:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}

export default allHats
