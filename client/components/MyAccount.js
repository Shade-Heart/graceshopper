import React from 'react'
import AddHat from './AddHat'
import EditHat from './EditHat'
import {connect} from 'react-redux'
import {gotOrders} from '../store/orderReducer'

export class MyAccount extends React.Component {
  componentDidMount() {
    this.props.gotOrders()
  }

  render() {
    const defaultUser = this.props.defaultUser
    const isAdmin = !!(defaultUser !== {} && defaultUser.user.isAdmin)

    const initialOrder = this.props.allOrders.filter(
      order => order !== undefined
    )

    const userOrders = initialOrder.filter(
      order => order.oid === defaultUser.user.id && order.status === 'COMPLETED'
    )

    const adminPage = (
      <div className="bgPages">
        <h1> Hello Admin {defaultUser.user.firstName}</h1>
        <div>
          <AddHat isAdmin={isAdmin} />
          <EditHat isAdmin={isAdmin} />
        </div>
        <div>
          <h3>Past Orders</h3>
          {userOrders.map(order => {
            return (
              <div key={order.id}>
                <li>
                  Order #{order.id}: Order Total: ${(order.total / 100).toFixed(
                    2
                  )}{' '}
                  Date: {order.updatedAt.slice(0, 10)}
                </li>
              </div>
            )
          })}
        </div>
      </div>
    )

    const userPage = (
      <div>
        <h3>Past Orders</h3>
        {userOrders.map(order => {
          return (
            <div key={order.id}>
              <li>
                Order #{order.id}: Order Total: ${(order.total / 100).toFixed(
                  2
                )}{' '}
                Date: {order.updatedAt.slice(0, 10)}
              </li>
            </div>
          )
        })}
      </div>
    )

    console.log(userOrders)

    return isAdmin ? adminPage : userPage
  }
}

const mapState = state => {
  return {
    defaultUser: state,
    allOrders: state.orderReducer.allOrders
  }
}
const mapDispatch = {gotOrders}
export default connect(mapState, mapDispatch)(MyAccount)
