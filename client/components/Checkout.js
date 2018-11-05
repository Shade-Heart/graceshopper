import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import key from '../secrets'

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey={key}>
        <div className="example">
          <h2> Thanks for shopping at Mad Hatters! </h2>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default Checkout
