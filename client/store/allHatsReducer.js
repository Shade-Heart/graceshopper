import axios from 'axios'

const initialState = {
  allHats: []
}

//ACTIONS
export const GOT_HATS = 'GOT_HATS'
export const ADD_HATS = 'ADD_HATS'

//ACTION CREATORS

export const gotHats = function(hats) {
  return {
    type: GOT_HATS,
    hats
  }
}

export const addHats = function(hats) {
  return {
    type: ADD_HATS,
    hats
  }
}

// THUNK CREATORS

export const loadHats = () => {
  return async dispatch => {
    const res = await axios.get('/api/hats')
    dispatch(gotHats(res.data))
  }
}
export const postHats = hat => {
  return async dispatch => {
    const {data} = await axios.post('/api/hats', hat)
    dispatch(addHats(data))
  }
}

//REDUCERS
export function allHats(state = initialState, action) {
  switch (action.type) {
    case GOT_HATS:
      return {
        ...state,
        allHats: action.hats
      }
    case ADD_HATS:
      return {
        ...state,
        allHats: [...state.allHats, action.hats]
      }
    default:
      return initialState
  }
}

export default allHats
