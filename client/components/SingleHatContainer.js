import {connect} from 'react-redux'
import SingleHat from './SingleHat'
import {loadHat} from '../store/singleHatReducer'
import {gotOrders} from '../store/orderReducer'

const mapState = state => {
  return {
    singleHat: state.singleHat.singleHat,
    defaultUser: state.user,
    allOrders: state.orderReducer.allOrders
  }
}
const mapDispatch = dispatch => {
  return {
    loadHat: id => dispatch(loadHat(id))
  }
}

export default connect(mapState, mapDispatch)(SingleHat)
