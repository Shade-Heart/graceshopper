import {connect} from 'react-redux'
import AllHats from './AllHats'
import {loadHats} from '../store/allHatsReducer'

const mapState = state => {
  return {
    allHats: state.allHats.allHats
  }
}
const mapDispatch = dispatch => {
  return {
    loadHats: () => dispatch(loadHats())
  }
}

export default connect(mapState, mapDispatch)(AllHats)
