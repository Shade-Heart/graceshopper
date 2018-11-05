import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_BWjSNljxQTKKCw09tzm2oSvw">
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
