import axios from 'axios'

const initialState = {
  allHats: []
}

//ACTIONS
export const GOT_HATS = 'GOT_HATS'

//ACTION CREATORS

export const gotHats = function(hats) {
  return {
    type: GOT_HATS,
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

//REDUCERS
export function allHats(state = initialState, action) {
  switch (action.type) {
    case GOT_HATS:
      return {
        ...state,
        allHats: action.hats
      }
    default:
      return initialState
  }
}

export default allHats
