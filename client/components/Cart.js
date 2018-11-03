import React from 'react'
import {connect} from 'react-redux'
import {gotItems} from '../store/cartReducer'
import {loadHats} from '../store/allHatsReducer'
import {removeItem} from '../store/lineItem'
import {me} from '../store/user'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    const userId = this.props.defaultUser.id
    console.log('USERID', userId)
    this.props.gotItems(userId)
    this.props.loadHats()
  }

  onClick() {}

  render() {
    const allProductIds = []
    this.props.lineItems.forEach(function(element) {
      allProductIds.push(element.hatId)
    })

    const cartArr = this.props.allHats.filter(product =>
      allProductIds.includes(product.id)
    )

    let totalQuantity = 0
    this.props.lineItems.forEach(function(item) {
      totalQuantity += item.quantity
    })

    let subTotal = 0

    cartArr.map(item => {
      subTotal +=
        item.price *
        this.props.lineItems.filter(product => product.hatId === item.id)[0]
          .quantity /
        100
    })

    return (
      <div>
        <h1>Cart</h1>
        <h2>
          Items in Cart: {totalQuantity} SubTotal: ${subTotal.toFixed(2)}
        </h2>
        {cartArr.length ? (
          <table>
            <thead>
              <tr>
                <th />
                <th />
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {cartArr.map(item => {
                return (
                  <tr key={item.id}>
                    <td>
                      <Link to={`/Hats/${item.id}`}>
                        <img className="cartImages" src={item.productImg} />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/Hats/${item.id}`}>{item.name}</Link>
                    </td>

                    <td>${(item.price / 100).toFixed(2)} </td>
                    <td>
                      {' '}
                      {
                        this.props.lineItems.filter(
                          product => product.hatId === item.id
                        )[0].quantity
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
    loadHats: () => dispatch(loadHats()),
    getUser: () => dispatch(me()),
    removeItem: id => dispatch(removeItem(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
