import {connect} from 'react-redux'
import SingleHat from './SingleHat'
import {loadHat} from '../store/singleHatReducer'

const mapState = state => {
  return {
    singleHat: state.singleHat.singleHat,
    defaultUser: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    loadHat: id => dispatch(loadHat(id))
  }
}

export default connect(mapState, mapDispatch)(SingleHat)
