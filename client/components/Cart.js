import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick() {}

  render() {
    return <div />
  }
}

const mapState = state => {
  return {
    allOrders: state.orderReducer.allOrders
  }
}

export default Cart
