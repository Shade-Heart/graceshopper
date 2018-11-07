import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import history from '../history'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    const {orderId, subTotal} = this.props
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/orders/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    if (response.ok) {
      this.setState({complete: true})
      // Set transaction to completed in database and redirect to homepage
      await axios.put(`/api/orders/status/${orderId}/${subTotal}`)

      setTimeout(() => {
        history.push('/home')
      }, 3000)
    } else {
      alert('Transaction failed, please try again!')
    }
  }

  render() {
    if (this.state.complete)
      return (
        <div className="completeCheckout">
          <h1 />
          <h1> Purchase Complete! </h1>
          <h2> Thanks for shopping at Mad Hatters! </h2>
        </div>
      )
    return (
      <div className="checkout">
        <p>Please enter your payment information to complete your purchase: </p>
        <CardElement />
        <button onClick={this.submit}>Submit Order</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)

// const mapState = state => {
//   return {
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)
