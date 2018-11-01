import React from 'react'

export default class AddToCart extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  render() {
    return (
      <div>
        <button>Add To Cart</button>
      </div>
    )
  }
}
