import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Welcome from './Welcome'
import {postOrder, gotOrders, updateOrder} from './../store/orderReducer'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  async componentDidMount() {
    await this.props.gotOrders()
    const userId = this.props.id

    const userCart = this.props.allOrders.filter(
      order => order.userId === userId
    )
    if (userCart.length < 1) {
      this.props.postOrder(userId)
    }
    this.props.editOrder(userId)
  }

  render() {
    const displayName =
      this.props.firstName === undefined ||
      this.props.firstName === null ||
      this.props.firstName === ''
        ? this.props.email
        : this.props.firstName

    return (
      <div>
        <Welcome user={displayName} />
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
    id: state.user.id,
    allOrders: state.orderReducer.allOrders
  }
}

const mapDispatch = dispatch => {
  return {
    postOrder: id => dispatch(postOrder(id)),
    gotOrders: () => dispatch(gotOrders()),
    editOrder: id => dispatch(updateOrder(id))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
