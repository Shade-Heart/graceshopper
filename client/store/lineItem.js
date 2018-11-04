import axios from 'axios'

const initialState = {
  allLineItems: [],
  lineItem: {}
}

//ACTIONS
export const GET_ITEMS = 'GET_ITEMS'
export const CREATE_LINE_ITEM = 'CREATE_LINE_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

//ACTION CREATORS
export const getItems = function(items) {
  return {
    type: GET_ITEMS,
    items
  }
}

export const makeItem = function(product) {
  return {
    type: CREATE_LINE_ITEM,
    product
  }
}

export const editItem = function(item) {
  return {
    type: EDIT_ITEM,
    item
  }
}

export const deleteItem = function(id) {
  return {
    type: DELETE_ITEM,
    id
  }
}

//Thunks
export const fetchItems = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order-hat')
    dispatch(getItems(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateItem = (orderId, hatId) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/order-hat/lineItems/${orderId}/${hatId}`
    )
    dispatch(editItem(data))
  } catch (err) {
    console.error(err)
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

export const removeItem = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/order-hat/lineItems/${id}`)
      dispatch(deleteItem(id))
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCERS
export function lineItem(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        allLineItems: action.items
      }
    }
    case CREATE_LINE_ITEM: {
      return {
        ...state,
        lineItem: action.product
      }
    }
    case EDIT_ITEM: {
      return {
        ...state,
        allLineItems: [
          ...state.allLineItems.filter(
            item => item.hatId !== action.item.hatId
          ),
          action.item
        ]
      }
    }
    case DELETE_ITEM:
      return {
        ...state,
        allLineItems: [
          ...state.allLineItems.filter(item => item.id !== action.id)
        ]
      }

    default:
      return state
  }
}

export default lineItem
