import React from 'react'
import {connect} from 'react-redux'
import {postItem} from './../store/lineItem'
import {gotOrders} from './../store/orderReducer'

class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    this.props.gotOrders()
    console.log('GVHGV', this.props.allOrders)
    // await this.props.defaultUser.id
  }

  handleClick() {
    const userId = this.props.defaultUser.id
    console.log('PROPS', this.props)

    // console.log('LUEGFLUBVSKEHB:VOIWHO:IFE',this.props)
    const userCart = this.props.allOrders.filter(
      order => order.userId === userId
    )
    // console.log('+++++++++++++++++', session)

    // dispatches function to create line item
    const orderId = userCart[0].id
    // this.props.postItem(orderId, productId)
    const {productId} = this.props

    this.props.postItem(orderId, productId)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>Add To Cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allOrders: state.orderReducer.allOrders,
    defaultUser: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    postItem: (orderId, productId) => dispatch(postItem(orderId, productId)),
    gotOrders: () => dispatch(gotOrders())
  }
}
export default connect(mapState, mapDispatch)(AddToCart)
