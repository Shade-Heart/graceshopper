import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

class Checkout extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_BWjSNljxQTKKCw09tzm2oSvw">
          <div>
            {/* <h2> Thanks for shopping at Mad Hatters! </h2> */}
            <Elements>
              <CheckoutForm
                orderId={this.props.orderId}
                subTotal={this.props.subTotal}
              />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    )
  }
}

export default Checkout
