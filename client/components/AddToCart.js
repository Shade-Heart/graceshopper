import React from 'react'
import {connect} from 'react-redux'
import {postItem, fetchItems, updateItem} from './../store/lineItem'
import {gotOrders} from './../store/orderReducer'
import {Link} from 'react-router-dom'

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.gotOrders()
    this.props.fetchItems()
    // await this.props.defaultUser.id
  }

  handleClick() {
    console.log('PROPS', this.props)

    const userId = this.props.defaultUser.id

    // console.log('LUEGFLUBVSKEHB:VOIWHO:IFE',this.props)
    const userCart = this.props.allOrders.filter(
      order => order.userId === userId && order.status === 'PENDING'
    )
    // console.log('+++++++++++++++++', session)

    // dispatches function to create line item
    const orderId = userCart[0].id
    // this.props.postItem(orderId, productId)
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
    updateItem: (orderId, productId) => dispatch(updateItem(orderId, productId))
  }
}
export default connect(mapState, mapDispatch)(AddToCart)
