import React from 'react'
import {connect} from 'react-redux'
import {gotItems} from '../store/cartReducer'
import {loadHats} from '../store/allHatsReducer'
import {removeItem} from '../store/lineItem'
import {gotOrders} from '../store/orderReducer'
import {me} from '../store/user'
import {Link} from 'react-router-dom'
import Checkout from './Checkout'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    if (this.props.defaultUser.email) {
      await this.props.getUser()
    }
    await this.props.gotOrders()
    const userId = this.props.defaultUser.id
    console.log(userId)
    const orderId = this.props.allOrders.filter(
      order => order.oid === userId && order.status === 'PENDING'
    )
    console.log(orderId)
    this.props.gotItems(orderId[0].id)
    this.props.loadHats()
  }

  handleChange() {
    this.setState({toggle: true})
  }

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
          .quantity
    })
    const userId = this.props.defaultUser.id
    const orderId = this.props.allOrders.filter(order => order.oid === userId)
    const cartOrder = orderId.filter(order => order.status === 'PENDING')[0].id
    console.log('@@@@@@@@@@@@@@', cartOrder)
    return (
      <div className="bgPages">
        {cartArr.length ? (
          <div>
            <div id="wrap">
              <div id="cart_layout_2">
                <h1>Shopping Cart</h1>

                <div className="item">
                  <h3>Item</h3>
                </div>

                <div className="cartHeaderPrice">
                  <h3>Price</h3>
                </div>

                <div className="cartHeaderQty">
                  <h3>Qty</h3>
                </div>

                <div className="cartHeaderTotal">
                  <h3>Total</h3>
                </div>

                {cartArr.map(item => {
                  return (
                    <div key={item.id} className="cart_details">
                      <div className="item">
                        <div className="product_image">
                          <Link to={`/Hats/${item.id}`}>
                            <img className="cartImages" src={item.productImg} />
                          </Link>
                        </div>
                        <div className="product_details">
                          <Link to={`/Hats/${item.id}`}>
                            <span>{item.name}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="price">
                        <div className="center">
                          <span>${(item.price / 100).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="qty">
                        <div className="center">
                          {/* <input for="qty">
          </input> */}
                          {
                            this.props.lineItems.filter(
                              product => product.hatId === item.id
                            )[0].quantity
                          }
                        </div>
                      </div>
                      <div className="total">
                        <div className="center">
                          <span>
                            ${(
                              item.price *
                              this.props.lineItems.filter(
                                product => product.hatId === item.id
                              )[0].quantity /
                              100
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="remove">
                        <div className="center">
                          <button
                            onClick={() =>
                              this.props.removeItem(
                                this.props.lineItems.filter(
                                  product =>
                                    product.hatId === item.id &&
                                    product.orderId === orderId[0].id
                                )[0].id
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="complete_cart">
                <div className="update">
                  <div className="coupon">
                    <h2>Coupon Code</h2>
                    <input type="text" />
                    <a className="button" href="#">
                      Update Cart
                    </a>
                  </div>
                </div>
                <div className="checkout">
                  <div className="subtotal">
                    <h2>Subtotal ({totalQuantity} items):</h2>
                    <span className="finalprice">
                      ${(subTotal / 100).toFixed(2)}
                    </span>
                    <a className="refresh">
                      <i className="fa fa-refresh" />
                    </a>
                  </div>
                  <div className="complete">
                    <a className="button">
                      <div>
                        <p onClick={() => this.handleChange()}>Check Out</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {this.state.toggle ? (
              <div className="checkoutStripe">
                <Checkout orderId={cartOrder} subTotal={subTotal} />
              </div>
            ) : null}
          </div>
        ) : (
          <div id="wrap">
            <div id="cart_layout_2">
              <h1>Shopping Cart</h1>

              <div className="item">
                <h3>Item</h3>
                <h1>Cart is Empty</h1>
                <p>
                  Looks like you have no items in your shopping cart. Click{' '}
                  <Link to="/hats">here</Link> to continue shopping.
                </p>
              </div>

              <div className="cartHeaderPrice">
                <h3>Price</h3>
              </div>

              <div className="cartHeaderQty">
                <h3>Qty</h3>
              </div>

              <div className="cartHeaderTotal">
                <h3>Total</h3>
              </div>
            </div>
            <div className="complete_cart">
              <div className="update">
                <div className="coupon">
                  <h2>Coupon Code</h2>
                  <input type="text" />
                  <a className="button" href="#">
                    Update Cart
                  </a>
                </div>
              </div>
              <div className="checkout">
                <div className="subtotal">
                  <h2>Subtotal ({totalQuantity} items):</h2>
                  <span className="finalprice">${subTotal.toFixed(2)}</span>
                  <a className="refresh">
                    <i className="fa fa-refresh" />
                  </a>
                </div>
                <div className="complete">
                  <a className="button" href="#">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
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
    removeItem: id => dispatch(removeItem(id)),
    gotOrders: oid => dispatch(gotOrders(oid))
  }
}

export default connect(mapState, mapDispatch)(Cart)
