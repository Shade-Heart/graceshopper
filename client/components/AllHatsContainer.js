import {connect} from 'react-redux'
import AllHats from './AllHats'
import {loadHats, removeHats} from '../store/allHatsReducer'

const mapState = state => {
  return {
    allHats: state.allHats.allHats
  }
}
const mapDispatch = dispatch => {
  return {
    loadHats: () => dispatch(loadHats()),
    deleteHat: id => dispatch(removeHats(id))
  }
}

export default connect(mapState, mapDispatch)(AllHats)
