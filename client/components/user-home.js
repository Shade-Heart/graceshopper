import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Welcome from './Welcome'
import {postOrder} from './../store/orderReducer'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    const userId = this.props.id
    this.props.postOrder(userId)
  }

  render() {
    const displayName =
      this.props.firstName === undefined || this.props.firstName === null
        ? this.props.email
        : this.props.firstName

    return (
      <div>
        <h3>Welcome, {displayName}</h3>
        <Welcome />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    id: state.user.id
    // order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    postOrder: id => dispatch(postOrder(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
