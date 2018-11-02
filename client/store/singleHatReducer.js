import axios from 'axios'

const initialState = {
  singleHat: {}
}
export const GOT_HAT = 'GOT_HAT'

export const gotHat = function(hat) {
  return {
    type: GOT_HAT,
    hat
  }
}

export const loadHat = id => {
  return async dispatch => {
    const res = await axios.get(`/api/hats/${id}`)
    dispatch(gotHat(res.data))
  }
}

export function singleHat(state = initialState, action) {
  switch (action.type) {
    case GOT_HAT:
      return {
        ...state,
        singleHat: action.hat
      }
    default:
      return state // why doesn't it work with initil one?
  }
}

export default singleHat
