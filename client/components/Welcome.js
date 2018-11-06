import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {postOrderGuest} from './../store/orderReducer'
import {guest} from '../store'

export class Welcome extends React.Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const defaultUser = this.props.defaultUser
    const isLoggedin = Object.keys(defaultUser).length !== 0
    if (!isLoggedin) {
      await this.props.guest()
      const userId = this.props.defaultUser.id
      await this.props.postOrderGuest(userId)
    }
  }

  render() {
    const defaultUser = this.props.defaultUser
    const isLoggedin = Object.keys(defaultUser).length !== 0
    const name = isLoggedin ? this.props.defaultUser.firstName : ''

    return (
      <div id="welcome" className="welcome">
        <main>
          <header>
            <section className="hero">
              <div className="innerWrapper">
                <h2>Welcome {name}</h2>
                <h1>Welcome to the Mad Hatter</h1>
                <h3>Find the right look for you!</h3>
              </div>
            </section>
          </header>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {
    defaultUser: state.user,
    allOrders: state.orderReducer.allOrders
  }
}
const mapDispatch = dispatch => {
  return {
    postOrderGuest: id => dispatch(postOrderGuest(id)),
    guest: () => dispatch(guest())
  }
}

export default connect(mapState, mapDispatch)(Welcome)
