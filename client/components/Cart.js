import React from 'react'
import {connect} from 'react-redux'
import {gotItems} from '../store/cartReducer'
import {loadHats} from '../store/allHatsReducer'

class Cart extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    const userId = this.props.defaultUser.id
    this.props.gotItems(userId)
    this.props.loadHats()
  }
  onClick() {}

  render() {
    const allProducts = []
    this.props.lineItems.forEach(function(element) {
      allProducts.push(element.hatId)
    })

    const cartArr = this.props.allHats.filter(product =>
      allProducts.includes(product.id)
    )
    console.log('HATSTORE', cartArr)

    return (
      <div>
        <h1>Cart</h1>
        {cartArr.length ? (
          cartArr.map(item => {
            return (
              <li key={item.id}>
                {/* <img src={item.productImg} /> */}
                {item.name} ${item.price / 100}
              </li>
            )
          })
        ) : (
          <h2>Empty</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allOrders: state.orderReducer.allOrders,
    defaultUser: state.user,
    lineItems: state.cartReducer.lineItems,
    allHats: state.allHats.allHats
  }
}

const mapDispatch = dispatch => {
  return {
    gotItems: id => dispatch(gotItems(id)),
    loadHats: () => dispatch(loadHats())
  }
}

export default connect(mapState, mapDispatch)(Cart)
