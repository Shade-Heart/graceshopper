import React from 'react'
import {connect} from 'react-redux'
import {postItem, fetchItems, updateItem} from './../store/lineItem'
import {gotOrders, postOrder, editOrder} from './../store/orderReducer'
import {guest} from '../store'

import {Link} from 'react-router-dom'

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.gotOrders()
    this.props.fetchItems()
  }

  async handleClick() {
    const defaultUser = this.props.defaultUser

    const isLoggedin = Object.keys(defaultUser).length !== 0

    if (!isLoggedin) {
      await this.props.guest()
      // console.log('GUEST', guestUser, 'PROPS', this.props)
      const userId = guestUser.id
      await this.props.postOrder(userId)
      await this.props.editOrder(userId)
    }
    const userId = this.props.defaultUser.id

    await this.props.gotOrders()

    const userCart = this.props.allOrders.filter(
      order => order.userId === userId
    )

    // dispatches function to create line item
    const orderId = userCart[0].id
    const {productId, allLineItems} = this.props

    const itemExists = allLineItems.filter(
      item => item.hatId === productId && item.orderId === orderId
    )

    if (itemExists.length) {
      this.props.updateItem(orderId, productId)
    } else {
      this.props.postItem(orderId, productId)
    }
  }

  render() {
    return (
      <div>
        <Link to="/cart" onClick={() => this.handleClick()}>
          <p className="focus">Add To Cart </p>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allOrders: state.orderReducer.allOrders,
    defaultUser: state.user,
    allLineItems: state.lineItem.allLineItems
  }
}

const mapDispatch = dispatch => {
  return {
    postItem: (orderId, productId) => dispatch(postItem(orderId, productId)),
    gotOrders: () => dispatch(gotOrders()),
    fetchItems: () => dispatch(fetchItems()),
    updateItem: (orderId, productId) =>
      dispatch(updateItem(orderId, productId)),
    postOrder: id => dispatch(postOrder(id)),
    editOrder: id => dispatch(editOrder(id)),
    guest: () => dispatch(guest())
  }
}
export default connect(mapState, mapDispatch)(AddToCart)
